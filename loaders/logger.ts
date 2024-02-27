import winston from 'winston';
const { combine, timestamp, printf, colorize } = winston.format;

const formato = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  handleExceptions: true
});

const errorFileTransport = new winston.transports.File({ 
  filename: 'error.log', 
  level: 'error', 
  handleExceptions: true 
});

const combinedFileTransport = new winston.transports.File({ 
  filename: 'combined.log', 
  handleExceptions: true 
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    formato
  ),
  transports: [
    errorFileTransport,
    combinedFileTransport,
    consoleTransport
  ],
  exitOnError: false 
});

export default logger;