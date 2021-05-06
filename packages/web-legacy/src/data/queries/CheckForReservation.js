import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

import { Reservation, Listing } from '../../data/models';

import CheckForReservationType from '../types/CheckForReservationType';

import moment from 'moment';

const CheckForReservation = {

  type: CheckForReservationType,

  args: {
    listId: { type: IntType },
    guestId: { type: StringType }
  },

  async resolve({ request }, { listId, guestId }) {

    try {

      const validList = await Listing.findOne({
        attributes: ['id'],
        where: {
          id: listId,
          isPublished: true
        }
      });

      if (!validList || !listId) {
        return {
          status: 500,
          errorMessage: "Invalid List"
        };
      }

      const result = await Reservation.findOne({
        where: {
          listId,
          guestId,
          checkIn: {
            $gt: moment().format('YYYY-MM-DD 00:00'),
            $lt: moment().format('YYYY-MM-DD 23:59')
          },
          reservationState: 'approved'
        },
        order: [['id', 'DESC']],
        raw: true
      });

      return {
        status: 200,
        errorMessage: result ? null : "No reservation found!",
        result
      };

    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Something went wrong!,' + error,
      };
    }
  },
};

export default CheckForReservation;