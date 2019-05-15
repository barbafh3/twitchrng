import { SET_PLAYER_STATE, FETCH_STREAMS, FETCH_USERS } from '../actions/actionTypes';

export default (state = { playerState: true }, action) => {
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
        case SET_PLAYER_STATE:
            return{
                ...state,
                playerState: action.payload
            }
        default:
            return state;
    }
}