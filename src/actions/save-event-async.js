import { generateEventAccessLink, request } from "../utils"
import { openModal } from "./open-modal"

export const saveEventAsync = (eventData, userId, url, method) => (dispatch) =>{
	const eventFormData = Object.keys(eventData).reduce((eventFormData, key) => {
		 const value = key === 'type' ? eventData[key] ? 'closed' : 'open' : eventData[key]
		 eventFormData.append(key, value)

		 return eventFormData
	}, new FormData())

	eventFormData.append('organizer_id', userId)

	return request(url, method, eventFormData).then(({ event, link, error }) => {
		if(error) {
			dispatch(openModal({
				image: '/public/img/error.png',
				title: 'Произошла ошибка при создании мероприятия :(',
				text: 'Попробуйте создать мероприятие позже.',
				children: error
			}))
		}

		if(link) {
			const eventAccesslink = generateEventAccessLink(event.id, link)

			dispatch(openModal({
				image: '/public/img/closed-event.png',
				title: 'Вы создали закрытое мероприятие!',
				text: 'Ваша ссылка для приглашения на мероприятие:',
				children: eventAccesslink
			}))

			return {
				type: 'accessLink',
				value: generateEventAccessLink(event.id, link)
			}
		}

		return {
			type: 'event',
			value: event
		}
	})
}
