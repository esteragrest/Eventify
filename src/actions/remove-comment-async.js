import { request } from '../utils';
import { openModal } from './open-modal';
import { removeComment } from './remove-comment';
import { setIsLoading } from './set-is-loading';

export const removeCommentAsync = (commentId) => (dispatch) => {
	dispatch(setIsLoading(true));

	request(`/api/comments/${commentId}`, 'DELETE')
		.then(({ message, error }) => {
			if (message) {
				dispatch(removeComment(commentId));
			}

			if (error) {
				dispatch(
					openModal({
						image: '/public/img/error.png',
						title: 'Произошла ошибка при удалении комментария :(',
						text: 'Попробуйте повторить позже.',
						children: error,
					}),
				);
			}
		})
		.finally(() => dispatch(setIsLoading(false)));
};
