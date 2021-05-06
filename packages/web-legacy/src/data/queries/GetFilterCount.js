import {
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLString as StringType

} from 'graphql';

import { Listing } from '../models';

import FilterCountType from '../types/FilterCountType';

import sequelize from '../sequelize';

const GetFilterCount = {

  type: FilterCountType,


  args: {
    moods: { type: IntType },
    amenities: { type: new List(IntType) },
    dates: { type: StringType },
    activity: { type: IntType }
  },

  async resolve({ request }, {
    moods,
    amenities,
    dates,
    activity
  }) {

    let publishedStatus, datesFilter, activityFilter, amenitiesFilter, moodsFilter;

    publishedStatus = {
      isPublished: true,
    };

    datesFilter = dates ? {
      $or: [
        {
          id: {
            $notIn: [
              sequelize.literal("SELECT listId FROM ListBlockedDates Where calendarStatus!='available'")
            ]
          }
        },
        {
          id: {
            $notIn: [
              sequelize.literal("SELECT listId FROM ListBlockedDates WHERE blockedDates BETWEEN" + dates + "and calendarStatus!='available'")
            ]
          }
        },

      ]
    } : {}

    activityFilter = activity ? {
      id: {
        $in: [
          sequelize.literal(`SELECT listId FROM SpacePricing WHERE activityType= ${activity}`)
        ]
      }
    } : {}

    amenitiesFilter = amenities && amenities.length > 0 ? {
      id: {
        $in: [
          sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`)
        ]
      }
    } : {}

    moodsFilter = moods ? {
      id: {
        $in: [
          sequelize.literal(`SELECT listId FROM UserMood WHERE moodsId = '${moods}'`)
        ]
      }
    } : {}

    const result = await Listing.findAll({
      attributes: ["id"],
      where: {
        $and: [
          publishedStatus,
          datesFilter,
          activityFilter,
          amenitiesFilter,
          moodsFilter
        ]
      }
    })
    return {
      result: Object.keys(result).length
    }

  },
};

export default GetFilterCount;