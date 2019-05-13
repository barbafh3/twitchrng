import { combineReducers } from 'redux';

import streamsReducer from './streamsReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
    streams: streamsReducer,
    session: sessionReducer
});