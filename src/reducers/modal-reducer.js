import { ACTION_TYPE } from "../actions"

const initialModalState = {
	isOpen: false,
  	image: '',
  	title: '',
  	text: '',
  	children: null,
}

export const modalReducer = ( state = initialModalState, action) => {
	switch (action.type) {
		case ACTION_TYPE.OPEN_MODAL: {
			return {
				...state,
				...action.payload,
				isOpen: true,
			}
		}
		case ACTION_TYPE.CLOSE_MODAL: {
			return initialModalState
		}
		default:
			return state
	}
}
