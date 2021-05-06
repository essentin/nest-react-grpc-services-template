import { Listing, ListingData, Reservation, User, UserProfile } from '../../data/models';
import { sendEmail } from '../email/sendEmail';

export async function emailBroadcast(id, logo) {
  // Get Reservation Data
  const reservation = await Reservation.findOne({
    where: { id }
  });
  if (reservation) {
    // Get Host Data
    const host = await User.findOne({
      where: {
        id: reservation.hostId,
      },
      include: [
        {
          model: UserProfile,
          as: 'profile'
        }
      ]
    });
    // Get Guest Data
    const guest = await User.findOne({
      where: {
        id: reservation.guestId,
      },
      include: [
        {
          model: UserProfile,
          as: 'profile'
        }
      ]
    });
    // Get List Data
    const list = await Listing.findOne({
      where: {
        id: reservation.listId
      },
      include: [
        {
          model: ListingData,
          as: 'listingData'
        }
      ]
    });

    let reservationId = reservation.id,
      confirmationCode = reservation.confirmationCode,
      hostEmail = host.email,
      hostName = host.profile.firstName,
      guestEmail = guest.email,
      guestName = guest.profile.firstName,
      checkIn = reservation.checkIn,
      listTitle = list.title,
      listContactEmail = list.contactEmail;

    // Send email to host
    let contentForHost = {
      reservationId,
      confirmationCode,
      hostName,
      guestName,
      listTitle,
      logo
    };
    await sendEmail(listContactEmail, 'bookingExpiredHost', contentForHost);

    // Send email to guest
    let contentForGuest = {
      reservationId,
      listTitle,
      guestName,
      checkIn,
      confirmationCode,
      logo
    };
    await sendEmail(guestEmail, 'bookingExpiredGuest', contentForGuest);

    return {
      status: 'email is sent'
    };
  } else {
    return {
      status: 'failed to send email'
    }
  }
}