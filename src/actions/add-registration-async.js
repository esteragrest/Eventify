import { request } from "../utils"
import { openModal } from "./open-modal"

export const addRegistrationAsync = (registrationData) => (dispatch) => {
	request('/api/registrations', 'POST', registrationData)
		.then((res) => {
			if(res.error) {
				dispatch(openModal({
					image: '/public/img/error.png',
					title: 'Произошла ошибка регистрации :(',
					text: 'Вы можете попробовать зарегистрироваться позже, если вы еще не были зарегистрированы.'
				}))
				return res.error
			}
			
			dispatch(openModal({
				image: '/public/img/success.png',
				title: 'Вы успешно зарегистрировались на мероприятие!',
				text: 'Вы можете вернуть к информации о мероприятии или найти что-то ещё.'
			}))
		})
}
