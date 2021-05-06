import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
} from 'graphql';

import UserInvitationSettingsType from './UserInvitationSettingsType';

const UserInvitationSettingsCommonType = new ObjectType({
    name: 'UserInvitationSettingsCommonType',
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: {
            type: UserInvitationSettingsType
        }
    },
});

export default UserInvitationSettingsCommonType;