import StripePackage from 'stripe';
import sequelize from 'sequelize';
import moment from 'moment';
import { job } from 'cron';
import { payment, adminEmail } from '../../config';
import {
  ActivityType,
  Reservation,
  User,
  UserProfile,
} from '../../data/models';
import createTransaction from '../payment/stripe/helpers/createTransaction';
import sendgrid, { sendgridTemplates } from '../../core/email/sendgrid';

const stripe = StripePackage(payment.stripe.secretKey);

const capturePaymentIntents = () => {
  job('0 0 8 * * *', paymentHandler, null, true);
};

const paymentHandler = async () => {
  for (let reservation of await getReservationsToCapture()) {
    try {
      await sendPaymentConfirmationEmail(reservation);
    } catch (error) {
      await sendPaymentFailureEmail(error);
    }
  }
};

const sendPaymentConfirmationEmail = async (reservation) => {
  const customer = await getUser(reservation);
  const customerProfile = await getUserProfile(reservation);
  const spaceType = await getSpaceType(reservation);
  const capture = await capturePayment(reservation);
  const transaction = await createTransactionEntry(reservation, customer, customerProfile);
  const currencyFormatter = getCurrencyFormatter(reservation.currency);

  return await sendgrid.send(
    [...new Set([...adminEmail, customer.email])],
    {
      subject: `Payment for reservation`,
      receiptId: transaction.id,
      firstName: customerProfile.firstName,
      lastName: customerProfile.lastName,
      spaceType: spaceType.name,
      spaceName: reservation.listTitle,
      checkIn: moment.utc(reservation.checkIn).format('YYYY-MM-DD'),
      subtotal: currencyFormatter(reservation.total * 0.8), //TODO replace hard coded VAT
      tax: currencyFormatter(reservation.total * 0.2), //TODO replace hard coded VAT
      total: currencyFormatter(reservation.total),
    },
    sendgridTemplates.paymentCaptureConfirmation,
  );
};

const sendPaymentFailureEmail = async (error) => {
  let message;

  try {
    message = JSON.stringify(error, null, 2);
  } catch (e) {
    message = error.toString();
  }

  return await sendgrid.send(
    adminEmail,
    {
      subject: `Payment for reservation`,
      content: `<p>
        There was an error while collecting a payment for reservation.<br/>
        Error details:
      </p>
      <pre>${message}</pre>
      `,
    },
    sendgridTemplates.generic,
  );
};

const getCurrencyFormatter = (currency) =>
  new Intl.NumberFormat(
    'en-US', //TODO: implement dynamic locale
    {
      style: 'currency',
      currency,
    },
  ).format;

const capturePayment = async (reservation) => {
  const capture = await stripe.paymentIntents.capture(
    reservation.paymentIntentId,
  );

  if (!capture) throw new Error('Unable to capture payment');

  reservation.paymentState = 'completed';
  await reservation.save();

  return capture;
};

const getUser = async (reservation) => {
  const user = await User.findOne({
    attributes: ['email'],
    where: { id: reservation.guestId },
  });

  if (!user) throw new Error('Unable to find user');

  return user;
};

const getUserProfile = async (reservation) => {
  const userProfile = await UserProfile.findOne({
    attributes: ['firstName', 'lastName', 'displayName', 'stripeCusId'],
    where: { userId: reservation.guestId },
  });

  if (!userProfile) throw new Error('Unable to find user profile');

  return userProfile;
};

const createTransactionEntry = async (reservation, customer, customerProfile) => {
  const transaction = await createTransaction(
    reservation.id,
    customer.email,
    customerProfile.stripeCusId,
    reservation.paymentIntentId,
    reservation.total,
    'booking',
    reservation.paymentMethodId,
  );

  if (!transaction || transaction.status !== 'created')
    throw new Error('Unable to create transaction');

  return transaction.instance;
};

const getReservationsToCapture = async () => {
  const reservations = await Reservation.findAll({
    where: {
      paymentState: 'requires_capture',
      checkIn: sequelize.where(
        sequelize.fn('date', sequelize.col(`checkIn`)),
        `<=`,
        moment().utc().format(`YYYY-MM-DD`),
      ),
      reservationState: 'approved',
    },
  });

  if (!reservations) throw new Error('Unable to collect reservations');

  return reservations;
};

const getSpaceType = async (reservation) => {
  const spaceType = await ActivityType.findOne({
    where: {
      id: reservation.activityType,
    },
  });

  if (!spaceType) throw new Error('Unable to find activity type');

  return spaceType;
};

export default capturePaymentIntents;
