import {apiFinishType, apiStartType} from '../webRequests/actionTypes';

export const apiRequest = ({requestName, method = 'GET', modules, request, params, onSuccess, onError}) => {
    return {
        type: 'REQUEST',
        payload: {
            requestName,
            method,
            modules,
            request,
            onSuccess,
            onError,
            params
        }
    }
};

export const apiStart = (requestName) => {
    return {
        type: apiStartType(requestName)
    }
};

export const apiFinished = (requestName, data) => {
    return {
        type: apiFinishType(requestName),
        payload: {
            data
        }
    }
};

export const apiError = (requestName, error) => {
    return {
        type: apiFinishType(requestName),
        payload: {
            error
        }
    }
};