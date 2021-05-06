// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationBlockedDatesType from '../../types/ReservationBlockedDatesType';
import { ReservationBlockedDates } from '../../models';

const getBlockedTimes = {

  type: new List(ReservationBlockedDatesType),

  args: {
    listId: { type: new NonNull(IntType) },
    date: { type: new NonNull(StringType) }
  },

  async resolve({ request }, { listId, date }) {
    let startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return await ReservationBlockedDates.findAll({
      where: {
        listId,
        date: {
          $between: [startDate, endDate]
        },
        isCancel: false
      },
      order: [['startTime', 'ASC']]
    });
  }
};

export default getBlockedTimes;
