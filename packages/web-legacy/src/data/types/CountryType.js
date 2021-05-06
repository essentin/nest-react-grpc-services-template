import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const CountryType = new ObjectType({
    name: 'Country',
    fields: {
        id: {
            type: IntType
        },
        countryCode: {
            type: StringType
        },
        countryName: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        status: {
            type: StringType
        },
        dialCode: {
            type: StringType
        },
    }
});

export default CountryType;