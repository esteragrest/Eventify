import { request } from "../utils"
import { setEventData } from "./set-event-data"

export const addEventAsync = (eventData) => (dispatch) =>
	request('/api/events', 'POST', eventData).then(({ event, link }) => {
		if(link) {
			return link
		}

		dispatch(setEventData(event))
		return event
	})
