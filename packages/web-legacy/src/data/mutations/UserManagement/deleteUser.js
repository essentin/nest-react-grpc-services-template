import DeleteUserType from '../../types/siteadmin/DeleteUserType';
import { User, UserLogin, UserClaim, Listing, UserProfile, Reviews, Invites, DeletedInvite } from '../../models';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const deleteUser = {

  type: DeleteUserType,

  args: {
    userId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { userId }) {

    if (request.user && request.user.admin == true) {

      const updateUserStatus = await User.update({
        userDeletedAt: new Date()
      }, {
        where: {
          id: userId
        }
      });

      const deleteUserReviews = await Reviews.destroy({
        where: {
          authorId: userId
        }
      });

      if (updateUserStatus) {
        const unPublishList = await Listing.update({
          isPublished: false
        }, {
          where: {
            userId: userId
          }
        });

        const getUser = await User.findOne({
          attributes: ['email'],
          where: { id: userId }
        });

        if (getUser && getUser.email) {
          let getInvite = await Invites.findOne({
            where: { registeredEmail: getUser.email },
            raw: true
          });
          if (getInvite) {
            await Invites.destroy({ where: { registeredEmail: getUser.email } });
            getInvite = {
              ...getInvite,
              id: undefined
            }
            await DeletedInvite.create(getInvite);
          }

        }
      }

      // let isUserDeleted = false;
      // let isUserProfileDeleted = false;

      // // Delete UserProfile Data
      // const deleteUserProfile = await UserProfile.destroy({
      //     where: {
      //       userId: userId
      //     }
      // })
      // .then(function(instance){

      //   // Check if any rows are affected
      //   if(instance > 0) {
      //     isUserProfileDeleted = true;
      //   }
      // });

      // // Delete UserProfile only if User is deleted
      // if(isUserProfileDeleted === true) {

      //   // Delete User Data
      //   const deleteUser = await User.destroy({
      //       where: {
      //         id: userId
      //       }
      //   })
      //   .then(function(instance){

      //     // Check if any rows are affected
      //     if(instance > 0) {
      //       isUserDeleted = true;
      //     }
      //   });

      // }

      // Check Both Tables are deleted
      if (updateUserStatus) {
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } else {
      return { status: "failed" };
    }

  },
};

export default deleteUser;
