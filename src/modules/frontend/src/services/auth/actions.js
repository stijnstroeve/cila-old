import {apiRequest} from '../webRequests/actions';
import {REQUEST_LOGIN} from '../webRequests/actionTypes';
import {SET_JWT} from './actionTypes';

export const setJWT = (jwt) => {
    return {
        type: SET_JWT,
        payload: jwt
    }
};

export const loginUser = (email, password, onSuccess, onError) => {
    return apiRequest({
        requestName: REQUEST_LOGIN,
        method: 'POST',
        modules: 'user',
        request: 'authenticate',
        onError,
        onSuccess,
        params: {
            email,
            password
        }
    })
};