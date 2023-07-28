import winston from "winston"
import config from "../config/config.js"

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2, 
    info: 3, 
    http: 4, 
    debug: 5, 
  },
  colors: {
    fatal: "black",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "magenta", 
    debug: "blue",
  },
}

let levelState = config.loggerType === "production" ? "info" : "debug"

export const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: levelState,
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
          colors: customLevelsOptions.colors,
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/errors.log",
    }),
  ],
})

export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.info(
    `${req.method} en ${req.url} - ${new Date().toISOString()}`
  )
  next()
}