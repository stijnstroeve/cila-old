import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import {apiMiddleware} from './webRequests/middleware';

const persistConfig = {
    key: 'root',
    whitelist: ['auth'],
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the redux store with the react-thunk middleware
const store = createStore(persistedReducer, applyMiddleware(thunk, apiMiddleware));
const persistor = persistStore(store);

export default store;
export {persistor};