import { getAuthToken } from "../api/TwitchApi";
import { TWITCH_AUTH, SET_COMPONENT } from "./types";

import history from "../history";

export const setCurrentComponent = component => async dispatch => {
  dispatch({
    type: SET_COMPONENT,
    payload: component
  });
};

export const pushHistory = route => async dispatch => {
  history.push(route);
};

export const twitchAuth = () => async dispatch => {
  const {
    data: { access_token }
  } = await getAuthToken().post();
  dispatch({
    type: TWITCH_AUTH,
    payload: access_token
  });
};
