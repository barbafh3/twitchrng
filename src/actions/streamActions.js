import { twitchRequest } from '../api/TwitchApi';
import {
    SET_PLAYER_STATE,
    FETCH_STREAMS,
    FETCH_STREAMS_BY_TAG,
    FETCH_USERS,
    FETCH_TAGS,
    GET_TAG_BY_NAME,
} from './actionTypes';

export const fetchStreams = token => async dispatch => {
    const response = await twitchRequest(token).get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data.data
    });
}

export const fetchStreamsByTag = (token, tag) => async dispatch => {
    const response = await twitchRequest(token).get(`/streams?tag_id=${tag}`);
    dispatch({
        type: FETCH_STREAMS_BY_TAG,
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

export const getTagByName = (list, tagName) => async dispatch => {
    let result = [];
    list.forEach(page => {
        page.forEach(tag => {
            if (tag.localization_names['en-us'] === tagName) {
                result.push({
                    tagId: tag.tag_id,
                    tagName: tag.localization_names['en-us']
                });
            }
        });
    })
    dispatch({
        type: GET_TAG_BY_NAME,
        payload: result
    });
}

export const fetchAllTags = token => async dispatch => {
    let pagination = 'first';
    let payload = [];
    while (pagination) {
        if (pagination === 'first') {
            const response = await twitchRequest(token).get(`/tags/streams`);
            payload.push(response.data.data);
            pagination = response.data.pagination.cursor;
        } else {
            const response = await twitchRequest(token).get(`/tags/streams?after=${pagination}`);
            payload.push(response.data.data);
            pagination = response.data.pagination.cursor;
        }
    }
    dispatch({
        type: FETCH_TAGS,
        payload: payload
    })
}

export const setPlayerState = playerState => async dispatch => {
    dispatch({
        type: SET_PLAYER_STATE,
        payload: playerState
    })
}