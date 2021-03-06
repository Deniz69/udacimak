const { createLogger, format, transports } = require('winston');

const {
  colorize, combine, timestamp, label, printf,
} = format;


const MAX_SIZE = 10485760; // 10mb

/**
 * Customer winston logger format
 */
const myFormat = printf((info) => {
  const { level, message } = info;
  const infoTimestamp = info.timestamp;
  return `${infoTimestamp} [${level}]: ${message}`;
});

/**
 * Customer logger
 */
const logger = createLogger({
  level: 'verbose',
  format: combine(
    colorize(),
    label({ label: '' }),
    timestamp(),
    myFormat,
  ),
  exitOnError: true,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'udacimak.error.log',
      level: 'error',
      maxsize: MAX_SIZE,
      maxFiles: 1,
    }),
    new transports.File({
      filename: 'udacimak.info.log',
      maxsize: MAX_SIZE,
      maxFiles: 1,
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
  ],
});

export default logger;
