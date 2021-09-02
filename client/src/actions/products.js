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
} from "./types";

export const setProductsUploads = (products) => ({
	type: SET_PRODUCTS_UPLOADS,
	payload: products
});

export const deleteProductsUploads = (id) => ({
	type: DELETE_PRODUCTS_UPLOADS,
	payload: id
});

export const setProductsPurchases = (products) => ({
	type: SET_PRODUCTS_PURCHASES,
	payload: products
});

export const setProductsWishList = (products) => ({
	type: SET_PRODUCTS_WISHLIST,
	payload: products
});

export const addProductsWishList = (products) => ({
	type: ADD_PRODUCTS_WISHLIST,
	payload: products
});

export const deleteProductWishList = (id) => ({
	type: DELETE_PRODUCT_FROM_WISHLIST,
	payload: id
});

export const productToEditId = (id) => ({
	type: PRODUCT_TO_EDIT_ID,
	payload: id
});

export const productIsEditingAction = (state) => ({
	type: PRODUCT_IS_EDITING,
	payload: state
});

export const setProductsFilters = (filters) => ({
	type: SET_PRODUCTS_FILTERS,
	payload: filters
});

export const setPopulations = (populations) => ({
	type: SET_POPULATIONS,
	payload: populations
});
