import {
  GraphQLBoolean as BooleanType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserVerifiedInfoType = new ObjectType({
  name: 'UserVerifiedInfo',
  fields: {
    id: { type: IntType },
    userId: { type: new NonNull(ID) },
    isEmailConfirmed: { type: BooleanType },
    isFacebookConnected: { type: BooleanType },
    isGoogleConnected: { type: BooleanType },
    isIdVerification: { type: BooleanType },
    isPhoneVerified: { type: BooleanType },
    isLinkedinConnected: { type: BooleanType },
    status: { type: StringType }
  },
});

export default UserVerifiedInfoType;
