import { GraphQLBoolean as BooleanType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const AdminUserLoginType = new ObjectType({
  name: 'adminUserLogin',
  fields: {
    id: { type: StringType },
    email: { type: StringType },
    password: { type: StringType },
    isSuperAdmin: { type: BooleanType },
    status: { type: StringType },
  },
});

export default AdminUserLoginType;
