import { request } from '../utils';
import { removeComment } from './remove-comment';
import { setIsLoading } from './set-is-loading';

export const removeCommentAsync = (commentId) => (dispatch) => {
	dispatch(setIsLoading(true));

	request(`/api/comments/${commentId}`, 'DELETE')
		.then(({ message }) => {
			if (message) {
				dispatch(removeComment(commentId));
			}
		})
		.finally(() => dispatch(setIsLoading(false)));
};
