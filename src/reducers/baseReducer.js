import { combineReducers } from 'redux';

import streamsReducer from './streamsReducer';

export default combineReducers({
    streams: streamsReducer
});