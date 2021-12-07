import {RequestHandler} from "express"
import {Logger} from "../utils/Logger"
import {v4 as uuid} from "uuid"

const logger = new Logger("request")

export const RequestLogger: RequestHandler = (req, res, next) => {
	const requestId = uuid()
	req.headers["x-request-id"] = requestId
	res.header("x-request-id", requestId)

	let error = null

	try {
		next()
	} catch (e) {
		error = e
	} finally {
		const message = `${req.method} ${res.statusCode} ${req.originalUrl}`
		const meta = {
			method: req.method,
			url: req.url,
			requestHeaders: req.headers,
			responseHeaders: res.getHeaders()
		}

		if (error) {
			logger.error(message, meta)
		} else {
			logger.info(message, meta)
		}
	}
}