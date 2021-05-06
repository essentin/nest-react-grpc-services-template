import {
    PROCESS_PAYMENT_START,
    PROCESS_PAYMENT_SUCCESS,
    PROCESS_PAYMENT_ERROR,
    BOOKING_PAYMENT_START,
    BOOKING_PAYMENT_ERROR,
} from '../../constants';

import { convert } from '../../helpers/currencyConvertion';
import { makePayment } from './makePayment';
import { processCardAction } from '../PaymentIntent/processCardAction';
import { toastr } from 'react-redux-toastr';
import { openHomeAddCardModal, openViewListAddCardModal } from '../modalActions';
import { removeReservationBlockedDates } from './removeReservationBlockedDates';

export function processPayment(paymentDetails, listingDetails, stripe) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: PROCESS_PAYMENT_START
        });
        let results;
        try {
            const rates = getState().currency.rates;
            const base = getState().currency.base;
            const userAccount = getState().account.data;
            const serviceFees = getState().book.serviceFees;

            const guestId = userAccount.userId, guestEmail = userAccount.email, customerId = listingDetails.cardDetails.customerId,
                paymentMethodId = listingDetails.cardDetails.paymentMethodId, paymentType = '2',
                last4Digits = listingDetails.cardDetails.last4Digits;

            const listId = listingDetails.id, hostId = listingDetails.userId, listTitle = listingDetails.title,
                currency = listingDetails.listingData.currency, bookingType = listingDetails.bookingType;

            const guests = paymentDetails.guests ? paymentDetails.guests : paymentDetails.maxGuest;
            const extendDay = paymentDetails.extendDay ? JSON.stringify(paymentDetails.extendDay) : JSON.stringify([]);

            const checkIn = paymentDetails.checkIn,
                checkOut = paymentDetails.checkOut,
                basePrice = paymentDetails.basePrice,
                allowedPersonCapacity = paymentDetails.maxGuest,
                totalHours = paymentDetails.totalHours,
                minHour = paymentDetails.minHour,
                startTime = paymentDetails.startTime,
                endTime = paymentDetails.endTime,
                activityId = paymentDetails.activityId,
                activityType = paymentDetails.activityType,
                paymentDiscount = paymentDetails.discount,
                discountPercentage = paymentDetails.discount,
                isCleaningIncluded = paymentDetails.isCleaningIncluded,
                cleaningFee = paymentDetails.cleaningFee;

            const singleDay = paymentDetails.singleDay;
            const bookedDate = paymentDetails.bookedDate;

            let guestServiceFee = 0, hostServiceFee = 0, priceForDays = 0;
            let discountPrice = 0, discountType, total = 0, totalWithoutFees = 0;
            let discount = 0;
            let cleaningPrice = isCleaningIncluded == 'true' ? 0 : cleaningFee;
            let msg = '';

            if (!singleDay) {
                if (totalHours > 0 && extendDay && extendDay.length > 0) {
                    priceForDays = Number(basePrice) * Number(totalHours);
                    discountPrice = 0;
                    discountType = null;
                    total = 0;
                }

                if (Number(totalHours) >= 8 && Number(paymentDiscount) > 0) {
                    discountPrice = (Number(priceForDays) * Number(paymentDiscount)) / 100;
                    discountType = paymentDiscount + "% discount for 8+ hours";
                }
            } else {
                priceForDays = Number(basePrice);
                discountPrice = 0;
                discountType = null;
                total = 0;
            }


            if (serviceFees) {
                if (serviceFees.guest.type === 'percentage') {
                    guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
                } else {
                    guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
                }

                if (serviceFees.host.type === 'percentage') {
                    hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
                } else {
                    hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
                }
            }

            total = (priceForDays + guestServiceFee + cleaningPrice) - discountPrice;
            totalWithoutFees = (priceForDays + cleaningPrice) - discountPrice;
            discount = discountPrice

            results = await dispatch(makePayment(
                listId,
                listTitle,
                hostId,
                guestId,
                checkIn,
                checkOut,
                guests,
                '',
                basePrice,
                cleaningPrice,
                currency,
                discount,
                discountType,
                guestServiceFee,
                hostServiceFee,
                total,
                bookingType,
                null,
                paymentType,
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
            )
            );
            const { status, paymentIntentSecret, reservationId } = results
            if (status == 400 && paymentType == 2) {
                dispatch({
                    type: BOOKING_PAYMENT_START,
                    payload: { paymentLoading: true, reservationId }
                });
                const cardAction = await stripe.handleCardAction(
                    paymentIntentSecret,
                );
                console.log(cardAction)
                let amount = total + guestServiceFee;
                let confirmPaymentIntentId;

                if (cardAction && cardAction.paymentIntent && cardAction.paymentIntent.id) {
                    confirmPaymentIntentId = cardAction.paymentIntent.id;

                    const { handleCardActionStatus, errorMessage } = await dispatch(processCardAction(
                        reservationId,
                        listId,
                        hostId,
                        guestId,
                        listTitle,
                        guestEmail,
                        amount,
                        currency,
                        confirmPaymentIntentId
                    )
                    );

                    if (handleCardActionStatus == '400' && errorMessage) {
                        msg = cardAction.error.message;
                        toastr.error("Oops!", msg + ' ' + 'Please try again or select a different card.');
                        dispatch(openHomeAddCardModal())
                        dispatch(openViewListAddCardModal())
                        dispatch(removeReservationBlockedDates(reservationId))
                        // openPaymentBookingModal()
                    }

                } else {
                    console.log('inside last error')
                    if (cardAction && cardAction.error && cardAction.error.message) {
                        msg = cardAction.error.message;
                        toastr.error("Oops!", msg);
                        dispatch(openHomeAddCardModal())
                        dispatch(openViewListAddCardModal())
                        dispatch(removeReservationBlockedDates(reservationId))
                        // openPaymentBookingModal()
                    }
                }

                dispatch({
                    type: BOOKING_PAYMENT_ERROR,
                    payload: { paymentLoading: false }
                });
            }

            dispatch({
                type: PROCESS_PAYMENT_SUCCESS
            });

        } catch (err) {
            dispatch({
                type: BOOKING_PAYMENT_ERROR,
                payload: { paymentLoading: false }
            });
            dispatch({
                type: PROCESS_PAYMENT_ERROR
            });
            if (results && results.reservationId) {
                dispatch(removeReservationBlockedDates(results.reservationId))
            }
        }

    };
}

