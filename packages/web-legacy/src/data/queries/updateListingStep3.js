// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing,
  UserHouseRules,
  ListingData,
  ListBlockedDates,
  ListPhotos,
  Currencies,
  SpacePricing,
  SpaceAvailability,
  SpaceAvailabilitySession,
  SpaceOpeningTime
} from '../../data/models';

const updateListingStep3 = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    houseRules: { type: new List(IntType) },
    bookingNoticeTime: { type: StringType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    maxDaysNotice: { type: StringType },
    minNight: { type: IntType },
    maxNight: { type: IntType },
    basePrice: { type: FloatType },
    cleaningPrice: { type: FloatType },
    currency: { type: StringType },
    weeklyDiscount: { type: IntType },
    monthlyDiscount: { type: IntType },
    blockedDates: { type: new List(StringType) },
    bookingType: { type: new NonNull(StringType) },
    cancellationPolicy: { type: IntType },
    activity: { type: StringType },
    spaceAvailability: { type: StringType },
    spaceOpeningTime: { type: StringType },
  },

  async resolve({ request, response }, {
    id,
    houseRules,
    bookingNoticeTime,
    checkInStart,
    checkInEnd,
    maxDaysNotice,
    minNight,
    maxNight,
    basePrice,
    cleaningPrice,
    currency,
    weeklyDiscount,
    monthlyDiscount,
    blockedDates,
    bookingType,
    cancellationPolicy,
    activity,
    spaceAvailability,
    spaceOpeningTime
  }) {

    let isListUpdated = false;

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      const activityData = JSON.parse(activity);
      const spaceAvailabilityData = JSON.parse(spaceAvailability);
      const spaceOpeningTimeData = JSON.parse(spaceOpeningTime);


      // Confirm whether the Listing Id is available
      const isListingAvailable = await Listing.findById(id);

      if (isListingAvailable != null) {

        // Currency
        let getCurrenice = await Currencies.findOne({
          where: {
            isBaseCurrency: true
          }
        });

        let currencyValue = currency ? currency : getCurrenice.symbol;

        // Update Booking Type
        if (bookingType) {
          const updateBookingType = await Listing.update({
            bookingType
          }, {
            where
          })
        }

        // House Rules
        if (houseRules) {
          const removeHouseRules = await UserHouseRules.destroy({
            where: {
              listId: id
            }
          });
          if (houseRules.length > 0) {
            houseRules.map(async (item, key) => {
              let updateHouseRules = await UserHouseRules.create({
                listId: id,
                houseRulesId: item
              })
            });
          }
        }

        if (activityData) {
          const removeActivityData = await SpacePricing.destroy({
            where: {
              listId: id,
            }
          });

          if (activityData.length > 0) {
            activityData.map(async (item, key) => {
              if (item.isSelected == true) {
                let updateActivityData = await SpacePricing.create({
                  listId: id,
                  activityType: item.activityType,
                  basePrice: item.basePrice,
                  minHour: item.minHour,
                  discount: item.discount ? item.discount : null,
                  cleaningFee: item.isCleaningIncluded == 'true' ? 0 : item.cleaningFee,
                  maxGuest: item.maxGuest,
                  isCleaningIncluded: item.isCleaningIncluded,
                  currency: currency
                })
              }
            });
          }
        }

        if (spaceAvailabilityData) {
          const removeSpaceAvailability = await SpaceAvailability.destroy({
            where: {
              listId: id,
            }
          });

          const removeSpaceSession = await SpaceAvailabilitySession.destroy({
            where: {
              listId: id,
            }
          });

          if (spaceAvailabilityData.length > 0) {
            spaceAvailabilityData.map(async (item, key) => {

              let updateSpaceAvailability = await SpaceAvailability.create({
                listId: id,
                day: item.day,
                isOpen: item.isOpen,
                isWholeDay: item.isWholeDay,
              })

              if (item.isWholeDay == 'false' && item.isOpen) {
                item.timeSlot && item.timeSlot.length > 0 && item.timeSlot.map(async (value, key) => {

                  let updateSpaceSession = await SpaceAvailabilitySession.create({
                    listId: id,
                    spaceAvailabilityId: updateSpaceAvailability.id,
                    day: item.day,
                    startTime: value.startTime.value,
                    endTime: value.endTime.value,
                    isNextDay: value.endTime.isNextDay
                  })

                })
              }
            });
          }
        }

        if (spaceOpeningTimeData && spaceOpeningTimeData.length > 0) {
          let openingTimeData = [];

          await SpaceOpeningTime.destroy({ where: { listId: id } });

          spaceOpeningTimeData.map(async (item, key) => {
            if (item.startTime && item.endTime) {
              openingTimeData.push({
                listId: id,
                day: item.day,
                startTime: item.startTime.value,
                endTime: item.endTime.value,
              });
            }
          });

          await SpaceOpeningTime.bulkCreate(openingTimeData);
        }

        // Check if record already available for this listing
        const isListingIdAvailable = await ListingData.findOne({ where: { listId: id } });

        if (isListingIdAvailable != null) {
          // Update Record
          const updateData = ListingData.update({
            bookingNoticeTime: bookingNoticeTime,
            checkInStart: checkInStart,
            checkInEnd: checkInEnd,
            maxDaysNotice: maxDaysNotice,
            minNight: minNight,
            maxNight: maxNight,
            basePrice: basePrice,
            cleaningPrice: cleaningPrice,
            currency: currencyValue,
            weeklyDiscount,
            monthlyDiscount,
            cancellationPolicy
          },
            {
              where: {
                listId: id
              }
            });
          isListUpdated = true;
        } else {
          // Create New Record
          const createData = ListingData.create({
            listId: id,
            bookingNoticeTime: bookingNoticeTime,
            checkInStart: checkInStart,
            checkInEnd: checkInEnd,
            maxDaysNotice: maxDaysNotice,
            minNight: minNight,
            maxNight: maxNight,
            basePrice: basePrice,
            cleaningPrice: cleaningPrice,
            currency: currencyValue,
            weeklyDiscount: weeklyDiscount,
            monthlyDiscount: monthlyDiscount,
            cancellationPolicy
          });

          if (createData) {
            isListUpdated = true;
          }
        }


        if (isListUpdated) {
          const photosCount = await ListPhotos.count({ where: { listId: id } });
          if (photosCount > 0) {
            const updateListingStatus = await Listing.update({
              isReady: true
            }, {
              where: { id }
            });
          }
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
          status: 'notAvailable'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListingStep3;