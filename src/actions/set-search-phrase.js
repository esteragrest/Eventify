import { ACTION_TYPE } from "./action-type";

export const SET_SEARCH_PHRASE = (searchPhrase) => ({
	type: ACTION_TYPE.SET_SEARCH_PHRASE,
	payload: searchPhrase
})
