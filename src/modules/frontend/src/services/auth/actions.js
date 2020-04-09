import {REQUEST_LOGIN, started} from '../webRequests/actionTypes';

export const loginUser = (email, password) => {
    return {
        type: started(REQUEST_LOGIN)
    }
};