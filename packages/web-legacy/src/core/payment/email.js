import {
  Listing,
  ListingData,
  Reservation,
  ReservationBlockedDates,
  SiteSettings,
  User,
  UserProfile,
  ActivityType,
} from '../../data/models';

import { sendEmail } from '../email/sendEmail';

export default async function emailBroadcast(id) {
  // Get Reservation Data
  const reservation = await Reservation.findOne({
    where: { id },
  });

  const activity = await ActivityType.findOne({
    where: { id: reservation.activityType },
  });

  let emailLogo, getEmailLogo;
  getEmailLogo = await SiteSettings.findOne({
    where: {
      title: 'Email Logo',
    },
    raw: true,
  });

  emailLogo = getEmailLogo && getEmailLogo.value;

  if (reservation) {
    // Get Host Data
    const host = await User.findOne({
      where: {
        id: reservation.hostId,
      },
      include: [
        {
          model: UserProfile,
          as: 'profile',
        },
      ],
    });
    // Get Guest Data
    const guest = await User.findOne({
      where: {
        id: reservation.guestId,
      },
      include: [
        {
          model: UserProfile,
          as: 'profile',
        },
      ],
    });
    // Get List Data
    const list = await Listing.findOne({
      where: {
        id: reservation.listId,
      },
      include: [
        {
          model: ListingData,
          as: 'listingData',
        },
      ],
    });

    // Get Reservation Blocked dates
    const reservationBlockedDatesData = await ReservationBlockedDates.findAll({
      where: {
        reservationId: id,
      },
    });

    const reservationDates =
      reservationBlockedDatesData && reservationBlockedDatesData.length > 0
        ? reservationBlockedDatesData
        : reservation.checkIn;

    let reservationId = reservation.id,
      confirmationCode = reservation.confirmationCode,
      hostEmail = host.email,
      hostName = host.profile.firstName,
      guestEmail = guest.email,
      guestName = guest.profile.firstName,
      guestLastName = guest.profile.lastName,
      guestLocation = guest.profile.location,
      guestProfilePic = guest.profile.picture,
      guestJoinedDate = guest.profile.createdAt,
      checkIn = reservation.checkIn,
      checkOut = reservation.checkOut,
      guests = reservation.guests,
      listTitle = list.title,
      listCity = list.city,
      allowedCheckInTime = list.listingData.checkInStart,
      allowedCheckOutTime = list.listingData.checkInEnd,
      basePrice = reservation.basePrice,
      total = reservation.total,
      hostServiceFee = reservation.hostServiceFee,
      currency = reservation.currency,
      insurance = reservation.insurance,
      tax = reservation.tax,
      guestServiceFee = reservation.guestServiceFee,
      hostTotal = 0,
      activityName = activity.name,
      listContactEmail = list.contactEmail;

    // For Booking Request
    if (reservation.reservationState === 'pending') {
      hostTotal = total;
      // Send email to host
      let contentForHost = {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        checkIn,
        checkOut,
        listTitle,
        basePrice,
        total: hostTotal,
        hostServiceFee,
        currency,
        logo: emailLogo,
        reservationDates,
      };
      await sendEmail(listContactEmail, 'bookingRequest', contentForHost);

      // Send email to guest
      let contentForguest = {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        checkIn,
        listTitle,
        logo: emailLogo,
        reservationDates,
      };
      await sendEmail(guestEmail, 'bookingRequestGuest', contentForguest);
    }

    if (reservation.reservationState === 'approved') {
      // Send email to host
      let contentForHost = {
        reservationId,
        confirmationCode,
        guestName,
        guestLastName,
        guestLocation,
        guestProfilePic,
        guestJoinedDate,
        checkIn,
        checkOut,
        guests,
        allowedCheckInTime,
        allowedCheckOutTime,
        logo: emailLogo,
        reservationDates,
        activityName,
        guestEmail,
      };
      await sendEmail(
        listContactEmail,
        'bookingConfirmedToHost',
        contentForHost,
      );

      // Send email to guest
      let contentForguest = {
        reservationId,
        hostName,
        guestName,
        listTitle,
        listCity,
        logo: emailLogo,
        reservationDates,
      };
      await sendEmail(guestEmail, 'bookingConfirmedToGuest', contentForguest);
    }

    return {
      status: 'email is sent',
    };
  } else {
    return {
      status: 'failed to send email',
    };
  }
}
