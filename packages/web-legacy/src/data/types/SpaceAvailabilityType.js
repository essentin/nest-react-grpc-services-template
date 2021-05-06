import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

import SpaceAvailabilitySessionTypes from './SpaceAvailabilitySessionTypes';
import { SpaceAvailabilitySession } from '../models';

const SpaceAvailabilityType = new ObjectType({
    name: 'SpaceAvailability',
    fields: {
        id: { type: IntType },
        listId: { type: IntType },
        day: { type: StringType },
        isOpen: { type: BooleanType },
        isWholeDay: { type: StringType },
        timeSlot: {
            type: new List(SpaceAvailabilitySessionTypes),
            async resolve(listing) {
                return await SpaceAvailabilitySession.findAll({
                    where: {
                        spaceAvailabilityId: listing.id,
                    },
                    order: [['startTime', 'ASC']]
                });
            }
        },
    }
});

export default SpaceAvailabilityType;
