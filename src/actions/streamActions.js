import { twitchRequest } from '../api/TwitchApi';
import jsonApi from '../api/JsonApi';
import {
    SET_PLAYER_STATE,
    FETCH_STREAMS,
    FETCH_STREAMS_BY_TAG,
    FETCH_USERS,
    FETCH_TAGS,
    SAVE_TAGS_TO_JSON,
    GET_TAG_BY_NAME,
    SAVE_GAMES_TO_JSON
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

export const fetchAll = (url, type, token, sleep) => async dispatch => {
    let pagination = 'first';
    let payload = [];
    while (pagination) {
        if (pagination === 'first') {
            const response = await twitchRequest(token).get(`${url}`);
            payload.push(response.data.data);
            pagination = response.data.pagination.cursor;
        } else {
            const response = await twitchRequest(token).get(`${url}?after=${pagination}`);
            payload.push(response.data.data);
            pagination = response.data.pagination.cursor;
        }
        await sleep(2000);
    }
    dispatch({
        type,
        payload
    })
}

export const saveTagsToJson = (list, sleep) => async dispatch => {
    await list.forEach(async page => {
        await page.forEach(async tag => {
            const newTag = {
                tagId: tag.tag_id,
                tagName: tag.localization_names['en-us']
            }
            await sleep(2000);
            await jsonApi.post('tags', newTag);
        });
    });
    dispatch({
        type: SAVE_TAGS_TO_JSON,
        payload: null
    })
}

export const saveGamesToJson = (list, sleep) => async dispatch => {
    await list.forEach(async page => {
        await page.forEach(async game => {
            const newGame = {
                gameId: game.id,
                gameName: game.name,
                boxArtUrl: game.box_art_url
            }
            await sleep(3000);
            await jsonApi.post('games', newGame);
        });
    });
    dispatch({
        type: SAVE_GAMES_TO_JSON,
        payload: null
    })
}

export const loadJson = (type, entity) => async dispatch => {
    const response = await jsonApi.get(entity);
    dispatch({
        type,
        payload: response.data
    })
}

export const setPlayerState = playerState => async dispatch => {
    dispatch({
        type: SET_PLAYER_STATE,
        payload: playerState
    })
}