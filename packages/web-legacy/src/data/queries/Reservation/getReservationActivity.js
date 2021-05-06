import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

const getReservationActivity = {

  type: ReservationType,

  args: {
    listId: { type: StringType},
    activityId: { type: IntType },
    activityType: { type: StringType },
  },

  async resolve({ request }, { listId, activityId, activityType }) {
    if (request.user) {

      const userId = request.user.id;
      let where;
        where = {
         listId,
         activityId, 
         activityType,
          $or: [
            {
              hostId: userId
            },
            {
              guestId: userId
            }
          ]
        };
      let reservationData = await Reservation.findAll({
        where
      });
      return reservationData ? reservationData[0] : null;

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getReservationActivity;