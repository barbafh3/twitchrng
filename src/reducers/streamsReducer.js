import {
    SET_PLAYER_STATE,
    FETCH_STREAMS,
    FETCH_STREAMS_BY_TAG,
    FETCH_USERS,
    FETCH_TAGS,
    SAVE_TAGS_TO_JSON,
    LOAD_TAGS,
    GET_TAG_BY_NAME,
    FETCH_GAMES,
    SAVE_GAMES_TO_JSON,
    LOAD_GAMES
} from '../actions/actionTypes';

export default (state = { playerState: true }, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {
                ...state,
                streams: action.payload
            }
        case FETCH_STREAMS_BY_TAG:
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
        case FETCH_GAMES:
            return {
                ...state,
                games: action.payload
            }
        case SAVE_GAMES_TO_JSON:
            return {
                ...state
            }
        case LOAD_GAMES:
            return {
                ...state,
                games: action.payload
            }
        case FETCH_TAGS:
            return {
                ...state,
                tags: action.payload
            }
        case SAVE_TAGS_TO_JSON:
            return {
                ...state
            }
        case LOAD_TAGS:
            return {
                ...state,
                tags: action.payload
            }
        case GET_TAG_BY_NAME:
            return{
                ...state,
                tag: action.payload
            }
        default:
            return state;
    }
}