import { gql } from 'react-apollo';
import moment from 'moment';
import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_END,
  BOOKING_PROCESS_END
} from '../../constants';
import { processPayment } from './processPayment';
import { openHomeAddCardModal, openViewListAddCardModal, closeHomeAddCardModal, closeViewListAddCardModal } from '../modalActions';

export function bookingProcess(listId, basePrice, minHour, discount, extendDay, totalHours, preApprove, guests,
  activityId, maxGuest, activityType, isCleaningIncluded, cleaningFee, stripe, singleDay, bookedDate) {

  return async (dispatch, getState, { client }) => {
    let selectedDates = [], checkIn, checkOut, startTime, endTime, bookingType;
    let findStartTimes = [], findEndTimes = [], startTimes = [], endTimes = [];

    dispatch({
      type: BOOKING_PROCESS_START,
      payload: {
        bookingLoading: true
      }
    });


    try {

      let query = gql`
          query UserListing($listId:String!) {
            UserListing (listId:$listId) {
              id
              userId
              title
              personCapacity
              bookingType
              spaceSize
              parkingDescription
              cardDetails {
                id
                paymentMethodId
                customerId
                last4Digits
              }
          
              houseRules {
                houseRulesId
                listsettings{
                  itemName
                  isEnable
                  settingsType {
                    typeName
                  }
                }
              }
              listingData {
                checkInStart,
                checkInEnd,
                basePrice,
                cleaningPrice,
                currency,
                weeklyDiscount,
                monthlyDiscount,
                cancellation {
                  id
                  policyName
                }
              }
              listBlockedPrice {
                id
                listId
                isSpecialPrice
                blockedDates
              }
            }
        }
      `;

      const { data } = await client.query({
        query,
        variables: {
          listId
        },
        fetchPolicy: 'network-only'
      });

      if (data && data.UserListing) {

        bookingType = data.UserListing.bookingType;

        if (singleDay) {
          checkIn = bookedDate;
          checkOut = bookedDate;
          startTime = 0;
          endTime = 0;

        } else {
          await Promise.all(extendDay && extendDay.length > 0 && extendDay.map((item, key) => {
            selectedDates.push(moment(moment(moment(item.date)).format('MM-DD-YYYY')));
          }));

          checkIn = moment.min(selectedDates);
          checkOut = moment.max(selectedDates);

          if (extendDay && extendDay.length === 1) {
            startTime = extendDay[0].startTime;
            endTime = extendDay[0].endTime;
          } else {
            findStartTimes = await Promise.all(extendDay && extendDay.length > 0 && extendDay.filter(o => moment(moment(o.date)).format("MM-DD-YYYY") === moment(moment(checkIn)).format("MM-DD-YYYY")));
            if (findStartTimes && findStartTimes.length > 0) {
              await Promise.all(findStartTimes.map((item, key) => {
                startTimes.push(item.startTime);
              }));
              startTime = Math.min.apply(null, startTimes);
            } else {
              startTime = extendDay && extendDay.length > 0 && extendDay[0].startTime;
            }

            findEndTimes = await Promise.all(extendDay && extendDay.length > 0 && extendDay.filter(o => moment(moment(o.date)).format("MM-DD-YYYY") === moment(moment(checkOut)).format("MM-DD-YYYY")));
            if (findEndTimes && findEndTimes.length > 0) {
              await Promise.all(findEndTimes.map((item, key) => {
                endTimes.push(item.endTime);
              }));
              endTime = Math.max.apply(null, endTimes);
            } else {
              endTime = extendDay && extendDay.length > 0 && extendDay[0].endTime;
            }
          }
        }

        const paymentMethodId = data.UserListing && data.UserListing.cardDetails && data.UserListing.cardDetails.paymentMethodId;
        const customerId = data.UserListing && data.UserListing.cardDetails && data.UserListing.cardDetails.customerId;

        dispatch({
          type: BOOKING_PROCESS_SUCCESS,
          payload: {
            data: data.UserListing,
            bookDetails: {
              guests,
              preApprove,
              checkIn,
              checkOut,
              startTime,
              endTime,
              basePrice,
              minHour,
              discount,
              extendDay,
              totalHours,
              bookingType,
              activityId,
              maxGuest,
              activityType,
              isCleaningIncluded,
              cleaningFee,
              singleDay,
              bookedDate
            },
            bookingLoading: false,
            paymentMethodId,
            customerId,
          }
        });

        const processPaymentDetails = {
          guests,
          preApprove,
          checkIn,
          checkOut,
          startTime,
          endTime,
          basePrice,
          minHour,
          discount,
          extendDay,
          totalHours,
          bookingType,
          activityId,
          maxGuest,
          activityType,
          isCleaningIncluded,
          cleaningFee,
          singleDay,
          bookedDate
        }

        if (paymentMethodId && customerId) {

          dispatch({
            type: BOOKING_PAYMENT_START,
            payload: { paymentLoading: true }
          });

          await dispatch(processPayment(processPaymentDetails, data.UserListing, stripe));

          dispatch({
            type: BOOKING_PROCESS_END,
            payload: {
              bookingLoading: false
            }
          });

          dispatch({
            type: BOOKING_PAYMENT_END,
            payload: { paymentLoading: false }
          });

        } else {
          dispatch(openHomeAddCardModal())
          dispatch(openViewListAddCardModal())
        }

      }

    } catch (error) {
      
      dispatch({
        type: BOOKING_PROCESS_ERROR,
        payload: {
          error,
          bookingLoading: false
        }
      });
      return false;
    }

    return true;
  };
}

