import {apiRequest} from '../webRequests/actions';
import {REQUEST_LOGIN} from '../webRequests/actionTypes';

export const loginUser = (email, password) => {
    return apiRequest({
        requestName: REQUEST_LOGIN,
        method: 'POST',
        modules: 'user',
        request: 'authenticate',
        params: {
            email,
            password
        }
    })
};