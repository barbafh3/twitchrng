import { combineReducers } from "redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import streamsReducer from "./streams";
import sessionReducer from "./session";

const reducers = combineReducers({
  streams: streamsReducer,
  session: sessionReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
