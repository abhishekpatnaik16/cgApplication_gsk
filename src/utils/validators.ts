import ow from "ow"

export const validateCreateBotPayload = ow.create(
	ow.object.exactShape({
		name: ow.string,
		status: ow.string.oneOf(["active", "inactive"]),
		owner: ow.string
	})
)

export const validateBotPayload = ow.create(
	ow.object.exactShape({
		id: ow.string,
		name: ow.string,
		status: ow.string.oneOf(["active", "inactive"]),
		owner: ow.string
	})
)