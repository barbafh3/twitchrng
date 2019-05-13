import { FETCH_STREAMS, FETCH_USERS } from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {
                ...state,
                streams: action.payload
            }
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}