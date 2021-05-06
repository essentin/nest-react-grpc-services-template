import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import UserInvitationType from './UserInvitationType';

const UserInvitationCommonType = new ObjectType({
    name: 'UserInvitationCommonType',
    fields: {
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        results: {
            type: new List(UserInvitationType)
        },
        result: {
            type: UserInvitationType
        },
        count: {
            type: IntType
        }
    }
});

export default UserInvitationCommonType;