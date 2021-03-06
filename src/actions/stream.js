import { twitchRequest } from "../api/TwitchApi";
import jsonApi from "../api/JsonApi";
import {
  SET_PLAYER_STATE,
  FETCH_STREAMS,
  FETCH_STREAMS_BY_TAG,
  FETCH_USERS,
  FETCH_TAGS,
  SAVE_TAGS_TO_JSON,
  GET_TAG_BY_NAME,
  SAVE_GAMES_TO_JSON,
  LOAD_GAME,
  LOAD_TAG,
  SET_USER,
  STARTUP,
  SET_DELAY,
  SET_TYPE,
  SET_RECENT
} from "./types";

export const test = () => async dispatch => {};

export const addRecentUser = (recentUsers, user) => async dispatch => {
  recentUsers.push(user);
  dispatch({ type: SET_RECENT, payload: recentUsers });
};

export const removeRecentUser = recentUsers => async dispatch => {
  recentUsers.shift();
  dispatch({ type: SET_RECENT, payload: recentUsers });
};

export const randomUser = (streams, recentUsers) => dispatch => {
  let done = false;
  while (done === false) {
    let rng = Math.trunc(Math.random() * 20);
    let newUser = streams[rng].user_name;
    let type = streams[rng].type;
    if (!recentUsers.includes(newUser)) {
      dispatch({ type: SET_USER, payload: newUser });
      dispatch({ type: SET_TYPE, payload: type });
      if (recentUsers.length >= 20) {
        dispatch(removeRecentUser(recentUsers));
      }
      dispatch(addRecentUser(recentUsers, newUser));
      done = true;
    }
  }
};

export const setType = type => async dispatch => {
  dispatch({ type: SET_TYPE, payload: type });
};

export const setDelay = delay => async dispatch => {
  dispatch({ type: SET_DELAY, payload: delay });
};

export const setStartup = startup => async dispatch => {
  dispatch({ type: STARTUP, payload: startup });
};

export const setUser = user => async dispatch => {
  dispatch({ type: SET_USER, payload: user });
};

export const fetchStreams = token => async dispatch => {
  const response = await twitchRequest(token).get("/streams?first=100");
  dispatch({ type: FETCH_STREAMS, payload: response.data.data });
};

export const fetchStreamsByTag = (token, tag) => async dispatch => {
  const response = await twitchRequest(token).get(`/streams?tag_id=${tag}`);
  dispatch({ type: FETCH_STREAMS_BY_TAG, payload: response.data.data });
};

export const fetchUsers = token => async dispatch => {
  const response = await twitchRequest(token).get("/users");
  dispatch({ type: FETCH_USERS, payload: response.data.data });
};

export const getTagByName = (list, tagName) => async dispatch => {
  let result = [];
  list.forEach(page => {
    page.forEach(tag => {
      if (tag.localization_names["en-us"] === tagName) {
        result.push({
          tagId: tag.tag_id,
          tagName: tag.localization_names["en-us"]
        });
      }
    });
  });
  dispatch({ type: GET_TAG_BY_NAME, payload: result });
};

export const fetchAllTags = token => async dispatch => {
  let pagination = "first";
  let payload = [];
  while (pagination) {
    if (pagination === "first") {
      const response = await twitchRequest(token).get(`/tags/streams`);
      payload.push(response.data.data);
      pagination = response.data.pagination.cursor;
    } else {
      const response = await twitchRequest(token).get(
        `/tags/streams?after=${pagination}`
      );
      payload.push(response.data.data);
      pagination = response.data.pagination.cursor;
    }
  }
  dispatch({ type: FETCH_TAGS, payload: payload });
};

export const fetchAll = (url, type, token, sleep) => async dispatch => {
  let pagination = "first";
  let payload = [];
  while (pagination) {
    if (pagination === "first") {
      const response = await twitchRequest(token).get(`${url}`);
      payload.push(response.data.data);
      pagination = response.data.pagination.cursor;
    } else {
      const response = await twitchRequest(token).get(
        `${url}?after=${pagination}`
      );
      payload.push(response.data.data);
      pagination = response.data.pagination.cursor;
    }
    await sleep(2000);
  }
  dispatch({ type, payload });
};

export const saveTagsToJson = list => async dispatch => {
  let allTags = [];
  await list.forEach(async page => {
    await page.forEach(async tag => {
      const newTag = {
        tag_id: tag.tag_id,
        tag_name: tag.localization_names["en-us"]
      };
      allTags.push(newTag);
    });
  });
  await jsonApi.post("tags", allTags);
  dispatch({ type: SAVE_TAGS_TO_JSON, payload: null });
};

export const saveGamesToJson = list => async dispatch => {
  let allGames = [];
  await list.forEach(async page => {
    await page.forEach(async game => {
      const newGame = {
        id: game.id,
        name: game.name,
        box_art_url: game.box_art_url
      };
      await allGames.push(newGame);
    });
  });
  await jsonApi.post("games", allGames);
  dispatch({ type: SAVE_GAMES_TO_JSON, payload: null });
};

export const loadJson = (type, entity, filter = null) => async dispatch => {
  let body = {
    tag_name: "",
    game_name: ""
  };
  if (filter) {
    if (type === LOAD_TAG) {
      body.tag_name = filter;
    }
    if (type === LOAD_GAME) {
      body.game_name = filter;
    }
  }
  const response = await jsonApi.get(entity, body);
  dispatch({ type, payload: response.data });
};

export const setPlayerState = playerState => async dispatch => {
  dispatch({ type: SET_PLAYER_STATE, payload: playerState });
};
