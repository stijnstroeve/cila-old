import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './rootReducer';

// Create the redux store with the react-thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;