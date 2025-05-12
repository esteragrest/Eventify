import { request } from '../utils';
import { openModal } from './open-modal';
import { setIsLoading } from './set-is-loading';

export const addRatingAsync = (ratingData) => (dispatch) => {
	dispatch(setIsLoading(true));

	return request('/api/ratings', 'POST', ratingData)
		.then(({ error }) => {
			if (error) {
				dispatch(
					openModal({
						image: '/public/img/error.png',
						title: 'Произошла ошибка :(',
						text: 'Вы можете попробовать оставить оценку позже.',
					}),
				);
			}

			dispatch(
				openModal({
					image: '/public/img/success.png',
					title: 'Спасибо за вашу оценку!',
					text: 'Вы можете вернуть к информации о мероприятии или найти что-то ещё.',
				}),
			);
		})
		.finally(() => dispatch(setIsLoading(false)));
};
