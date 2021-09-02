import {
    LOGOUT_USER,
    SET_USER_IS_AUTH,
    SET_USER_INFO,
    UPDATE_USER,
    USER_UPDATING,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DELETE_ALL_FROM_CART,
    SET_SCHOOLS
} from "./types";

export const setIsAuth = (user) => ({
    type: SET_USER_IS_AUTH,
    payload: user
});

export const logOutUser = () => ({
    type: LOGOUT_USER,
});

export const setUserInfo = (user) => ({
    type: SET_USER_INFO,
    payload: user
});

export const updateUser = (settings) => ({
    type: UPDATE_USER,
    payload: settings
});

export const isEditing = (state) => ({
    type: USER_UPDATING,
    payload: state
});

export const addToCartItem = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCartItem = (product) => ({
    type: REMOVE_FROM_CART,
    payload: product
});

export const deleteAllFromCart = () => ({
    type: DELETE_ALL_FROM_CART,
});

export const setSchools = (schools) => ({
    type: SET_SCHOOLS,
    payload: schools
});
