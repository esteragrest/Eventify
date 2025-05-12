import { ACTION_TYPE } from '../actions';

const initialAppState = {
	searchPhrase: '',
	isLoading: true,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SEARCH_PHRASE: {
			return {
				...state,
				searchPhrase: action.payload,
			};
		}
		case ACTION_TYPE.SET_IS_LOADING: {
			return {
				...state,
				isLoading: action.payload,
			};
		}
		default:
			return state;
	}
};
