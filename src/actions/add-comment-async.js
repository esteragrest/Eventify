import { request } from "../utils"
import { addComment } from "./add-comment"

export const addCommentAsync = (userId, eventId, parentId, content) => (dispatch) => {
	const commentData = {
		event_id: eventId,
		user_id: userId,
		parent_id: parentId,
		content
	}

	request('/api/comments', 'POST', commentData).then((newComment) => {
		dispatch(addComment(newComment))
	})
}
