import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const UserRegister = new ObjectType({
  name: 'userRegister',
  fields: {
    firstName: { type: StringType },
    lastName: { type: StringType },
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    dateOfBirth: { type: StringType },
    status: { type: StringType },
    emailToken: { type: StringType },
    gender: { type: StringType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    country: { type: IntType },
    verificationCode: { type: IntType },
    countryName: { type: StringType },
    countryCode: { type: StringType },
    isPhotoSkipped: { type: BooleanType },
    stepTwo: { type: BooleanType },
    stepThree: { type: BooleanType }
  },
});

export default UserRegister;
