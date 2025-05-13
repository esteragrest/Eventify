import { request } from '../utils';
import { addComment } from './add-comment';
import { openModal } from './open-modal';
import { setIsLoading } from './set-is-loading';

export const addCommentAsync = (userId, eventId, parentId, content) => (dispatch) => {
	dispatch(setIsLoading(true));

	const commentData = {
		event_id: eventId,
		user_id: userId,
		parent_id: parentId,
		content,
	};

	request('/api/comments', 'POST', commentData)
		.then((newComment) => {
			if (newComment.error) {
				dispatch(
					openModal({
						image: '/public/img/error.png',
						title: 'Произошла ошибка при добавлении Вашего вопроса :(',
						text: 'Вы можете попробовать оставить вопрос позже.',
					}),
				);

				return;
			}

			dispatch(addComment(newComment));
		})
		.finally(() => dispatch(setIsLoading(false)));
};
