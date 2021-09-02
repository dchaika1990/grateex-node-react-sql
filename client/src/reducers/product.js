import {
	SET_PRODUCTS_PURCHASES,
	SET_PRODUCTS_UPLOADS,
	SET_PRODUCTS_WISHLIST,
	DELETE_PRODUCTS_UPLOADS,
	PRODUCT_TO_EDIT_ID,
	PRODUCT_IS_EDITING,
	ADD_PRODUCTS_WISHLIST,
	DELETE_PRODUCT_FROM_WISHLIST,
	SET_PRODUCTS_FILTERS,
	SET_POPULATIONS
} from "../actions/types";

const initialState = {
	productsUploads: [],
	productsPurchases: [],
	productsWishList: [],
	filters: [],
	populations: [],
	productIsEditing: false,
	productToEdit: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRODUCTS_UPLOADS:
			return {
				...state,
				productsUploads: action.payload
			}
		case DELETE_PRODUCTS_UPLOADS:
			return {
				...state,
				productsUploads: [...state.productsUploads].filter(item => item.id !== action.payload)
			}
		case SET_PRODUCTS_PURCHASES:
			return {
				...state,
				productsPurchases: action.payload
			}
		case SET_PRODUCTS_WISHLIST:
			return {
				...state,
				productsWishList: action.payload
			}
		case ADD_PRODUCTS_WISHLIST:
			return {
				...state,
				productsWishList: [...state.productsWishList].concat([action.payload])
			}
		case DELETE_PRODUCT_FROM_WISHLIST:
			return {
				...state,
				productsWishList: [...state.productsWishList].filter(item => item.id !== action.payload)
			}
		case PRODUCT_TO_EDIT_ID:
			return {
				...state,
				productToEdit: action.payload
			}
		case PRODUCT_IS_EDITING:
			return {
				...state,
				productIsEditing: action.payload
			}
		case SET_PRODUCTS_FILTERS:
			return {
				...state,
				filters: action.payload
			}
		case SET_POPULATIONS:
			return {
				...state,
				populations: action.payload
			}
		default:
			return state
	}
}
