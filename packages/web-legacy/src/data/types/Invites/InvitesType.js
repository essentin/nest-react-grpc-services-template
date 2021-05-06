import { GraphQLInt as IntType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const InvitesType = new ObjectType({
    name: 'InvitesType',
    fields: {
        id: {
            type: IntType
        },
        userId: {
            type: StringType
        },
        email: {
            type: StringType
        },
        firstName: {
            type: StringType
        },
        inviteStatus: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default InvitesType;