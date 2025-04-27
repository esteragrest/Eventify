import { request } from "../utils"
import { removeComment } from "./remove-comment"

export const removeCommentAsync = (commentId) => (dispatch) => {
	request(`/api/comments/${commentId}`, 'DELETE').then(({message}) => {
		if(message) {
			dispatch(removeComment(commentId))
		}
	})
}
