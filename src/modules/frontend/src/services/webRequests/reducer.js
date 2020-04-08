
/**
 * Handles the redux part of all web requests made
 */

// Start with an empty state because there are not requests made initially
const initialState = {};

const reducer = (state = initialState, action) => {
    const isRequest = action.type.startsWith('REQUEST_');

    // If the action is not a request, return the current state
    if(!isRequest) return state;
};

export default reducer;