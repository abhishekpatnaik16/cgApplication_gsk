import {winstonLogger} from "./winston-logger"
import {LoggerLevel} from "./LoggerLevel"

export class Logger {
	private static _logger = winstonLogger
	private readonly _name: string

	constructor(name: string) {
		this._name = name
	}

	private static log(name: string, level: LoggerLevel, message: string, meta?: any) {
		Logger._logger.log(
			level.valueOf(),
			`${name}: ${message}`,
			meta
		)
	}

	info(message: string, meta?: any) {
		Logger.log(this._name, LoggerLevel.info, message, meta)
	}

	critical(message: string, meta?: any) {
		Logger.log(this._name, LoggerLevel.critical, message, meta)
	}

	error(message: string, meta?: any) {
		Logger.log(this._name, LoggerLevel.error, message, meta)
	}

	warn(message: string, meta?: any) {
		Logger.log(this._name, LoggerLevel.warn, message, meta)
	}

	debug(message: string, meta?: any) {
		Logger.log(this._name, LoggerLevel.debug, message, meta)
	}
}