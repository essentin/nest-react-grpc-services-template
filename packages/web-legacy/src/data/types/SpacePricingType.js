import {
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as Boolean
} from 'graphql';
import ListSettingsActivity from './ListSettingsActivity';
import { ActivityType, ListSettings } from '../models';

const SpacePricingType = new ObjectType({
    name: 'SpacePricingType',
    fields: {
        id: { type: IntType },
        listId: { type: IntType },
        activityType: { type: IntType },
        basePrice: { type: FloatType },
        minHour: { type: FloatType },
        discount: { type: FloatType },
        isCleaningIncluded: { type: Boolean },
        cleaningFee: { type: FloatType },
        maxGuest: { type: IntType },
        currency: { type: StringType },
        activityName: {
            type: StringType,
            async resolve(reservation) {
                const activity = await ActivityType.findOne({
                    where: {
                        id: reservation.activityType
                    }
                })

                return activity && activity.name;
            }
        }
    }
});

export default SpacePricingType;
