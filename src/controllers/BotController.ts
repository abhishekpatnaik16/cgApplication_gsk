import {Express, RequestHandler, Router} from "express"
import {Database} from "../database/db"
import {BotsService} from "../database/BotsService"
import {validateCreateBotPayload} from "../utils/validators"

export class BotController {
	private _botService: BotsService
	private _router = Router()

	constructor(db: Database) {
		this._botService = new BotsService(db)

		/* Load routes */
		this._router.get("/", this.getAllBots)
		this._router.get("/:id", this.getBotById)
		this._router.delete("/:id", this.deleteBotById)
		this._router.patch("/:id", this.updateBotById)
		this._router.post("/", this.createBot)
	}

	mount(server: Express) {
		server.use("/bots", this.router)
	}

	get router() {
		return this._router
	}

	private get deleteBotById(): RequestHandler {
		return (req, res) => {
			const id = req.params["id"]
			return res.json(
				this._botService.delete(id)
			)
		}
	}

	private get getAllBots(): RequestHandler {
		return (req, res) => {
			return res.json(
				this._botService.getAll()
			)
		}
	}

	private get getBotById(): RequestHandler {
		return (req, res) => {
			const id = req.params["id"]
			return res.json(
				this._botService.get(id)
			)
		}
	}

	private get updateBotById(): RequestHandler {
		return (req, res) => {
			const id = req.params["id"]
			const updateBody = req.body
			return res.json(
				this._botService.update(id, updateBody)
			)
		}
	}

	private get createBot(): RequestHandler {
		return (req, res) => {
			const body = req.body
			validateCreateBotPayload(body)
			return res.json(
				this._botService.create(body)
			)
		}
	}
}