import { request } from "../utils"
import { openModal } from "./open-modal"

export const removeUserAsync = (userId) => (dispatch) =>
	request(`/api/users/${userId}`, 'DELETE').then(({ message, error }) => {

		if(error) {
			dispatch(openModal({
				image: '/public/img/error.png',
				title: 'Произошла ошибка при удалении аккаунта :(',
				text: 'Попробуйте повторить позже.',
				children: error
			}))
		}

		return message
})
