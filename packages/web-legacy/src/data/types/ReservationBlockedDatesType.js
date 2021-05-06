import {
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const ReservationBlockedDatesType = new ObjectType({
  name: 'reservationBlockedDatesType',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    reservationId: { type: IntType },
    date: { type: StringType },
    startTime: { type: FloatType },
    endTime: { type: FloatType },
    isNextDay: { type: BooleanType },
    totalHours: { type: FloatType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType },
    status: { type: StringType },
    isCancel: { type: BooleanType }
  },
});

export default ReservationBlockedDatesType;
