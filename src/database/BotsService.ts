import {Database} from "./db"
import {DatabaseAdapter} from "./DatabaseAdapter"
import {Bot, CreateBot} from "../models/Bot"
import {v4 as uuid} from "uuid"
import {validateBotPayload} from "../utils/validators"
import {Logger} from "../utils/Logger"
import {inspect} from "util"


export class BotValidationFailedException extends Error {
}

export class BotsService {
	private _dbAdapter: DatabaseAdapter<string, Bot>
	private _logger = new Logger("bot-service")

	constructor(db: Database) {
		this._dbAdapter = new DatabaseAdapter(db)
	}

	private validateBotPayload(payload: any) {
		try {
			validateBotPayload(payload)
		} catch (e: unknown) {
			this._logger.error("Bot payload validation failed", {
				error: inspect(e)
			})
			throw new BotValidationFailedException((e as Error).message)
		}
	}

	get(id: string): Bot {
		try {
			const bot = this._dbAdapter.get(id)
			this._logger.debug(`Fetched bot with id(${id})`, {
				bot
			})
			return bot
		} catch (e: any) {
			this._logger.error(`Failed to fetched bot with id(${id})`, {
				error: inspect(e)
			})
			e.message = `Failed to fetched bot with id(${id})`
			throw e
		}
	}

	getAll(): Bot[] {
		try {
			const bots = this._dbAdapter.getAll()
			this._logger.debug("Fetched all bots", {
				bots
			})
			return bots
		} catch (e: any) {
			this._logger.error("Failed to fetched all bots", {
				error: inspect(e)
			})
			e.message = "Failed to fetched all bots"
			throw e
		}

	}

	update(id: string, partial: Partial<Bot>): Bot {
		try {
			const fetched = this._dbAdapter.get(id)
			const merged = {...fetched, ...partial, id}

			this.validateBotPayload(merged)

			return this._dbAdapter.save(id, merged)
		} catch (e) {
			this._logger.error(`Failed to update bot with id(${id})`, {
				error: inspect(e)
			})
			throw e
		}
	}

	delete(id: string): Bot {
		try {
			const bot = this._dbAdapter.delete(id)
			this._logger.debug(`Deleted bot with id(${id})`, {
				bot
			})
			return bot
		} catch (e) {
			this._logger.error(`Failed to delete bot with id(${id})`, {
				error: inspect(e)
			})
			throw e
		}
	}

	create(bot: CreateBot): Bot {
		const botId = uuid()
		const createBot = {
			id: botId,
			name: bot.name,
			owner: bot.owner,
			status: bot.status
		}

		this.validateBotPayload(createBot)

		return this._dbAdapter.save(
			botId, createBot
		)
	}
}