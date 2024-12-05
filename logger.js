const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exception.log" }),
  ],
});


module.exports = logger;
