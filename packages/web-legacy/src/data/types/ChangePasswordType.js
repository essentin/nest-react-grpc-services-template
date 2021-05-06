import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const ChangePasswordType = new ObjectType({
  name: 'ChangePassword',
  fields: {
    id: { type: new NonNull(ID) },
    oldPassword: { type: new NonNull(StringType) },
    newPassword: { type: new NonNull(StringType) },
    confirmPassword: { type: new NonNull(StringType) },
  },
});

export default ChangePasswordType;
