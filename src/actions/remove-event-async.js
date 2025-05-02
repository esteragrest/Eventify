import { request } from "../utils"
import { openModal } from "./open-modal"

export const removeEventAsync = (eventId) => (dispatch) =>
	request(`/api/events/${eventId}`, 'DELETE').then(({ message, error }) => {
		if(error) {
			dispatch(openModal({
				image: '/public/img/error.png',
				title: 'Произошла ошибка при удалении мероприятия :(',
				text: 'Попробуйте повторить позже.',
				children: error
			}))
		}

		return { message }
	})
