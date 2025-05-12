import { request } from '../utils';
import { openModal } from './open-modal';
import { setIsLoading } from './set-is-loading';

export const removeUserAsync = (userId) => (dispatch) => {
	dispatch(setIsLoading(true));

	return request(`/api/users/${userId}`, 'DELETE')
		.then(({ message, error }) => {
			if (error) {
				dispatch(
					openModal({
						image: '/public/img/error.png',
						title: 'Произошла ошибка при удалении аккаунта :(',
						text: 'Попробуйте повторить позже.',
						children: error,
					}),
				);
			}

			return message;
		})
		.finally(() => dispatch(setIsLoading(false)));
};
