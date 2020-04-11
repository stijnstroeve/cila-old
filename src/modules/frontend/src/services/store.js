import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './rootReducer';
import {apiMiddleware} from './webRequests/middleware';

// Create the redux store with the react-thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk, apiMiddleware));

export default store;