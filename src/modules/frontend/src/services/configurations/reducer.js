import {SET_MENU_DRAWER_OPEN} from './actionTypes';

const initialState = {
    menuDrawerOpen: true
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MENU_DRAWER_OPEN:
            return {
                ...state,
                menuDrawerOpen: action.payload
            };
        default:
            return state;
    }
};

export default reducer;