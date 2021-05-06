import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

import { 
  Reservation, 
  ReservationBlockedDates, 
  // ListBlockedDates 
} from '../../models';

import { checkUserType } from '../../../helpers/checkUserType';

const createReservation = {

  type: ReservationType,

  args: {
    listId: { type: new NonNull(IntType) },
    hostId: { type: new NonNull(StringType) },
    guestId: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
    message: { type: StringType },
    basePrice: { type: new NonNull(FloatType) },
    cleaningPrice: { type: FloatType },
    currency: { type: new NonNull(StringType) },
    discount: { type: FloatType },
    discountType: { type: StringType },
    guestServiceFee: { type: FloatType },
    hostServiceFee: { type: FloatType },
    total: { type: new NonNull(FloatType) },
    bookingType: { type: StringType },
    paymentType: { type: IntType },
    cancellationPolicy: { type: IntType },
    startTime: { type: FloatType },
    endTime: { type: FloatType },
    totalHours: { type: FloatType },
    minHour: { type: FloatType },
    discountPercentage: { type: FloatType },
    extendDay: { type: StringType },
    activityId: { type: IntType },
    listTitle: { type: StringType },
    activityType: { type: IntType },
    singleDay: { type: BooleanType },
  },

  async resolve({ request, response }, {
    listId,
    hostId,
    guestId,
    checkIn,
    checkOut,
    guests,
    message,
    basePrice,
    cleaningPrice,
    currency,
    discount,
    discountType,
    guestServiceFee,
    hostServiceFee,
    total,
    bookingType,
    paymentType,
    cancellationPolicy,
    startTime,
    endTime,
    totalHours,
    minHour,
    discountPercentage,
    extendDay,
    activityId,
    listTitle,
    activityType,
    singleDay
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      let isGuest = await checkUserType(request.user.id, 1);
      if (!isGuest) return { status: "failed" };

      const userId = request.user.id;
      let confirmationCode = Math.floor(100000 + Math.random() * 900000);
      let reservationState, convertedExtendDay, reservationId;
      let extendDayData = [], extendDayObj;
      convertedExtendDay = JSON.parse(extendDay);

      if (bookingType === 'instant') {
        reservationState = 'approved';
      }
      const reservation = await Reservation.create({
        listId,
        hostId,
        guestId,
        checkIn,
        checkOut,
        guests,
        message,
        basePrice,
        cleaningPrice,
        currency,
        discount,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        confirmationCode,
        reservationState,
        paymentMethodId: paymentType,
        cancellationPolicy,
        startTime,
        endTime,
        totalHours,
        minHour,
        discountPercentage,
        activityId,
        listTitle,
        activityType
      });

      if (reservation) {

        reservationId = reservation.dataValues.id;

        if (convertedExtendDay && convertedExtendDay.length > 0 && !singleDay) {
          await Promise.all(convertedExtendDay.map((item, key) => {
            let currentTotalHours = 0;
            if (Number(item.endTime) > Number(item.startTime)) {
              currentTotalHours = Number(item.endTime) - Number(item.startTime);
            } else {
              currentTotalHours = (24 - Number(item.startTime)) + Number(item.endTime);
            }

            extendDayObj = {
              listId,
              reservationId,
              date: item.date,
              startTime: item.startTime,
              endTime: item.endTime,
              isNextDay: (item.isNextDay !== undefined ? item.isNextDay : item.endTimeObj.isNextDay),
              totalHours: currentTotalHours
            };
            extendDayData.push(extendDayObj);
          }));
          // Insert Booked Timeslots
          if (extendDayData && extendDayData.length > 0) {
            const insertReservationBlockedDates = await ReservationBlockedDates.bulkCreate(extendDayData);
          }

        } 
        // else {
        //   await ListBlockedDates.create({
        //     listId,
        //     reservationId,
        //     blockedDates: reservation.dataValues.checkIn,
        //     calendarStatus: 'blocked'
        //   })
        // }

        return reservation;
      } else {
        return {
          status: 'failed to create a reservation'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default createReservation;

/**
mutation createReservation(
  $listId: Int!,
  $hostId: String!,
  $guestId: String!,
  $checkIn: String!,
  $checkOut: String!,
  $guests: Int!,
  $message: String!,
  $basePrice: Float!,
  $cleaningPrice: Float!,
  $currency: String!,
  $discount: Float,
  $discountType: String,
  $guestServiceFee: Float,
  $hostServiceFee: Float,
  $total: Float!,
  $bookingType: String
){
    createReservation(
      listId: $listId,
      hostId: $hostId,
      guestId: $guestId,
      checkIn: $checkIn,
      checkOut: $checkOut,
      guests: $guests,
      message: $message,
      basePrice: $basePrice,
      cleaningPrice: $cleaningPrice,
      currency: $currency,
      discount: $discount,
      discountType: $discountType,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      bookingType: $bookingType
    ) {
        id
        listId,
        hostId,
        guestId,
        checkIn,
        checkOut,
        guests,
        message,
        basePrice,
        cleaningPrice,
        currency,
        discount,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        confirmationCode,
        createdAt
        status
    }
}
**/
