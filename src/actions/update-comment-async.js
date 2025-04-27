import { request } from "../utils"

export const updateCommentAsync = (commentId, newContent) => (dispatch) => {
	request(`/api/comments/${commentId}`, 'PUT', { content: newContent}).then((updateComment) => {
		if(!updateComment.error) {
			dispatch(updateComment(updateComment))
		}
	})
}
