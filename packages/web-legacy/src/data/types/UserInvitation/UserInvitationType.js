import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const UserInvitationType = new ObjectType({
    name: 'UserInvitationType',
    fields: {
        id: {
            type: IntType
        },

        email: {
            type: StringType
        },

        userId: {
            type: StringType
        },

        status: {
            type: StringType
        },

        inviteCode: {
            type: StringType
        },

        invitedAt: {
            type: StringType
        },

        registeredAt: {
            type: StringType
        },

        cancelledAt: {
            type: StringType
        },

        registeredEmail: {
            type: StringType
        }
    }
});

export default UserInvitationType;