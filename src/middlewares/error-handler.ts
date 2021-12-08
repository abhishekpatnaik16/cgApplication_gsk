import {ErrorRequestHandler} from "express"
import {NotFoundException} from "../database/DatabaseAdapter"
import {BotValidationFailedException} from "../database/BotsService"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let statusCode = 500
	if (err instanceof NotFoundException) {
		statusCode = 404
	} else if (err instanceof BotValidationFailedException) {
		statusCode = 400
	}

	return res.status(statusCode).json({
		error: err.message
	})
}