import { generateEventAccessLink, request } from '../utils';
import { openModal } from './open-modal';
import { setIsLoading } from './set-is-loading';

export const saveEventAsync = (eventData, url, method) => (dispatch) => {
	dispatch(setIsLoading(true));

	const eventFormData = Object.keys(eventData).reduce((eventFormData, key) => {
		const value =
			key === 'type' ? (eventData[key] ? 'closed' : 'open') : eventData[key];
		eventFormData.append(key, value);

		return eventFormData;
	}, new FormData());

	return request(url, method, eventFormData)
		.then((res) => {
			if (res.error) {
				dispatch(
					openModal({
						image: '/public/img/error.png',
						title: 'Произошла ошибка при сохранении мероприятия :(',
						text: 'Попробуйте повторить позже.',
						children: res.error,
					}),
				);
			}

			if (res.link) {
				const eventAccesslink = generateEventAccessLink(res.event.id, res.link);

				dispatch(
					openModal({
						image: '/public/img/closed-event.png',
						title: 'Вы создали закрытое мероприятие!',
						text: 'Ваша ссылка для приглашения на мероприятие:',
						children: eventAccesslink,
					}),
				);

				return {
					type: 'accessLink',
					value: eventAccesslink,
				};
			}

			return {
				type: 'success',
				value: res.event || res.message,
			};
		})
		.finally(() => dispatch(setIsLoading(false)));
};
