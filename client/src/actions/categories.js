import {SET_CATEGORIES, SET_CATEGORIES_LIST} from "@/actions/types";

export const setCats = (cats) => ({
	type: SET_CATEGORIES,
	payload: cats
});

export const setCatsList = (cats) => ({
	type: SET_CATEGORIES_LIST,
	payload: cats
});
