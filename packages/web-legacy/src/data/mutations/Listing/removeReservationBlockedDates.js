import {
    GraphQLInt as IntType,
} from 'graphql';
import ListBlockedDatesType from '../../types/ListBlockedDatesType';
import { ReservationBlockedDates, Reservation, ListBlockedDates } from '../../models';


const removeReservationBlockedDates = {

    type: ListBlockedDatesType,

    args: {
        reservationId: { type: IntType },
    },

    async resolve({ request }, { reservationId }) {

        try {
            if (request.user || request.user.admin) {

                const reservationExist = await Reservation.findOne({
                    where: { id: reservationId },
                    raw: true
                })

                if (reservationExist) {

                    await ReservationBlockedDates.destroy({
                        where: { reservationId }
                    })
                    await ListBlockedDates.destroy({
                        where: { reservationId }
                    })

                    return {
                        status: 200
                    }
                } else {
                    return {
                        status: 400,
                        errorMessage: 'Reservation not found.'
                    };
                }


            } else {
                return {
                    status: 400,
                    errorMessage: 'Please authenticate user.'
                };
            }

        } catch (err) {
            return {
                status: 500,
                errorMessage: err
            };
        }
    },
};

export default removeReservationBlockedDates;
