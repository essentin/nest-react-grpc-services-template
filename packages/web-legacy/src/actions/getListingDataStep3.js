import { gql } from 'react-apollo';

import {
  GET_LISTING_DATA_STEP3_START,
  GET_LISTING_DATA_STEP3_SUCCESS,
  GET_LISTING_DATA_STEP3_ERROR,
} from '../constants';

import { initialize, change } from 'redux-form';
import { formatTime } from '../../src/helpers/timeHelper';

const query = gql`
  query($listId: String!, $preview: Boolean) {
    UserListing(listId: $listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      houseRules {
        houseRulesId
      }
      listingData {
        bookingNoticeTime
        checkInStart
        checkInEnd
        maxDaysNotice
        minNight
        maxNight
        basePrice
        cleaningPrice
        currency
        weeklyDiscount
        monthlyDiscount
        cancellationPolicy
      }
      blockedDates {
        blockedDates
        reservationId
        calendarStatus
        isSpecialPrice
      }
      calendars {
        id
        name
        url
        listId
        status
      }
      listBlockedPrice {
        listId
        calendarStatus
        isSpecialPrice
        blockedDates
        calendarId
        reservationId
      }
      activity {
        listId
        activityType
        basePrice
        minHour
        discount
        cleaningFee
        maxGuest
        isCleaningIncluded
      }
      spaceAvailability {
        listId
        day
        isOpen
        isWholeDay
        timeSlot {
          startTime
          endTime
          spaceAvailabilityId
          isNextDay
        }
      }
      spaceOpeningTime {
        id
        listId
        day
        startTime
        endTime
      }
    }
  }
`;

export function getListingDataStep3(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_STEP3_START,
    });

    try {
      let formValues = null;
      let settingFieldsData = {};
      const houseRules = [];
      const updatedBlockedDates = [];
      const updatedDisabledDates = [];
      const updatedAvailableDates = [];
      const updatedAvailableDatesPrices = [];
      let activity = [],
        listActivity = [];

      let listData = {};
      let calendars = {};

      const activityType = getState().activityType.data;

      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });

      if (data && data.UserListing) {
        // Preparing List data
        listData = data.UserListing.listingData;
        calendars = data.UserListing.calendars;
        listActivity = data.UserListing.activity;

        // Preparing for house rules
        if (data.UserListing.houseRules.length > 0) {
          data.UserListing.houseRules.map((item, value) => {
            houseRules.push(parseInt(item.houseRulesId));
          });
          settingFieldsData = Object.assign({}, listData, { houseRules });
        }

        // Preparing for blocked dates
        if (data.UserListing.blockedDates.length > 0) {
          data.UserListing.blockedDates.map((item, value) => {
            if (item.reservationId != null) {
              updatedDisabledDates.push(new Date(item.blockedDates));
            }
            if (item.calendarStatus && item.calendarStatus === 'available') {
              updatedAvailableDates.push(new Date(item.blockedDates));
              updatedAvailableDatesPrices.push({
                date: new Date(item.blockedDates),
                isSpecialPrice: item.isSpecialPrice,
              });
            } else {
              updatedBlockedDates.push(new Date(item.blockedDates));
            }
          });
          settingFieldsData = Object.assign({}, listData, settingFieldsData, {
            disabledDates: updatedDisabledDates,
            blockedDates: updatedBlockedDates,
            availableDates: updatedAvailableDates,
            availableDatesPrices: updatedAvailableDatesPrices,
          });
        }

        await dispatch(change('ListPlaceStep3', 'calendars', calendars));
        if (updatedBlockedDates) {
          await dispatch(
            change('ListPlaceStep3', 'blockedDates', updatedBlockedDates),
          );
        } else if (updatedAvailableDates) {
          await dispatch(
            change('ListPlaceStep3', 'blockedDates', updatedAvailableDates),
          );
        } else if (updatedAvailableDatesPrices) {
          await dispatch(
            change(
              'ListPlaceStep3',
              'blockedDates',
              updatedAvailableDatesPrices,
            ),
          );
        }

        // Preparing for activity
        {
          activityType &&
            activityType.results.length > 0 &&
            activityType.results.map((item, index) => {
              if (item.isEnable == 1) {
                if (listActivity && listActivity.length > 0) {
                  let checkValue = listActivity.find(
                    o => item.id == o.activityType,
                  );
                  if (checkValue != undefined) {
                    activity.push({
                      listId: checkValue.listId,
                      activityType: checkValue.activityType,
                      basePrice: checkValue.basePrice,
                      minHour: checkValue.minHour,
                      discount: checkValue.discount,
                      cleaningFee: checkValue.cleaningFee,
                      maxGuest: checkValue.maxGuest,
                      isCleaningIncluded: checkValue.isCleaningIncluded,
                      isSelected: true,
                    });
                  } else {
                    activity.push({
                      activityType: item.id,
                      isSelected: false,
                      isCleaningIncluded: 'true',
                    });
                  }
                } else {
                  activity.push({
                    typeId: item.id,
                    isSelected: false,
                    isCleaningIncluded: 'true',
                  });
                }
              }
            });
        }

        // Preparing for spaceAvailability
        let spaceAvailable = [];
        {
          data.UserListing.spaceAvailability &&
            data.UserListing.spaceAvailability.length > 0 &&
            data.UserListing.spaceAvailability.map((item, index) => {
              let timeSlotValue = [];
              if (item.timeSlot && item.timeSlot.length > 0) {
                item.timeSlot.map((value, index) => {
                  timeSlotValue.push({
                    startTime: {
                      label: formatTime(value.startTime),
                      value: value.startTime,
                      isNextDay: value.isNextDay,
                    },
                    endTime: {
                      label: formatTime(value.endTime),
                      value: value.endTime,
                      isNextDay: value.isNextDay,
                    },
                    spaceAvailabilityId: value.spaceAvailabilityId,
                  });
                });
              }
              spaceAvailable.push({
                listId: item.listId,
                day: item.day,
                isOpen: item.isOpen,
                isWholeDay: item.isWholeDay,
                timeSlot: timeSlotValue,
              });
            });
        }

        let spaceOpeningTime = [];
        {
          data.UserListing.spaceOpeningTime &&
            data.UserListing.spaceOpeningTime.length > 0 &&
            data.UserListing.spaceOpeningTime.map((item, index) => {
              spaceOpeningTime.push({
                listId: item.listId,
                day: item.day,
                startTime: {
                  label: formatTime(item.startTime, true),
                  value: item.startTime,
                  isNextDay: false
                },
                endTime: {
                  label: item.endTime == 24 ? '23.59' : formatTime(item.endTime, true),
                  value: item.endTime,
                  isNextDay: false
                }
              });
            });
        }

        formValues = Object.assign(
          {},
          data.UserListing,
          settingFieldsData,
          listData,
          calendars,
          { activity: activity },
          { spaceAvailability: spaceAvailable },
          { spaceOpeningTime }
        );

        // Reinitialize the form values
        await dispatch(initialize('ListPlaceStep3', formValues));

        // Dispatch a success action
        dispatch({
          type: GET_LISTING_DATA_STEP3_SUCCESS,
          step3DataIsLoaded: true,
          isExistingList: true,
          calendars: data.UserListing.calendars,
        });
      } else {
        dispatch({
          type: GET_LISTING_DATA_STEP3_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_STEP3_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
