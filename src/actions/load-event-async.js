import { request } from "../utils"
import { setEventData } from "./set-event-data"

export const loadEventAsync = (url) => (dispatch) => {
	return request(url).then((eventData) => {
		if(eventData.event) {
			dispatch(setEventData({...eventData.event, comments: eventData.comments}))
		}
		return eventData
	})
}
