import {
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const ServiceFeesType = new ObjectType({
    name: 'ServiceFees',
    fields: {
        id: {
            type: IntType
        },
        guestType: {
            type: StringType
        },
        guestValue: {
            type: FloatType
        },
        hostType: {
            type: StringType
        },
        hostValue: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default ServiceFeesType;