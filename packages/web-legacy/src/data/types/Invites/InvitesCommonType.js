import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLList as List,
} from 'graphql';

import InvitesType from './InvitesType';

const InvitesCommonType = new ObjectType({
    name: 'InvitesCommonType',
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: {
            type: InvitesType
        },
        results: {
            type: new List(InvitesType)
        },
        count: {
            type: IntType
        }
    },
});

export default InvitesCommonType;