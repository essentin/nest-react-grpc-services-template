import AllReservationType from '../../types/AllReservationType';
import { Reservation } from '../../models';
import { GraphQLString as StringType, GraphQLInt as IntType } from 'graphql';

const getAllReservation = {
  type: AllReservationType,

  args: {
    userType: { type: StringType },
    currentPage: { type: IntType },
    dateFilter: { type: StringType },
    isFrom: { type: StringType },
  },

  async resolve({ request }, { userType, currentPage, dateFilter, isFrom }) {
    const limit = 5;
    let offset = 0;
    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }
    if (request.user && !request.user.admin) {
      const userId = request.user.id;
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      let count, reservationData;
      let reservationStateFilter = {
        reservationState: {
          $in: ['pending', 'approved', 'declined', 'cancelled'],
        },
      };
      let checkOutFilter = { checkOut: { $gte: today } };

      let paymentStateFilter = {
          paymentState: ['requires_capture', 'completed'],
        },
        userTypeFilter = {};

      //Booking History Reservation Filter
      let bookingHistoryCount, bookingHistoryData;
      let bookingHistoryReservationStateFilter = {
        reservationState: { $in: ['expired', 'completed'] },
      };

      //Upcoming Reservation Filter
      let upcomingBookingcount, upcomingBookingData;
      let upcomingCheckOutFilter = { checkOut: { $gte: today } };
      let upcomingReservationStateFilter = {
        reservationState: { $in: ['pending', 'approved'] },
      };

      //Cancelled Reservation Filter
      let cancelledBookingcount, cancelledBookingData;
      let cancelledReservationStateFilter = {
        reservationState: { $in: ['cancelled', 'declined'] },
      };

      if (userType === 'host') userTypeFilter = { hostId: userId };
      else userTypeFilter = { guestId: userId };

      if (isFrom) {
        //Booking History Data
        bookingHistoryCount = await Reservation.count({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              bookingHistoryReservationStateFilter,
            ],
          },
        });

        bookingHistoryData = await Reservation.findAll({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              bookingHistoryReservationStateFilter,
            ],
          },
          order: [['checkIn', 'DESC']],
        });

        // Upcoming Booking Data
        upcomingBookingcount = await Reservation.count({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              upcomingCheckOutFilter,
              upcomingReservationStateFilter,
            ],
          },
        });

        upcomingBookingData = await Reservation.findAll({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              upcomingCheckOutFilter,
              upcomingReservationStateFilter,
            ],
          },
          order: [['checkIn', 'DESC']],
        });

        // Cancelled Booking Data
        cancelledBookingcount = await Reservation.count({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              cancelledReservationStateFilter,
            ],
          },
        });

        cancelledBookingData = await Reservation.findAll({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              cancelledReservationStateFilter,
            ],
          },
          order: [['checkIn', 'DESC']],
        });
      } else {
        if (dateFilter === 'current') {
          checkOutFilter = {};
          reservationStateFilter = {
            reservationState: { $in: ['pending', 'approved'] },
          };
        } else if (dateFilter === 'previous') {
          checkOutFilter = { checkOut: { $lt: today } };
          reservationStateFilter = {
            reservationState: { $in: ['expired', 'completed'] },
          };
        } else if (dateFilter === 'cancelled') {
          checkOutFilter = {};
          reservationStateFilter = {
            reservationState: { $in: ['cancelled', 'declined'] },
          };
        }
        count = await Reservation.count({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              {
                $or: [checkOutFilter, reservationStateFilter],
              },
            ],
          },
        });
        reservationData = await Reservation.findAll({
          where: {
            $and: [
              userTypeFilter,
              paymentStateFilter,
              {
                $or: [checkOutFilter, reservationStateFilter],
              },
            ],
          },
          order: [['checkIn', 'DESC']],
          limit: limit,
          offset: offset,
        });
      }

      return {
        reservationData,
        count,
        bookingHistoryCount,
        bookingHistoryData,
        upcomingBookingcount,
        upcomingBookingData,
        cancelledBookingcount,
        cancelledBookingData,
        currentPage,
      };
    } else {
      return {
        status: 'notLoggedIn',
      };
    }
  },
};

export default getAllReservation;
