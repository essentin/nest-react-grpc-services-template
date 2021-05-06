import { GraphQLNonNull as NonNull, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const DeleteUserType = new ObjectType({
  name: 'DeleteUser',
  fields: {
    userId: { type: new NonNull(StringType) },
    status: { type: StringType },
  },
});

export default DeleteUserType;
