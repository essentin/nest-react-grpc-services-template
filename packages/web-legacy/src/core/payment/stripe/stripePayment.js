import stripePackage from 'stripe';
import { payment } from '../../../config';
import { getCustomerId } from './helpers/getCustomerId';
import { updateUserProfile } from './helpers/updateUserProfile';
import { updateReservation } from './helpers/updateReservation';
import createTransaction from './helpers/createTransaction';
import emailBroadcast from '../email';
import {
  addNewCardHelper,
  checkForNewPaymentMethod,
} from './helpers/addNewCardHelper';

const stripe = stripePackage(payment.stripe.secretKey);

const stripePayment = (app) => {
  app.post('/stripe-reservation', async function (req, res) {
    const cardDetails = req.body.cardDetails;
    const reservationDetails = req.body.reservationDetails;
    const paymentMethodId = req.body.paymentMethodId;
    let createCard,
      createCustomer,
      source,
      charge,
      customerId,
      intent,
      paymentIntentSecret;
    let status = 200,
      errorMessage,
      requireAdditionalAction = false,
      paymentIntentId;
    const userId = reservationDetails && reservationDetails.guestId;
    const last4Digits = cardDetails && cardDetails.last4Digits;

    if (reservationDetails) {
      // Check if stripe customer id is already created
      customerId = await getCustomerId(userId);
    } else {
      status = 400;
      errorMessage = 'Sorry, something went wrong. Please try again.';
    }

    // If customer doesn't exist, create a customer
    if (!customerId && status === 200) {
      try {
        createCustomer = await stripe.customers.create({
          email: reservationDetails.guestEmail,
          payment_method: paymentMethodId,
        });

        if ('id' in createCustomer) {
          customerId = createCustomer.id;
          await updateUserProfile(userId, customerId);

          await addNewCardHelper(
            userId,
            customerId,
            paymentMethodId,
            last4Digits,
          );
        }
      } catch (error) {
        status = 400;
        errorMessage = error.message;
      }
    } else if (customerId) {
      const { status } = await checkForNewPaymentMethod(
        customerId,
        paymentMethodId,
      );

      if (status == '400') {
        const attachPaymentMethod = await stripe.paymentMethods.attach(
          paymentMethodId,
          { customer: customerId },
        );

        await addNewCardHelper(
          userId,
          customerId,
          paymentMethodId,
          last4Digits,
        );
      }
    }

    // Create Card to get a token to make a payment
    // if (cardDetails && status === 200) {
    //     try {
    //         createCard = await stripe.tokens.create({
    //             card: cardDetails
    //         });
    //     } catch (error) {
    //         status = 400;
    //         errorMessage = error.message;
    //     }
    // }

    // Create source for the customer
    // if (customerId && createCard && status === 200) {
    //     let id = customerId;

    //     try {
    //         source = await stripe.customers.createSource(id, {
    //             source: createCard.id
    //         });
    //     } catch (error) {
    //         status = 400;
    //         errorMessage = error.message;
    //     }
    // }

    // If there is no error, the  proceed with charging
    if (status === 200) {
      try {
        // creating the payment intents with the payment method id.
        intent = await stripe.paymentIntents.create({
          amount: Math.round(reservationDetails.amount * 100),
          capture_method: 'manual',
          confirm: true,
          confirmation_method: 'manual',
          currency: reservationDetails.currency,
          customer: customerId,
          off_session: true,
          payment_method_types: ['card'],
          payment_method: paymentMethodId,
        });

        // Server response
        if (
          intent &&
          intent.status === 'requires_action' &&
          intent.next_action.type === 'use_stripe_sdk'
        ) {
          status = 400;
          requireAdditionalAction = true;
          paymentIntentSecret = intent.client_secret;
        } else if (intent && intent.status === 'requires_capture') {
          status = 200;
        } else {
          status = 400;
          errorMessage =
            'Sorry, something went wrong with your card. Please try again.';
        }
        // FOR US, below API supports
        // charge = await stripe.charges.create({
        //     amount: Math.round(reservationDetails.amount * 100),
        //     currency: reservationDetails.currency,
        //     customer: source.customer,
        //     metadata: {
        //         reservationId: reservationDetails.reservationId,
        //         listId: reservationDetails.listId,
        //         title: reservationDetails.title
        //     },
        //     description: 'Reservation: ' + reservationDetails.reservationId
        // });
      } catch (error) {
        status = 400;
        errorMessage = error.message;
      }
    }

    // if (status === 200 && charge && 'id' in charge) {
    if (status === 200 && intent && 'id' in intent) {
      paymentIntentId = intent.id;

      await updateReservation(
        reservationDetails.reservationId,
        paymentIntentId,
        intent.status,
      );
      // await blockDates(reservationDetails.reservationId);
      // await createTransaction(
      //   reservationDetails.reservationId,
      //   reservationDetails.guestEmail,
      //   customerId,
      //   intent.id,
      //   Math.round(reservationDetails.amount),
      //   reservationDetails.currency,
      //   'booking',
      //   2,
      // );
      await emailBroadcast(reservationDetails.reservationId);
    }
    let redirect =
      '/users/bookings/receipt/' + reservationDetails.reservationId;
    res.send({ status, errorMessage, redirect, paymentIntentSecret });
  });

  app.post('/stripe-reservation-confirm', async function (req, res) {
    const confirmPaymentIntentId = req.body.confirmPaymentIntentId;
    const reservationDetails = req.body.reservationDetails;
    let status = 200,
      errorMessage,
      customerId,
      confirmIntent;

    if (reservationDetails) {
      // Check if stripe customer id is already created
      customerId = await getCustomerId(reservationDetails.guestId);
    } else {
      status = 400;
      errorMessage = 'Sorry, something went wrong. Please try again.';
    }

    try {
      confirmIntent = await stripe.paymentIntents.confirm(
        confirmPaymentIntentId,
      );
    } catch (error) {
      status = 400;
      errorMessage = error.message;
    }

    if (status === 200 && confirmIntent && 'id' in confirmIntent) {
      await updateReservation(
        reservationDetails.reservationId,
        confirmPaymentIntentId,
      );
      // await blockDates(reservationDetails.reservationId);
      await createTransaction(
        reservationDetails.reservationId,
        reservationDetails.guestEmail,
        customerId,
        confirmIntent.id,
        Math.round(reservationDetails.amount),
        reservationDetails.currency,
        'booking',
        2,
      );
      await emailBroadcast(reservationDetails.reservationId);
    }

    let redirect =
      '/users/bookings/receipt/' + reservationDetails.reservationId;
    res.send({ status, errorMessage, redirect });
  });
};

export default stripePayment;
