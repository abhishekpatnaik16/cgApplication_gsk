export interface Bot {
	id: string
	owner: string
	name: string
	status: "active" | "inactive"
}

export type CreateBot = Omit<Bot, "id">