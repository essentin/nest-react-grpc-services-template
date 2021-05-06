import {
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const SingleReservationType = new ObjectType({
    name: 'SingleReservation',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        hostId: {
            type: StringType
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        cleaningPrice: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        count: {
            type: IntType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        cancellationPolicy: {
            type: IntType
        }

    }
});

export default SingleReservationType;