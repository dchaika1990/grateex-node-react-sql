import {FETCH_START, FETCH_END} from "./types";

export const startLoad = () => ({
    type: FETCH_START,
});

export const endLoad = () => ({
    type: FETCH_END,
});
