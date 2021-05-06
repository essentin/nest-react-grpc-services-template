import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLList as List,
} from 'graphql';

import AmenitiesType from './AmenitiesType';

const CommonType = new ObjectType({
    name: 'CommonType',
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: {
            type: AmenitiesType
        },
        results: {
            type: new List(AmenitiesType)
        }
    },
});

export default CommonType;