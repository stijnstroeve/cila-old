import {combineReducers} from 'redux';
import webRequestsReducer from './webRequests/reducer';
import authReducer from './auth/reducer';

export default combineReducers({
    web: webRequestsReducer,
    auth: authReducer
});