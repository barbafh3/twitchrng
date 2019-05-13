import { getAuthToken } from '../api/TwitchApi';
import { TWITCH_AUTH } from './actionTypes';

export const twitchAuth = () => async dispatch => {
    const { data: { access_token } } = await getAuthToken().post();
    dispatch({
        type: TWITCH_AUTH,
        payload: access_token
    })
}