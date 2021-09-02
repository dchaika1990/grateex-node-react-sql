import {
    FETCH_START,
    FETCH_END
} from "../actions/types";

const initialState = {
    fetching: true,
    message: {type: 'error', msg: ''}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                fetching: true
            }
        case FETCH_END:
            return {
                ...state,
                fetching: false
            }
        default:
            return state
    }
}
