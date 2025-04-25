import { ACTION_TYPE } from "./action-type";

export const setEventData = (event) => ({
	type: ACTION_TYPE.SET_EVENT_DATA,
	payload: event
})
