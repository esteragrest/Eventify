import { ACTION_TYPE } from "../actions"

const initialAppState = {
	searchPhrase: ''
}

export const appReducer = (state = initialAppState, action) => {
	switch(action.type) {
		case ACTION_TYPE.SET_SEARCH_PHRASE: {
			return {
				...state,
				searchPhrase: action.payload
			}
		}
		default:
			return state
	}
}
