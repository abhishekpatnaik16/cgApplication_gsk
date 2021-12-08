import winston from "winston"
import {winstonLoggerLevels} from "./LoggerLevel"

export const winstonLogger = winston.createLogger({
	levels: winstonLoggerLevels,
	level: "debug",
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		})
	],
})