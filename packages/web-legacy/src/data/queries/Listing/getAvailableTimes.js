// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import SpaceAvailabilityType from '../../types/SpaceAvailabilityType';
import { SpaceAvailability } from '../../models';

const getAvailableTimes = {

  type: SpaceAvailabilityType,

  args: {
    listId: { type: new NonNull(IntType) },
    day: { type: new NonNull(StringType) }
  },

  async resolve({ request }, { listId, day }) {
    return await SpaceAvailability.findOne({
      where: {
        listId,
        day
      },
    });
  }
};

export default getAvailableTimes;

