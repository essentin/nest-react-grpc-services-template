import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
} from 'graphql';


const UserInvitationSettingsType = new ObjectType({
    name: 'UserInvitationSettingsType',
    fields: {
        id: {
            type: IntType
        },
        maxInvites: {
            type: IntType
        }
    }
});

export default UserInvitationSettingsType;