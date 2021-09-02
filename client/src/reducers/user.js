import {
	SET_USER_IS_AUTH,
	LOGOUT_USER,
	SET_USER_INFO,
	UPDATE_USER,
	USER_UPDATING,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	DELETE_ALL_FROM_CART,
	SET_SCHOOLS
} from "../actions/types";
import {socket} from "@services/socket";

const initialState = {
	currentUser: {},
	schools: [],
	isEditing: false,
	isAuth: false,
	isAdmin: false,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_IS_AUTH:
			return {
				...state,
				currentUser: action.payload,
				isAuth: true,
				isAdmin: action.payload.roles === 'ADMIN'
			}
		case SET_USER_INFO:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					...action.payload
				},
			}
		case UPDATE_USER:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					...action.payload
				}
			}
		case LOGOUT_USER:
			localStorage.removeItem('token')
			socket.disconnect()
			return {
				...state,
				currentUser: {},
				isAuth: false,
				isAdmin: false
			}
		case USER_UPDATING:
			return {
				...state,
				isEditing: action.payload
			}
		case ADD_TO_CART:
			let product = state.currentUser.carts.find(item => item.productId === action.payload.productId)
			if (!product) {
				return {
					...state,
					currentUser: {
						...state.currentUser,
						carts: [...state.currentUser.carts, action.payload]
					}
				}
			} else {
				return {...state}
			}

		case REMOVE_FROM_CART:
			const newArr = state.currentUser.carts.filter(item => item.productId !== action.payload)
			return {
				...state,
				currentUser: {
					...state.currentUser,
					carts: newArr
				}
			}
		case DELETE_ALL_FROM_CART:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					carts: []
				}
			}

		case SET_SCHOOLS:
			return {
				...state,
				schools: action.payload,
			}
		default:
			return state
	}
}
