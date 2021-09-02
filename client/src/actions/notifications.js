import {SET_NOTIFICATIONS, ADD_NOTIFICATION} from "./types";

export const setNotices = (notices) => ({
    type: SET_NOTIFICATIONS,
    payload: notices
});

export const addNotice = (notice) => ({
    type: ADD_NOTIFICATION,
    payload: notice
});
