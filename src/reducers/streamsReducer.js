import { FETCH_STREAM } from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return {
                ...state,
                streams: action.payload
            }
        default:
            return state;
    }
}