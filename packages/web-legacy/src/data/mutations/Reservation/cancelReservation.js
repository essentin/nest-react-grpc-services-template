import moment from 'moment';

import { sendEmailFromServer } from '../../../core/email/sendEmailFromServer';

// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import {
  Reservation,
  ReservationBlockedDates,
  CancellationDetails,
  UserProfile,
  ListBlockedDates,
  Listing,
  User
} from '../../models';

import { sendNotifications } from '../../../helpers/sendNotifications';

const cancelReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    cancellationPolicy: { type: new NonNull(StringType) },
    refundToGuest: { type: new NonNull(FloatType) },
    guestServiceFee: { type: new NonNull(FloatType) },
    hostServiceFee: { type: new NonNull(FloatType) },
    total: { type: new NonNull(FloatType) },
    currency: { type: new NonNull(StringType) },
    cancelledBy: { type: new NonNull(StringType) },
    message: { type: StringType },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
  },

  async resolve({ request, response }, {
    reservationId,
    cancellationPolicy,
    refundToGuest,
    guestServiceFee,
    hostServiceFee,
    total,
    currency,
    userId,
    cancelledBy,
    message,
    checkIn,
    checkOut,
    guests
  }) {
    let isReservationUpdated = false;
    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      let notifyUserId, notifyUserType, notifyContent;
      let userName, messageContent;

      const getReservation = await Reservation.findOne({
        attributes: [
          ['hostId', 'host'],
          ['guestId', 'guest'],
          'listId'
        ],
        where: {
          id: reservationId
        },
        raw: true
      });

      if (getReservation && getReservation.host && getReservation.guest) {
        notifyUserId = getReservation.host === userId ? getReservation.guest : getReservation.host;
        notifyUserType = getReservation.host === userId ? 'guest' : 'host';
      }

      const hostProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
          userId: getReservation.host
        },
        raw: true
      });

      const guestProfile = await User.findOne({
        attributes: ['id', 'email'],
        where: {
          id: getReservation.guest,
          userDeletedAt: null,
          userBanStatus: false
        },
        include: [
          {
            model: UserProfile,
            as: 'profile',
            attributes: ['firstName']
          }
        ],
        raw: true
      });

      if (hostProfile && guestProfile && getReservation) {
        userName = getReservation.host === userId ? (hostProfile && hostProfile['firstName']) : (guestProfile && guestProfile['profile.firstName']);
      }


      const count = await Reservation.count({
        where: {
          id: reservationId,
          reservationState: 'cancelled'
        }
      });

      if (count > 0) {
        return {
          status: '400'
        };
      }

      // Update Reservation table
      const updateReservation = await Reservation.update({
        reservationState: 'cancelled'
      }, {
        where: {
          id: reservationId
        }
      }).then(function (instance) {
        // Check if any rows are affected
        if (instance > 0) {
          isReservationUpdated = true;
        }
      });

      // Unblock the blocked dates only if guest cancels the reservation
      if (cancelledBy === 'guest') {

        const unlockBlockedTimes = await ReservationBlockedDates.update({
          isCancel: true
        }, {
          where: {
            reservationId
          }
        });

        await ListBlockedDates.destroy({
          where: { reservationId }
        })

      }

      const listingData = await Listing.findOne({
        attributes: ['title'],
        where: {
          id: getReservation.listId,
        }
      });

      // Create record for cancellation details
      const cancellation = CancellationDetails.create({
        reservationId,
        cancellationPolicy,
        refundToGuest,
        guestServiceFee,
        hostServiceFee,
        total,
        currency,
        cancelledBy
      });

      messageContent = userName + ': ' + message;

      notifyContent = {
        "screenType": "trips",
        "title": 'Booking is Cancelled',
        "userType": notifyUserType.toString(),
        "message": messageContent.toString()
      };

      if (isReservationUpdated) {
        sendNotifications(notifyContent, notifyUserId);

        if (guestProfile && guestProfile.email && getReservation.guest === userId)
          await sendEmailFromServer(guestProfile.email, 'cancelBookingToGuest', {
            guestName: guestProfile['profile.firstName'] || '',
            listTitle: listingData && listingData.title || '',
            cancelledOn: moment().utcOffset('+0200').format('DD/MM/YYYY')
          });

        return {
          status: '200'
        };
      } else {
        return {
          status: '400'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default cancelReservation;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $cancelledBy: String!,
  $message: String!
){
    cancelReservation(
      reservationId: $reservationId,
      cancellationPolicy: $cancellationPolicy,
      refundToGuest: $refundToGuest,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      currency: $currency,
      cancelledBy: $cancelledBy,
      message: $message
    ) {
        status
    }
}
**/
