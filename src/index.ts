import Express from "express"
import {RequestLogger} from "./middlewares/request-logger"
import {Logger} from "./utils/Logger"
import bodyParser from "body-parser"
import {Database} from "./database/db"
import {BotController} from "./controllers/BotController"
import seedData from "./database/seed/bots.json"
import {ErrorHandler} from "./middlewares/error-handler"

const logger = new Logger("root")

const server = Express()

/* Configure server */
server.disable("x-powered-by")
server.use(bodyParser.json())
server.use(RequestLogger)

const db: Database = new Map<string, any>()

/* Seed the database */
logger.debug("Seeding database...")
seedData.forEach(d => {
	db.set(d.id, d)
})
logger.debug("Seeding complete", {
	entriesAdded: seedData.length
})

/* Setup controllers */
const botController = new BotController(db)
botController.mount(server)

/* Global error handler */
server.use(ErrorHandler)

/* Start server */
server.listen(5000, () => {
	logger.info("Server is up and running at http://localhost:5000")
})

/* Handling unhandled rejections */
process.on("unhandledRejection", (reason, promise) => {
	logger.critical("Unhandled rejection exception occurred", {
		reason
	})
	promise.catch(rejectionError => {
		logger.critical("Handled unhandled promise", {
			rejectionError
		})
	})
})

/* Handle graceful shutdown */
process.on("SIGINT", () => {
	logger.info("Gracefully shutting down server")
	process.exit(0)
})