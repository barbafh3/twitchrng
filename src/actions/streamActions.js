import { twitchRequest } from '../api/TwitchApi';
import { SET_PLAYER_STATE, FETCH_STREAMS, FETCH_USERS } from './actionTypes';

export const fetchStreams = token => async dispatch => {
    const response = await twitchRequest(token).get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data.data
    });
}

export const fetchUsers = token => async dispatch => {
    const response = await twitchRequest(token).get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: response.data.data
    });
}

export const setPlayerState = playerState => async dispatch => {
    dispatch({
        type: SET_PLAYER_STATE,
        payload: playerState
    })
}