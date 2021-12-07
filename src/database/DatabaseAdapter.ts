import {Database} from "./db"

export class DatabaseAdapter<ID, DATA> {
	private _db: Database

	constructor(db: Database) {
		this._db = db
	}

	get(id: ID): DATA {
		const fetched = this._db.get(id as unknown as string) as DATA

		if (fetched) {
			return fetched
		} else {
			throw new Error(`Failed to get with id(${id})`)
		}

	}

	getAll(): DATA[] {
		const fetched = Array.from(this._db.keys()).map(id => this._db.get(id)) as unknown as DATA[]

		if (Array.isArray(fetched)) {
			return fetched
		} else {
			throw new Error("Failed to get all")
		}
	}

	save(id: ID, data: DATA): DATA {
		this._db.set(
			id as unknown as string,
			data
		)

		return data
	}

	update(id: ID, partial: Partial<DATA>): DATA {
		const fetched = this.get(id)
		const merged = {...fetched, ...partial, id}
		return this.save(id, merged)
	}

	delete(id: ID): DATA {
		const fetched = this.get(id)
		if (this._db.delete(id as unknown as string)) {
			return fetched
		} else {
			throw new Error(`Failed to delete with id(${id})`)
		}
	}
}