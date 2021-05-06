import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType
} from 'graphql';

const CommonResponseType = new ObjectType({
    name: 'CommonResponseType',
    description: "This represent response of update/delete operation",
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType }
    }
});

export default CommonResponseType;