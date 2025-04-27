import { ACTION_TYPE } from "./action-type";

export const updateComment = (updatedComment) => ({
	type: ACTION_TYPE.UPDATE_COMMENT,
	payload: updatedComment
})
