import {
	SET_CATEGORIES,
	SET_CATEGORIES_LIST
} from "../actions/types";

const initialState = {
	categories: [],
	categoriesList: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			}
		case SET_CATEGORIES_LIST:
			return {
				...state,
				categoriesList: action.payload
			}
		default:
			return state
	}
}
