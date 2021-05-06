export function getSubject(type, value) {
  let subject, previewText;

  if (type === 'welcomeEmail' || type === 'confirmEmail') {
    subject = 'Flowpass - bekräfta din email';
    previewText = 'Bekräfta din email';
  }
  if (type === 'bookingRequest') {
    subject = 'You have a new reservation';
    previewText = 'Great News! You have a new reservation';
  }
  if (type === 'bookingRequestGuest') {
    subject = 'Your reservation request sent to your host';
    previewText = 'Great News! Your reservation is shared with host';
  }
  if (type === 'bookingConfirmedToHost') {
    subject = 'Ny bokning i Flowpass';
    previewText = 'Ny bokning';
  }
  if (type === 'bookingConfirmedToGuest') {
    subject = 'Bokningsbekräftelse Flowpass';
    previewText = 'Bokningsbekräftelse';
  }
  if (type === 'bookingDeclinedToGuest') {
    subject = 'Your reservation request is declined by your host';
    previewText = 'We are sorry, your request is declined';
  }
  if (type === 'bookingExpiredGuest') {
    subject = 'Your reservation request is expired';
    previewText = 'We are sorry, your request is expired';
  }
  if (type === 'bookingExpiredHost') {
    subject = 'Your reservation is expired';
    previewText = 'Your reservation is expired';
  }
  if (type === 'cancelledByHost') {
    subject = 'Your reservation is cancelled by host';
    previewText = 'Your reservation is cancelled';
  }
  if (type === 'cancelledByGuest') {
    subject = 'Avbokning i Flowpass';
    previewText = 'Avbokning';
  }
  if (type === 'completedGuest') {
    subject = 'Please write a review for your host';
    previewText = 'Action Required! Write a Review';
  }
  if (type === 'completedHost') {
    subject = 'Please write a review for your guest';
    previewText = 'Action Required! Write a Review';
  }
  if (type === 'forgotPasswordLink') {
    subject = 'Återställ ditt lösenord';
    previewText = 'Återställ ditt lösenord';
  }
  if (type === 'contact') {
    subject = 'Contact Form';
    previewText = 'Contact Form';
  }
  if (type === 'banStatusServiceStatusBanned') {
    subject = 'Status Banned';
    previewText = 'Status Banned';
  }
  if (type === 'banStatusServiceStatusUnBanned') {
    subject = 'Status Unbanned';
    previewText = 'Status Unbanned';
  }
  if (type === 'contactSupport') {
    subject = 'Customer Support';
    previewText = 'Customer Support';
  }
  if (type === 'userFeedback') {
    subject = 'Customer Feedback';
    previewText = 'Customer Feedback';
  }
  if (type === 'sendInvite') {
    subject = 'Injudan Flowpass';
    previewText = 'Inbjudan Flowpass';
  }
  if (type === 'invitationDetailsToAdmin') {
    subject = 'User Invitation to join Flowpass!';
    previewText = 'User Invitation to join Flowpass!';
  }
  if (type === 'sendUserInvite') {
    subject =
      ((value && value.userName) || 'User') +
      ' har bjudit in dig till Flowpass';
    previewText = 'Inbjudan till Flowpass';
  }
  if (type === 'applyForBeta') {
    subject = 'New beta application';
    previewText = 'Beta application';
  }
  if (type === 'suggestWorkplace') {
    subject = 'New workspace recommendation';
    previewText = 'Workspace recommendation';
  }
  if (type === 'cancelBookingToGuest') {
    subject = 'Booking Cancelled';
    previewText = 'Booking Cancelled';
  }

  return {
    subject,
    previewText,
  };
}
