//redux form 
import { reset } from 'redux-form';

import {
    OPEN_SEND_INVITES_MODAL,
    CLOSE_SEND_INVITES_MODAL
} from '../../../constants';

export function openModal() {
    return async (dispatch) => {
        dispatch({
            type: OPEN_SEND_INVITES_MODAL
        })
        return true;
    };
}

export function closeModal() {
    return async (dispatch) => {

        dispatch(reset('Invites'));

        dispatch({
            type: CLOSE_SEND_INVITES_MODAL
        })
        return true;
    };
}
