import {Database} from "./db"
import {DatabaseAdapter} from "./DatabaseAdapter"
import {Bot, CreateBot} from "../models/Bot"
import {v4 as uuid} from "uuid"
import {validateBotPayload} from "../utils/validators"

export class BotsService {
	private _dbAdapter: DatabaseAdapter<string, Bot>

	constructor(db: Database) {
		this._dbAdapter = new DatabaseAdapter(db)
	}

	get(id: string): Bot {
		return this._dbAdapter.get(id)
	}

	getAll(): Bot[] {
		return this._dbAdapter.getAll()
	}

	update(id: string, partial: Partial<Bot>): Bot {
		const fetched = this._dbAdapter.get(id)
		const merged = {...fetched, ...partial, id}
		validateBotPayload(merged)
		return this._dbAdapter.save(id, merged)
	}

	delete(id: string): Bot {
		return this._dbAdapter.delete(id)
	}

	create(bot: CreateBot): Bot {
		const botId = uuid()
		const createBot = {
			id: botId,
			name: bot.name,
			owner: bot.owner,
			status: bot.status
		}

		validateBotPayload(createBot)

		return this._dbAdapter.save(
			botId, createBot
		)
	}
}