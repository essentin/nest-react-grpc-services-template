import { gql } from 'react-apollo';
import {
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR,
} from '../../constants';

// Helper
import { convert } from '../../helpers/currencyConvertion';

// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

import { toastr } from 'react-redux-toastr';

export function makePayment(
  listId,
  title,
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
  paymentCurrency,
  paymentType,
  // name,
  // cardNumber,
  // cvv,
  // expiryDate,
  // expiryYear,
  guestEmail,
  paymentMethodId,
  startTime,
  endTime,
  totalHours,
  minHour,
  discountPercentage,
  extendDay,
  activityId,
  activityType,
  last4Digits,
  singleDay
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PAYMENT_START,
      payload: { paymentLoading: true }
    });

    try {


      let validCheckIn = checkIn._d == 'Invalid Date' ? checkIn._i : checkIn._d;
      let validCheckOut = checkOut._d == 'Invalid Date' ? checkOut._i : checkOut._d;


      const mutation = gql`
        mutation createReservation(
          $listId: Int!, 
          $hostId: String!,
          $guestId: String!,
          $checkIn: String!,
          $checkOut: String!,
          $guests: Int!,
          $message: String,
          $basePrice: Float!,
          $cleaningPrice: Float,
          $currency: String!,
          $discount: Float,
          $discountType: String,
          $guestServiceFee: Float,
          $hostServiceFee: Float,
          $total: Float!,
          $bookingType: String,
          $paymentType: Int!,
          $cancellationPolicy: Int!,
          $startTime: Float,
          $endTime: Float,
          $totalHours: Float,
          $minHour: Float,
          $discountPercentage: Float,
          $extendDay: String,
          $activityId: Int,
          $listTitle: String,
          $activityType: Int,
          $singleDay: Boolean,
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
              bookingType: $bookingType,
              paymentType: $paymentType,
              cancellationPolicy: $cancellationPolicy,
              startTime: $startTime,
              endTime: $endTime,
              totalHours: $totalHours,
              minHour: $minHour,
              discountPercentage: $discountPercentage,
              extendDay: $extendDay,
              activityId: $activityId,
              listTitle: $listTitle,
              activityType: $activityType,
              singleDay: $singleDay,
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
                paymentMethodId,
                cancellationPolicy,
                activityId,
                listTitle,
                activityType
            }
        }
      `;

      let preApprove = getState().book.bookDetails.preApprove;
      let bookingTypeData;
      if (preApprove === true) {
        bookingTypeData = 'instant';
      } else {
        bookingTypeData = bookingType;
      }

      let cancellationPolicy = getState().book.data.listingData.cancellation.id;

      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
          hostId,
          guestId,
          checkIn: validCheckIn,
          checkOut: validCheckOut,
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
          bookingType: bookingTypeData,
          paymentType,
          cancellationPolicy,
          startTime,
          endTime,
          totalHours,
          minHour,
          discountPercentage,
          extendDay,
          activityId,
          listTitle: title,
          activityType,
          singleDay
        }
      })

      if (data && data.createReservation) {
        let reservationId = data.createReservation.id;
        let amount = total + guestServiceFee;
        let rates = getState().currency.rates;
        let currentCurrency = (getState().currency.to) ? getState().currency.to : getState().currency.base;
        let baseCurrency = getState().currency.base;
        let convertedAmount = 0;

        let overAllAmount = amount && amount.toString().split(".")
        let isAmount = 0;
        if (overAllAmount && overAllAmount[1] == "00") {
          isAmount = overAllAmount && overAllAmount[0];
          // isAmount = Math.round(amount);
        } else {
          isAmount = amount;
        }

          convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency)
          let cardDetails = {
            last4Digits
          };
          // let cardDetails = {
          //   name,
          //   number: cardNumber,
          //   exp_month: expiryDate,
          //   exp_year: expiryYear,
          //   cvc: cvv
          // };
          let reservationDetails = {
            reservationId,
            listId,
            hostId,
            guestId,
            guestEmail,
            title,
            amount: convertedAmount.toFixed(2),
            currency: currentCurrency
          };
          const { status, errorMessage, paymentIntentSecret } = await processStripePayment(
            'reservation',
            cardDetails,
            reservationDetails,
            paymentMethodId,
          );

          if (status === 200) {
            await dispatch({
              type: BOOKING_PAYMENT_SUCCESS,
              payload: { paymentLoading: true }
            });

            return {
              status
            }

          } else {
            errorMessage ? toastr.error('Failed!', errorMessage) : '';
            await dispatch({
              type: BOOKING_PAYMENT_ERROR,
              payload: { paymentLoading: false }
            });
            return {
              status,
              paymentIntentSecret,
              reservationId
            }
          }
      }
    } catch (error) {
      dispatch({
        type: BOOKING_PAYMENT_ERROR,
        payload: { error, paymentLoading: false }
      });
      return false;
    }

    return true;
  };
}

