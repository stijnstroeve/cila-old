import {started} from './actionTypes';

export const requestLoading = (requestState, requestNames) => {
    if(requestNames === undefined) return false;

    // Make the requestNames an array if it is not
    if(!Array.isArray(requestNames)) {
        requestNames = [requestNames];
    }
    const loadingRequests = requestNames.filter(
        (requestName) => requestState[started(requestName)]
    );

    // If the size of loadingRequests is higher than 0 there must be a request started
    return loadingRequests.length > 0;
};