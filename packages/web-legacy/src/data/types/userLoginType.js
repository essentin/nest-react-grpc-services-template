import { GraphQLInt as IntType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const UserLogin = new ObjectType({
  name: 'userLogin',
  fields: {
    email: { type: StringType },
    password: { type: StringType },
    userBanStatus: { type: IntType },
    status: { type: StringType },
  },
});
export default UserLogin;
