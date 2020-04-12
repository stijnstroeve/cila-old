import {SET_JWT} from './actionTypes';

const initialState = {
    jwt: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_JWT:
            return {
                ...state,
                jwt: action.payload
            };
        default:
            return state;
    }
};

export default reducer;