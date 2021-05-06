
import { gql } from 'react-apollo';

import {
  GET_CANCELLATION_DATA_START,
  GET_CANCELLATION_DATA_SUCCESS,
  GET_CANCELLATION_DATA_ERROR,
} from '../../constants';

import { initialize, change } from 'redux-form';
import { prepareCancellationData } from '../../helpers/prepareCancellationData';

const query = gql` 
query cancelReservationData($reservationId: Int!, $userType: String!) {
  cancelReservationData(reservationId: $reservationId, userType: $userType) {
    id
    listId
    hostId
    guestId
    checkIn
    checkOut
    guests
    basePrice
    cleaningPrice
    hostServiceFee
    guestServiceFee
    total
    currency
    confirmationCode
    reservationState
    discount
    cancellationPolicy
    createdAt
    activityType
    cancellation {
      id
      policyName
      priorDays
      accommodationPriorCheckIn
      accommodationBeforeCheckIn
      accommodationDuringCheckIn
      guestFeePriorCheckIn
      guestFeeBeforeCheckIn
      guestFeeDuringCheckIn
      hostFeePriorCheckIn
      hostFeeBeforeCheckIn
      hostFeeDuringCheckIn
      isEnable
      maxDay
    }
    listData {
      id
      title
      city
      contactEmail
      listingData {
        cancellation {
          id
          policyName
          priorDays
          accommodationPriorCheckIn
          accommodationBeforeCheckIn
          accommodationDuringCheckIn
          guestFeePriorCheckIn
          guestFeeBeforeCheckIn
          guestFeeDuringCheckIn
          hostFeePriorCheckIn
          hostFeeBeforeCheckIn
          hostFeeDuringCheckIn
          isEnable
          maxDay
        }
      }
      listPhotos {
        id
        listId
        name
        type
      }
    }
    hostData {
      profileId
      firstName
      picture
      userData {
        email
      }
    }
    guestData {
      profileId
      firstName
      picture
      userData {
        email
      }
    }
    startTime
    endTime
    totalHours
    discountPercentage
    reservationBlockedDates {
      id
      date
      startTime
      endTime
      isNextDay
      totalHours
    }
  }
}
`;


export function getCancellationData(reservationId, userType, currentPage, dateFilter) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_CANCELLATION_DATA_START,
    });

    try {
      const { data } = await client.query({
        query,
        variables: {
          reservationId,
          userType
        }
      });

      if (data && data.cancelReservationData) {
        let listContactEmail = data.cancelReservationData.listData && data.cancelReservationData.listData.contactEmail;
        await dispatch(initialize('CancellationForm', {...data.cancelReservationData, currentPage, dateFilter}));
        const cancellationData = await prepareCancellationData(userType, data.cancelReservationData);
        await dispatch(change('CancellationForm', 'cancellationData', cancellationData));
        await dispatch(change('CancellationForm', 'listContactEmail', listContactEmail));
        dispatch({
          type: GET_CANCELLATION_DATA_SUCCESS,
        });
      }

    } catch (error) {
      dispatch({
        type: GET_CANCELLATION_DATA_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
