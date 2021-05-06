import { User, UserProfile, UserInvitation } from '../../data/models';

import UserAccountType from '../types/userAccountType';

const userAccount = {

  type: UserAccountType,

  async resolve({ request, response }) {

    if (request.user && request.user.admin != true) {

      // Get All User Profile Data
      const userProfile = await UserProfile.find({
        attributes: [
          'profileId',
          'firstName',
          'lastName',
          'displayName',
          'dateOfBirth',
          'gender',
          'phoneNumber',
          'preferredLanguage',
          'preferredCurrency',
          'location',
          'info',
          'createdAt',
          'picture',
          'countryCode',
          'country',
          'countryName',
          'zipcode',
          'isPhotoSkipped',
          'stepTwo',
          'stepThree',
          'maxInviteCount',
          'inviteCode',
          'companyName',
          'isPartner'
        ],
        where: { userId: request.user.id },
      });

      const userEmail = await User.findOne({
        attributes: [
          'email',
          'userBanStatus',
          'userType'
        ],
        where: { id: request.user.id }
      });

      const usedInvitesCount = await UserInvitation.count({
        where: {
          $and: [
            { userId: request.user.id },
            { status: { $ne: 'cancelled' } }
          ]
        }
      });

      if (userProfile && userEmail) {
        return {
          userId: request.user.id,
          profileId: userProfile.dataValues.profileId,
          firstName: userProfile.dataValues.firstName,
          lastName: userProfile.dataValues.lastName,
          displayName: userProfile.dataValues.displayName,
          gender: userProfile.dataValues.gender,
          dateOfBirth: userProfile.dataValues.dateOfBirth,
          email: userEmail.email,
          userBanStatus: userEmail.userBanStatus,
          userType: userEmail.userType,
          phoneNumber: userProfile.dataValues.phoneNumber,
          preferredLanguage: userProfile.dataValues.preferredLanguage,
          preferredCurrency: userProfile.dataValues.preferredCurrency,
          location: userProfile.dataValues.location,
          info: userProfile.dataValues.info,
          createdAt: userProfile.dataValues.createdAt,
          picture: userProfile.dataValues.picture,
          countryCode: userProfile.dataValues.countryCode,
          country: userProfile.dataValues.country,
          countryName: userProfile.dataValues.countryName,
          zipcode: userProfile.dataValues.zipcode,
          isPhotoSkipped: userProfile.dataValues.isPhotoSkipped,
          stepTwo: userProfile.dataValues.stepTwo,
          stepThree: userProfile.dataValues.stepThree,
          maxInviteCount: userProfile.dataValues.maxInviteCount,
          inviteCode: userProfile.dataValues.inviteCode,
          companyName: userProfile.dataValues.companyName,
          usedInvitesCount,
          isPartner: userProfile.dataValues.isPartner,
          status: "success"
        }
      }
    } else {
      return {
        status: "notLoggedIn"
      }
    }
  },
};

export default userAccount;