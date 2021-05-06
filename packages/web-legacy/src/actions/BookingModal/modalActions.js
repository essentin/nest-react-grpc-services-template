import {
    OPEN_BOOKING_MODAL,
    CLOSE_BOOKING_MODAL,
} from '../../constants';
import { closeViewListAddCardModal } from '../modalActions';

export function openBookingModal() {
    return async (dispatch) => {
        dispatch({
            type: OPEN_BOOKING_MODAL,
            payload: {
                bookingModal: true
            }
        });
        return true;
    };
}

export function closeBookingModal() {
    return async (dispatch) => {
        dispatch(closeViewListAddCardModal())
        dispatch({
            type: CLOSE_BOOKING_MODAL,
            payload: {
                bookingModal: false
            }
        });
        return true;
    };
}