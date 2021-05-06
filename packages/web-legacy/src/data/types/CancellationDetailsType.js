import {
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const CancellationDetailsType = new ObjectType({
    name: 'CancellationDetails',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        cancellationPolicy: {
            type: StringType
        },
        refundToGuest: {
            type: FloatType
        },
        guestServiceFee: {
            type: FloatType
        },
        hostServiceFee: {
            type: FloatType
        },
        total: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        status: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        cancelledBy: {
            type: StringType
        },
        createdAt: {
            type: StringType
        }
    }
});

export default CancellationDetailsType;