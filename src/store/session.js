import { TWITCH_AUTH, SET_COMPONENT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_COMPONENT:
      return {
        ...state,
        component: action.payload
      };
    case TWITCH_AUTH:
      return {
        ...state,
        twitchToken: action.payload
      };
    default:
      return state;
  }
};
