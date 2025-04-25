import { ACTION_TYPE } from '../actions'

const initialEventState = {
	id: null,
	title: null,
	organizerId: null,
	organizerFirstName: null,
	organizerLastName: null,
	eventDate: null,
	eventTime: null,
	description: null,
	type: null,
	payment: null,
	address: null,
	ageLimit: null,
	maxParticipants: null,
	photo: null,
	comments: []
}

export const eventReducer = (state = initialEventState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_EVENT_DATA: {
			return {
				...state,
				...action.payload
			}
		}
		case ACTION_TYPE.RESET_EVENT_DATA: {
			return initialEventState
		}
		default:
			return state
	}
}
