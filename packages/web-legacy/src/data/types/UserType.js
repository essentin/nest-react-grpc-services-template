import {
  GraphQLBoolean as BooleanType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    type: { type: StringType },
    status: { type: StringType },
    userBanStatus: { type: IntType },
    userStatus: { type: BooleanType },
    userExistStatus: { type: BooleanType },
    userType: {type: IntType }
  },
});

export default UserType;