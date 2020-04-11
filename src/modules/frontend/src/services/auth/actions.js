import {apiRequest} from '../webRequests/actions';
import {REQUEST_LOGIN} from '../webRequests/actionTypes';

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