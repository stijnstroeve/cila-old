import {combineReducers} from 'redux';
import webRequestsReducer from './webRequests/reducer';

export default combineReducers({
    web: webRequestsReducer
});