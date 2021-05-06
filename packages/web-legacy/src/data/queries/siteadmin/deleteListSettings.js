import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import {
  ListSettings,
  UserAmenities,
  UserHouseRules,
  UserSafetyAmenities,
  UserSpaces,
  UserMood
} from '../../../data/models';

import {
  GraphQLInt as IntType,
} from 'graphql';

const deleteListSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType },
  },

  async resolve({ request }, { id }) {

    if (request.user && request.user.admin == true) {

      let isListSettingsDeleted = false;

      // For UserAmenities
      const checkUserAmenities = await UserAmenities.findOne({
        where: {
          amenitiesId: id
        }
      });

      // For UserHouseRules
      const checkUserHouseRules = await UserHouseRules.findOne({
        where: {
          houseRulesId: id
        }
      });

      // For UserSafetyAmenities
      const checkUserSafetyAmenities = await UserSafetyAmenities.findOne({
        where: {
          safetyAmenitiesId: id
        }
      });

      // For UserSpaces
      const checkUserSpaces = await UserSpaces.findOne({
        where: {
          spacesId: id
        }
      });

       // For UserMood
       const checkUserMoods = await UserMood.findOne({
        where: {
          moodsId: id
        }
      });

      if (checkUserAmenities || checkUserHouseRules || checkUserSafetyAmenities || checkUserSpaces || checkUserMoods) {
        return {
          status: '500'
        }
      }

      const removeListSettings = await ListSettings.destroy({
        where: {
          id: id
        }
      })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListSettingsDeleted = true;
          }
        });

      if (isListSettingsDeleted) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }
    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default deleteListSettings;
