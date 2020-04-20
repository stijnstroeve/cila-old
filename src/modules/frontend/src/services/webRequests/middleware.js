import {allDefined} from '../../helpers/general';
import BackendService from '../backend/BackendService';
import {apiError, apiFinished, apiStart} from './actions';

export const apiMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);

    // If the action type is not of REQUEST return
    if(action.type !== 'REQUEST') return;

    // Grab all properties from the action payload
    const {
        requestName,
        method,
        modules,
        request,
        params,
        onSuccess,
        onError
    } = action.payload;

    // Check if all the required properties are defined in the payload
    if(!allDefined(requestName, method, modules)) throw new Error('Not all variables are given');

    // Dispatch the start
    dispatch(apiStart(requestName));

    BackendService.sendRequest(method, modules, request, params).then((response) => {
        const data = response.data.data || undefined;

        // Dispatch the api finished action
        dispatch(apiFinished(requestName, data));

        // Execute the callback
        if(onSuccess) {
            onSuccess(data);
        }
    }).catch((error) => {
        let errorMessage = '';
        if (error.response) {
            // There was a response but was an Error
            const responseData = error.response.data;
            if(responseData && !responseData.success) {
                errorMessage = responseData.error.description;
            } else {
                errorMessage = 'Unknown Error';
            }
        } else if (error.request) {
            // There was a request but no response
            errorMessage = 'Could not connect to server';
        } else {
            // There was no request and no response
            errorMessage = 'Invalid request';
        }

        // Dispatch the api Error action
        dispatch(apiError(requestName, errorMessage));

        // Execute the callback
        if(onError) {
            onError(errorMessage);
        }
    })
};