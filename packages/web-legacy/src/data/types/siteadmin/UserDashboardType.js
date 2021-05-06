import { GraphQLInt as IntType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const UserDashboardType = new ObjectType({
    name: 'UserDashboard',
    fields: {
        totalCount: {
            type: IntType
        },
        todayCount: {
            type: IntType
        },
        monthCount: {
            type: IntType
        },
        status: {
            type: StringType
        }
    }
});

export default UserDashboardType;