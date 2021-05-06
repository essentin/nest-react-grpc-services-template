import { cancel } from '../../actions/Reservation/cancelReservation';
import { closeCancellationModal } from '../../actions/CancellationModal/modalActions';
import gql from 'graphql-tag';

async function submit(values, dispatch) {
  if (values.cancellationData) {

    const guestQuery = gql`
    query getAllReservation($userType: String, $currentPage: Int, $dateFilter: String, $isFrom: String) {
      getAllReservation(userType: $userType, currentPage: $currentPage, dateFilter: $dateFilter, isFrom: $isFrom) {
        bookingHistoryData {
          id
          listId
          hostId
          guestId
          checkIn
          checkOut
          guests
          guestServiceFee
          hostServiceFee
          reservationState
          total
          confirmationCode
          currency
          createdAt
          activityType
          listData {
            id
            title
            street
            city
            state
            country
            zipcode
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
              }
            }
          }
          hostData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          guestData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          reservationBlockedDates {
            id
            date
            startTime
            endTime
            isNextDay
            totalHours
          }
          startTime
        }
        upcomingBookingData {
          id
          listId
          hostId
          guestId
          checkIn
          checkOut
          guests
          guestServiceFee
          hostServiceFee
          reservationState
          total
          currency
          createdAt
          confirmationCode
          activityType
          listData {
            id
            title
            street
            city
            state
            country
            zipcode
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
              }
            }
          }
          hostData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          guestData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          reservationBlockedDates {
            id
            date
            startTime
            endTime
            isNextDay
            totalHours
          }
          startTime
        }
        cancelledBookingData {
          id
          listId
          hostId
          guestId
          checkIn
          checkOut
          guests
          guestServiceFee
          hostServiceFee
          reservationState
          total
          currency
          createdAt
          confirmationCode
          activityType
          listData {
            id
            title
            street
            city
            state
            country
            zipcode
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
              }
            }
          }
          hostData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          guestData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          reservationBlockedDates {
            id
            date
            startTime
            endTime
            isNextDay
            totalHours
          }
          startTime
          cancellationDetails {
            id
            createdAt
          }
        }
        cancelledBookingCount
        bookingHistoryCount
        upcomingBookingcount
        count
        currentPage
      }
    }
    `;

    const hostQuery = gql`
    query getAllReservation($userType: String, $currentPage: Int, $dateFilter: String) {
      getAllReservation(userType: $userType, currentPage: $currentPage, dateFilter: $dateFilter) {
        reservationData {
          id
          listId
          hostId
          guestId
          checkIn
          checkOut
          guests
          guestServiceFee
          hostServiceFee
          reservationState
          total
          currency
          createdAt
          activityType
          listData {
            id
            title
            street
            city
            state
            country
            zipcode
            listingData {
              cancellation {
                id
                policyName
                priorDays
                isEnable
              }
            }
          }
          hostData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          guestData {
            profileId
            displayName
            picture
            phoneNumber
            userData {
              email
            }
          }
          reservationBlockedDates {
            id
            date
            startTime
            endTime
            isNextDay
            totalHours
          }
          startTime
        }
        count
        currentPage
      }
    }
    `;

    const refetchQueries = [{
      query: values.cancellationData.cancelledBy === "host" ? hostQuery : guestQuery,
      variables: {
        userType: values.cancellationData.cancelledBy,
        isFrom: 'viewBooking',
        currentPage: values.currentPage,
        dateFilter: values.dateFilter
      }
    }];

    dispatch(cancel(
      values.cancellationData.reservationId,
      values.cancellationData.cancellationPolicy,
      values.cancellationData.refundToGuest,
      values.cancellationData.guestServiceFee,
      values.cancellationData.hostServiceFee,
      values.cancellationData.total,
      values.cancellationData.currency,
      values.cancellationData.cancelledBy,
      values.cancellationData.message,
      values.cancellationData.checkIn,
      values.cancellationData.checkOut,
      values.cancellationData.guests,
      values.cancellationData.listTitle,
      values.cancellationData.confirmationCode,
      values.cancellationData.hostName,
      values.cancellationData.guestName,
      values.cancellationData.hostEmail,
      values.cancellationData.guestEmail,
      values.cancellationData.blockedDates,
      refetchQueries,
      values.listContactEmail
    )
    );

    dispatch(closeCancellationModal());

  }
}
export default submit;