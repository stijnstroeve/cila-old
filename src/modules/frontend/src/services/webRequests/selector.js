import {apiErrorType, apiStartType} from './actionTypes';

export const requestLoading = (requestState, requestNames) => {
    if(requestNames === undefined) return false;

    // Make the requestNames an array if it is not
    if(!Array.isArray(requestNames)) {
        requestNames = [requestNames];
    }
    const loadingRequests = requestNames.filter(
        (requestName) => requestState[apiStartType(requestName)]
    );

    // If the size of loadingRequests is higher than 0 there must be a request started
    return loadingRequests.length > 0;
};

export const requestErrorMessage = (requestState, requestNames) => {
    if(requestNames === undefined) return false;

    // Make the requestNames an array if it is not
    if(!Array.isArray(requestNames)) {
        requestNames = [requestNames];
    }
    const loadingRequests = requestNames.map(
        (requestName) => requestState[apiErrorType(requestName)]
    );

    return loadingRequests.length === 1 ? loadingRequests[0] : loadingRequests;
};