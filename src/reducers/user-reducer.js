import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialUserState = {
	id: '',
	firstName: '',
	lastName: '',
	birthDate: '',
	email: '',
	phone: '',
	photo: '',
	roleId: ROLE.GUEST,
	countUserEvents: 0,
	countOfEventsAttended: 0,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case ACTION_TYPE.LOGOUT: {
			return initialUserState;
		}
		default:
			return state;
	}
};
