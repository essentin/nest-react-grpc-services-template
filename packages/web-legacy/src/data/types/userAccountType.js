import {
  GraphQLBoolean as BooleanType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';
import UserVerifiedInfoType from './UserVerifiedInfoType';
import UserType from './UserType';
import { CardDetails, User, UserVerifiedInfo, Reservation } from '../models';

const UserAccountType = new ObjectType({
  name: 'UserAccount',
  fields: {
    userId: { type: new NonNull(ID) },
    profileId: { type: new NonNull(IntType) },
    firstName: { type: StringType },
    lastName: { type: StringType },
    displayName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: StringType },
    userBanStatus: { type: IntType },
    userType: { type: IntType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    createdAt: { type: StringType },
    status: { type: StringType },
    picture: { type: StringType },
    verification: {
      type: UserVerifiedInfoType,
      async resolve(userProfile) {
        return await UserVerifiedInfo.findOne({ where: { userId: userProfile.userId } });
      }
    },
    userData: {
      type: UserType,
      async resolve(userProfile) {
        return await User.findOne({ where: { id: userProfile.userId } });
      }
    },
    hasCard: {
      type: BooleanType,
      async resolve(userProfile) {
        const cardExist = await CardDetails.findOne({
          where: { userId: userProfile.userId },
          raw: true
        })

        if (cardExist) {
          return true;
        } else {
          return false;
        }
      }
    },
    country: { type: IntType },
    verificationCode: { type: IntType },
    countryCode: { type: StringType },
    countryName: { type: StringType },
    zipcode: { type: StringType },
    isPhotoSkipped: { type: BooleanType },
    stepTwo: { type: BooleanType },
    stepThree: { type: BooleanType },
    maxInviteCount: { type: IntType },
    inviteCode: { type: StringType },
    myBookingsCount: {
      type: IntType,
      async resolve(userProfile) {

        let today = new Date();
        today.setHours(0, 0, 0, 0);
        return await Reservation.count({
          where: {
            $and: [
              {
                guestId: userProfile.userId,
                $or: [
                  { paymentState: 'requires_capture' },
                  { paymentState: 'completed' },
                ],
                $and: [
                  {
                    checkOut: {
                      $gte: today
                    }
                  },
                  {
                    reservationState: {
                      $in: ['pending', 'approved']
                    }
                  }
                ]

              }
            ]
          }
        })
      }
    },
    usedInvitesCount: { type: IntType },
    companyName: { type: StringType },
    isPartner: { type: BooleanType }
  },
});

export default UserAccountType;