import { GraphQLInt as IntType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import { Reviews, User, UserVerifiedInfo } from '../models';

import UserType from './UserType';
import UserVerifiedInfoType from './UserVerifiedInfoType';

const Profile = new ObjectType({
  name: 'userProfile',
  fields: {
    userId: {
      type: StringType,
    },
    userData: {
      type: UserType,
      resolve(profile) {
        return User.findOne({
          where: { id: profile.userId },
        });
      },
    },
    userVerification: {
      type: UserVerifiedInfoType,
      resolve(profile) {
        return UserVerifiedInfo.findOne({
          where: { userId: profile.userId },
        });
      },
    },
    reviewsCount: {
      type: IntType,
      async resolve(profile) {
        return await Reviews.count({
          where: {
            userId: profile.userId,
            isAdminEnable: true
          }
        });
      }
    },
    profileId: {
      type: IntType,
    },
    firstName: {
      type: StringType,
    },
    lastName: {
      type: StringType,
    },
    displayName: {
      type: StringType,
    },
    dateOfBirth: {
      type: StringType,
    },
    picture: {
      type: StringType,
    },
    location: {
      type: StringType,
    },
    phoneNumber: {
      type: StringType
    },
    info: {
      type: StringType,
    },
    countryCode: {
      type: StringType
    },
    createdAt: {
      type: StringType,
    },
    companyName: {
      type: StringType
    }
  },
});

export default Profile;