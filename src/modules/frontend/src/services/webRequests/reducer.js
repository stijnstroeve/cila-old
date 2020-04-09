
/**
 * Handles the redux part of all web requests made
 */

// Start with an empty state because there are not requests made initially
const initialState = {};

const getParsedRequest = (actionType) => {
    const splitActionType = actionType.split('_');

    // Make sure the action type starts with REQUEST_ and contains at least 3 parts if you split it by _
    const isValidRequest = actionType.startsWith('REQUEST_') && splitActionType.length > 2;

    let requestName = null;
    let requestAction = null;

    // Only define the name and request action if the action type is a valid request
    if(isValidRequest) {
        requestName = splitActionType[1].toUpperCase();
        requestAction = splitActionType[2].toUpperCase();
    }

    return {
        isValidRequest,
        requestAction,
        requestName
    }
};

/**
 * Resets all variables in state corresponding to the give request name
 * @param state The current state
 * @param requestName The name of the request
 * @returns {*}
 */
const resetRequest = (state, requestName) => {
    const prefix = 'REQUEST_' + requestName;
    state[prefix + '_STARTED'] = undefined;
    state[prefix + '_FINISHED'] = undefined;
    state[prefix + '_DATA'] = undefined;
    state[prefix + '_ERROR'] = undefined;

    return state;
};

const reducer = (state = initialState, action) => {
    const {isValidRequest, requestAction, requestName} = getParsedRequest(action.type);

    // If the action is not a valid request, return the current state
    if(!isValidRequest) return state;

    const prefix = 'REQUEST_' + requestName;

    let newState = {...state};

    switch(requestAction) {
        case 'STARTED':
            if(!newState[prefix + '_STARTED']) {
                newState = resetRequest(newState, requestName);

                newState[prefix + '_STARTED'] = true;
            }
            return newState;
        case 'FINISHED':
            // Reset the current request in the state
            newState = resetRequest(newState, requestName);

            newState[prefix + '_FINISHED'] = true;

            if(action.payload.response) {
                // Set the data to the response of the request
                newState[prefix + '_DATA'] = action.payload.response;
            } else if(action.payload.error) {
                newState[prefix + '_ERROR'] = action.payload.response;
            }
            return newState;
        default:
            return newState;
    }
};

export default reducer;