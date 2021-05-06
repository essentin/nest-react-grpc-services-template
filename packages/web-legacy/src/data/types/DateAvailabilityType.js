import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const DateAvailabilityType = new ObjectType({
  name: 'DateAvailability',
  fields: {
    listId: { type: new NonNull(IntType) },
    startDate: { type: new NonNull(StringType) },
    endDate: { type: new NonNull(StringType) },
    status: { type: StringType },
  },
});

export default DateAvailabilityType;
