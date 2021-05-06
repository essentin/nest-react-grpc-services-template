import {
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

import UserManagementType from './UserManagementType';

const AllUsersType = new ObjectType({
	name: 'AllUsers',
	fields: {
		usersData: {
			type: new List(UserManagementType)
		},
		count: {
			type: IntType
		},
		status: {
			type: StringType
		}
	}
});

export default AllUsersType;