import sequelize from '../sequelize';
import moment from 'moment';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
} from 'graphql';

import searchListingType from '../types/searchListingType';

import {
  Listing,
  CurrencyRates,
  Currencies,
} from '../../data/models';

// Helper
import { convert } from '../../helpers/currencyConvertion';



const SearchListing = {

  type: searchListingType,

  args: {
    personCapacity: { type: StringType },
    dates: { type: StringType },
    currentPage: { type: IntType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    amenities: { type: new List(IntType) },
    parkingOptions: { type: new List(IntType) },
    priceRange: { type: StringType },
    geography: { type: StringType },
    bookingType: { type: StringType },
    geoType: { type: StringType },
    searchByMap: { type: BoolType },
    sw_lat: { type: FloatType },
    sw_lng: { type: FloatType },
    ne_lat: { type: FloatType },
    ne_lng: { type: FloatType },
    exactGuest: { type: IntType },
    minPrice: { type: FloatType },
    startTime: { type: StringType },
    endTime: { type: StringType },
    currency: { type: StringType },
    activityType: { type: IntType },
    showWhishList: { type: BoolType },
    moods: { type: IntType }
  },

  async resolve({ request }, {
    personCapacity,
    dates,
    currentPage,
    lat,
    lng,
    amenities,
    parkingOptions,
    priceRange,
    geography,
    bookingType,
    geoType,
    searchByMap,
    sw_lat,
    sw_lng,
    ne_lat,
    ne_lng,
    exactGuest,
    minPrice,
    startTime,
    endTime,
    currency,
    activityType,
    showWhishList,
    moods
  }) {
    const startTimeData = startTime && JSON.parse(startTime);
    const endTimeData = endTime && JSON.parse(endTime);

    let limit = 12, offset = 0;
    let attributesParam = ['id', 'title', 'personCapacity', 'lat', 'lng', 'coverPhoto', 'bookingType', 'userId', 'reviewsCount', 'spaceSize', 'city', 'state', 'country'];
    let publishedStatus = {}, personCapacityFilter = {}, datesFilter = {}, locationFilter = {};
    let activityTypeFilter = {};
    let amenitiesFilter = {}, spacesFilter = {}, houseRulesFilter = {}, priceRangeFilter = {}, geographyFilter = {}, moodsFilter = {};
    let bookingTypeFilter = {}, unAvailableFilter = {}, spaceAvailabilityFilter = {}, whishListFilter = {}, mapBoundsFilter = {};
    let priceRangeCurrency, rates, ratesData = {}, days = [], dateSplit, startDate, endDate;

    //Weeks days list
    dateSplit = dates && dates.split("'")
    startDate = dateSplit && dateSplit.length > 0 && new Date(dateSplit[1]);
    endDate = dateSplit && dateSplit.length > 0 && new Date(dateSplit[3]);

    if (startDate && endDate && startDate < endDate) {
      while (startDate < endDate) {
        days.push(`"${moment(startDate).format('dddd')}"`);
        startDate = moment(startDate).add(1, 'day');
        startDate = new Date(startDate);
      }
    } else if (startDate && endDate && startDate == endDate) {
      days.push(`"${moment(startDate).format('dddd')}"`);
    }

    days = [...new Set(days)];

    const data = await CurrencyRates.findAll();
    const base = await Currencies.findOne({ where: { isBaseCurrency: true } });
    if (data) {
      data.map((item) => {
        ratesData[item.dataValues.currencyCode] = item.dataValues.rate;
      })
    }
    rates = ratesData;


    // if (bookingType && bookingType === 'instant') {
    //   bookingTypeFilter = {
    //     bookingType
    //   }
    // }
    // if (searchByMap) {
    if (searchByMap && sw_lat && ne_lat && sw_lng && ne_lng) {
      mapBoundsFilter = {
        id: {
          $in: [
            sequelize.literal(`
                  SELECT
                      id
                  FROM
                      Listing
                  WHERE
                      (
                         lat BETWEEN ${sw_lat} AND ${ne_lat} 
                      ) AND (
                         lng BETWEEN ${sw_lng} AND ${ne_lng}
                      )
                `)
          ]
        }
      };
    }

    if (geoType && !searchByMap) {
      let geographyConverted = await JSON.parse(geography);
      if (geoType === 'state') {
        geographyFilter = {
          $or: [
            {
              state: geographyConverted.administrative_area_level_1_short
            },
            {
              state: {
                $like: geographyConverted.administrative_area_level_1_long + '%'
              }
            }
          ]
        };
      } else if (geoType === 'country') {
        geographyFilter = {
          country: geographyConverted.country
        };
      }
    } else {
      if (lat && lng && !searchByMap) {
        let distanceValue = 300;
        geographyFilter = {
          id: {
            $in: [
              sequelize.literal(`
                  SELECT
                      id
                  FROM
                      Listing
                  WHERE
                      (
                          6371 *
                          acos(
                              cos( radians( ${lat} ) ) *
                              cos( radians( lat ) ) *
                              cos(
                                  radians( lng ) - radians( ${lng} )
                              ) +
                              sin(radians( ${lat} )) *
                              sin(radians( lat ))
                          )
                      ) < ${distanceValue}
                `)
            ]
          }
        };
      }
    }

    // }

    unAvailableFilter = {
      id: {
        $notIn: [
          sequelize.literal(`SELECT listId FROM ListingData WHERE maxDaysNotice='unavailable'`)
        ]
      }
    };


    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }

    // Published Status
    publishedStatus = {
      isPublished: true,
    };



    // Date Range Filter
    if (dates) {
      datesFilter = {
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
      }

      spaceAvailabilityFilter = {
        $or: [
          {
            id: {
              $in: [
                sequelize.literal(`SELECT listId FROM SpaceAvailability WHERE day in (${days}) AND isOpen = true AND isWholeDay = true`)
              ]
            }
          }
        ]
        // $or: [
        //   {
        //     id: {
        //       $in: [
        //         sequelize.literal("SELECT listId FROM SpaceAvailability WHERE day = '" + moment(dates).format('dddd') + "' AND isOpen = true AND isWholeDay = true")
        //       ]
        //     }
        //   },
        //   {
        //     $and: [
        //       {
        //         id: {
        //           $in: [
        //             sequelize.literal("SELECT listId FROM SpaceAvailability WHERE day = '" + moment(dates).format('dddd') + "' AND isOpen = true AND isWholeDay = false")
        //           ]
        //         }
        //       },
        //       {
        //         id: {
        //           $in: [
        //             sequelize.literal("SELECT listId FROM SpaceAvailabilitySession WHERE day = '" + moment(dates).format('dddd') + "' AND ((startTime <= " + startTimeData.value + " AND endTime > " + endTimeData.value + ") OR (startTime = " + startTimeData.value + " AND endTime > " + startTimeData.value + ") OR(startTime = " + startTimeData.value + " AND endTime = " + endTimeData.value + ") )")
        //           ]
        //         }
        //       },
        //     ]
        //   }
        // ]
      }
    }

    if (activityType) {
      activityTypeFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM SpacePricing WHERE activityType= ${activityType}`)
          ]
        }
      }
    }

    // Amenities Filter
    if (amenities != undefined && amenities.length > 0) {
      amenitiesFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`)
          ]
        }
      };
    }

    //Moods Filter
    if (moods != undefined) {
      moodsFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserMood WHERE moodsId = '${Number(moods)}'`)
          ]
        }
      };
    }

    // SQL query for count
    const listingCount = await Listing.findAll({
      attributes: ['id'],
      where: {
        $and: [
          bookingTypeFilter,
          publishedStatus,
          // personCapacityFilter,
          datesFilter,
          amenitiesFilter,
          spacesFilter,
          houseRulesFilter,
          // priceRangeFilter,
          geographyFilter,
          // unAvailableFilter,
          spaceAvailabilityFilter,
          activityTypeFilter,
          // whishListFilter,
          moodsFilter,
          mapBoundsFilter
        ],
      },
    });

    let countLength = Object.keys(listingCount).length;

    // SQL query for results
    const listingData = await Listing.findAll({
      attributes: attributesParam,
      where: {
        $and: [
          bookingTypeFilter,
          publishedStatus,
          // personCapacityFilter,
          datesFilter,
          amenitiesFilter,
          spacesFilter,
          houseRulesFilter,
          // priceRangeFilter,
          geographyFilter,
          // unAvailableFilter,
          spaceAvailabilityFilter,
          activityTypeFilter,
          // whishListFilter,
          moodsFilter,
          mapBoundsFilter
        ],
      },
      limit: limit,
      offset: offset,
    });

    return {
      count: countLength,
      results: listingData
    }

  },
};

export default SearchListing;