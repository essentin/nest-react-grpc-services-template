import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const UserEditProfile = new ObjectType({
  name: 'userEditProfile',
  fields: {
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: new NonNull(StringType) },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    status: {type: StringType},
    country: { type: IntType },
    verificationCode: { type: IntType },
    countryName: { type: StringType },
    countryCode: { type: StringType },
  },
});

export default UserEditProfile;
