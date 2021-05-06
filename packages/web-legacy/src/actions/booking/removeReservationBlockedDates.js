import { gql } from 'react-apollo';
import {
    REMOVE_BLOCKED_TIMES_PAYMENT_START,
    REMOVE_BLOCKED_TIMES_PAYMENT_SUCCESS,
    REMOVE_BLOCKED_TIMES_PAYMENT_ERROR,
} from '../../constants';

import { toastr } from 'react-redux-toastr';

export function removeReservationBlockedDates(reservationId) {

    return async (dispatch, getState, { client }) => {
        console.log('asdfasdfasdf',reservationId)
        dispatch({
            type: REMOVE_BLOCKED_TIMES_PAYMENT_START
        });

        try {

            let mutation = gql`
                mutation removeReservationBlockedDates(                    
                    $reservationId: Int,
                ){
                    removeReservationBlockedDates(
                        reservationId: $reservationId,
                    ) {
                        status
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    reservationId,
                },
            });

            if (data && data.removeReservationBlockedDates && data.removeReservationBlockedDates.status == '200') {
                dispatch({
                    type: REMOVE_BLOCKED_TIMES_PAYMENT_SUCCESS
                });
            } else {
                toastr.error("Oops!", data && data.removeReservationBlockedDates && data.removeReservationBlockedDates.errorMessage);
                dispatch({
                    type: REMOVE_BLOCKED_TIMES_PAYMENT_ERROR
                });
            }



        } catch (err) {
            dispatch({
                type: REMOVE_BLOCKED_TIMES_PAYMENT_ERROR
            });
        }

    };
}

