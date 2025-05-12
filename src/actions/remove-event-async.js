import { request } from '../utils';
import { openModal } from './open-modal';
import { setIsLoading } from './set-is-loading';

export const removeEventAsync = (eventId) => (dispatch) => {
	dispatch(setIsLoading(true));

	return request(`/api/events/${eventId}`, 'DELETE')
		.then(({ message, error }) => {
			if (error) {
				dispatch(
					openModal({
						image: '/public/img/error.png',
						title: 'Произошла ошибка при удалении мероприятия :(',
						text: 'Попробуйте повторить позже.',
						children: error,
					}),
				);
			}

			return message;
		})
		.finally(() => dispatch(setIsLoading(false)));
};
