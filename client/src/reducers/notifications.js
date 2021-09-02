import {
	SET_NOTIFICATIONS,
	ADD_NOTIFICATION,
} from "../actions/types";

const initialState = {
	notifications: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_NOTIFICATIONS:
			return {
				...state,
				notifications: action.payload
			}
		case ADD_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications].concat([action.payload])
			}
		default:
			return state
	}
}
