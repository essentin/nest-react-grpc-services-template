import { gql } from 'react-apollo';

import {
  GET_BLOCKED_START,
  GET_BLOCKED_SUCCESS,
  GET_BLOCKED_ERROR
} from '../../constants';


const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      listingData {
        bookingNoticeTime,
        maxDaysNotice,
        currency,
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
      spaceAvailability{
        listId
        day
        isOpen
        isWholeDay
        timeSlot{
          startTime
          endTime
          spaceAvailabilityId
          isNextDay
        }
      }
    }
  }
`;


export function getListBlockedDates(
  listId,
  isCancel,
  isMaxDays,
  isBooking,
  currency,
  spaceAvailability
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_BLOCKED_START,
    });

    try {

      let mutation = gql`
            mutation ListingDataUpdate(
                $id: Int,
                $cancellationPolicy: Int,
                $maxDaysNotice: String,
                $bookingNoticeTime: String,
                $currency: String,
                $spaceAvailability: String

            ){
                ListingDataUpdate(
                    id: $id,
                    cancellationPolicy: $cancellationPolicy,
                    maxDaysNotice: $maxDaysNotice,
                    bookingNoticeTime: $bookingNoticeTime,
                    currency: $currency,
                    spaceAvailability: $spaceAvailability
                ) {
                 status
              }
            }
           `;
      let spaceAvailabilityVal = spaceAvailability && spaceAvailability.length > 0 ? JSON.stringify(spaceAvailability) : JSON.stringify([]);


      const { data } = await client.mutate({
        mutation,
        variables: {
          id: listId,
          cancellationPolicy: isCancel,
          maxDaysNotice: isMaxDays,
          bookingNoticeTime: isBooking,
          currency: currency,
          spaceAvailability: spaceAvailabilityVal

        },
        refetchQueries: [{ query, variables: { listId: listId, preview: true } }]
      });

      if (data && data.ListingDataUpdate) {
        if (data.ListingDataUpdate.status === 'success') {
          dispatch({
            type: GET_BLOCKED_SUCCESS,
          });
          return true;
        } else {
          return false;
        }
      }

    } catch (error) {
      dispatch({
        type: GET_BLOCKED_ERROR,
        payload: {
          error
        }
      });
    }
  };
}