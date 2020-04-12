import {SET_MENU_DRAWER_OPEN} from './actionTypes';

export const setMenuDrawerOpen = (open) => {
    return {
        type: SET_MENU_DRAWER_OPEN,
        payload: open
    }
};
