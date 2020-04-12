import {combineReducers} from 'redux';
import webRequestsReducer from './webRequests/reducer';
import authReducer from './auth/reducer';
import configReducer from './configurations/reducer';

export default combineReducers({
    web: webRequestsReducer,
    auth: authReducer,
    config: configReducer
});