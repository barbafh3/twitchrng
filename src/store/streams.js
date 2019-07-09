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
  LOAD_GAMES,
  LOAD_GAME,
  STARTUP,
  SET_USER,
  SET_DELAY,
  SET_TYPE,
  SET_RECENT
} from "../actions/types";

const INITIAL_STATE = {
  playerState: true,
  startup: true,
  delay: 1000,
  recentUsers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RECENT:
      return {
        ...state,
        recentUsers: action.payload
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case SET_DELAY:
      return {
        ...state,
        delay: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case STARTUP:
      return {
        ...state,
        startup: action.payload
      };
    case FETCH_STREAMS:
      return {
        ...state,
        streamList: action.payload
      };
    case FETCH_STREAMS_BY_TAG:
      return {
        ...state,
        streamList: action.payload
      };
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.payload
      };
    case FETCH_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case SAVE_GAMES_TO_JSON:
      return {
        ...state
      };
    case LOAD_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case LOAD_GAME:
      return {
        ...state,
        game: action.payload
      };
    case FETCH_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case SAVE_TAGS_TO_JSON:
      return {
        ...state
      };
    case LOAD_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case GET_TAG_BY_NAME:
      return {
        ...state,
        tag: action.payload
      };
    default:
      return state;
  }
};
