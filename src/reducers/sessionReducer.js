import { TWITCH_AUTH } from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case TWITCH_AUTH:
            return {
                ...state,
                twitchToken: action.payload
            };
        default:
            return state;
    }
}