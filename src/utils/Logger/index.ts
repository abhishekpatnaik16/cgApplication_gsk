import {winstonLogger} from "./winston-logger"
import {LoggerLevel} from "./LoggerLevel"

export class Logger {
	private static _logger = winstonLogger
	private _name: string

	constructor(name: string) {
		this._name = name
	}

	private static log(level: LoggerLevel, message: string, meta?: any) {
		Logger._logger.log(
			level.valueOf(),
			message,
			meta
		)
	}

	info(message: string, meta?: any) {
		Logger.log(LoggerLevel.info, message, meta)
	}

	critical(message: string, meta?: any) {
		Logger.log(LoggerLevel.critical, message, meta)
	}

	error(message: string, meta?: any) {
		Logger.log(LoggerLevel.error, message, meta)
	}

	warn(message: string, meta?: any) {
		Logger.log(LoggerLevel.warn, message, meta)
	}

	debug(message: string, meta: any) {
		Logger.log(LoggerLevel.debug, message, meta)
	}
}