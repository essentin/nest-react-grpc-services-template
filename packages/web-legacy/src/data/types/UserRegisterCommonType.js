import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
} from 'graphql';

import userRegisterType from './userRegisterType';

const UserRegisterCommonType = new ObjectType({
    name: 'CommonType',
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: {
            type: userRegisterType
        }
    },
});

export default UserRegisterCommonType;