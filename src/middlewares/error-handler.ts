import {ErrorRequestHandler} from "express"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	return res.json({
		error: err.message
	})
}