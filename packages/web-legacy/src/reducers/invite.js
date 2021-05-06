import {
    CREATE_INVITES_SUCCESS,
    CREATE_INVITES_START,
    CREATE_INVITES_ERROR,
    OPEN_SEND_INVITES_MODAL,
    CLOSE_SEND_INVITES_MODAL
} from '../constants';

export default function invite(state = {}, action) {
    switch (action.type) {
        case CREATE_INVITES_START:
            return {
                ...state,
                loading: true
            };
        case CREATE_INVITES_ERROR:
            return {
                ...state,
                loading: false,
            };
        case CREATE_INVITES_SUCCESS:
            return {
                ...state,
                showInviteModal: false,
                loading: false,
            };
        case OPEN_SEND_INVITES_MODAL:
            return {
                ...state,
                showInviteModal: true
            };
        case CLOSE_SEND_INVITES_MODAL:
            return {
                ...state,
                showInviteModal: false
            };
        default:
            return state;
    }
}
