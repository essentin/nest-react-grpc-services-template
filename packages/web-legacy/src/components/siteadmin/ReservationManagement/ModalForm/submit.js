// Redux Actions
import { refundGuest } from '../../../../actions/Reservation/refundGuest';
import { closeReservationModal } from '../../../../actions/Reservation/reservationModal';

async function submit(values, dispatch) {

	if (values.type === 'guest') {
		dispatch(
			refundGuest(
				values.reservationId,
				values.receiverEmail,
				values.receiverId,
				values.payerEmail,
				values.payerId,
				values.amount,
				values.currency,
				values.transactionId
			)
		);
		dispatch(closeReservationModal());
	}
}

export default submit;
