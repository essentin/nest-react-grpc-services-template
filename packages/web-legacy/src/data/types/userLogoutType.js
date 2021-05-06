import { GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const UserLogout = new ObjectType({
  name: 'userLogout',
  fields: {
    status: {type: StringType},
  },
});

export default UserLogout;
