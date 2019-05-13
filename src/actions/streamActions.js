import { apiAuthorize, getAuthToken, getStreams } from '../api/TwitchApi';
import { FETCH_STREAM } from './actionTypes';

export const fetchStreams = () => async dispatch => {
    const { data: { access_token } } = await getAuthToken().post();
    const response = await getStreams(access_token).get('/streams');
    console.log(response);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data.data
    });
}