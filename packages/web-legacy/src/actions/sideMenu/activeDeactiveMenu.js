import {
    SET_ACTIVE_MENU
} from '../../constants';

export function setActive(id) {
    return async (dispatch) => {
        dispatch({
            type: SET_ACTIVE_MENU,
            selectedMenu: id
        });
    };
}