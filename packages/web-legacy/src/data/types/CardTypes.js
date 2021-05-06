import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const CardTypes = new ObjectType({
    name: 'CardTypes',
    fields: {
        id: {
            type: IntType
        },
        paymentMethodId: {
            type: StringType
        },
        customerId: {
            type: StringType
        },
        userId: {
            type: StringType
        },
        last4Digits: {
            type: IntType
        },
        isVerified: {
            type: BooleanType
        },
        default: {
            type: BooleanType
        },
        cardUserName: {
            type: StringType
        },
        cardType: {
            type: StringType
        },
        expiryDate: {
            type: StringType
        },
        status: {
            type: StringType
        },
        errorMessage: {
            type: StringType
        },
    }
});

export default CardTypes;