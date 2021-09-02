import { combineReducers } from 'redux'

import userReducer from "./user";
import fetchReducer from "./fetch";
import productReducer from "./product";
import notificationsReducer from "./notifications";
import categoriesReducer from "./categories";

export default combineReducers({
    user: userReducer,
    fetch: fetchReducer,
    product: productReducer,
    notifications: notificationsReducer,
    categories: categoriesReducer,
});
