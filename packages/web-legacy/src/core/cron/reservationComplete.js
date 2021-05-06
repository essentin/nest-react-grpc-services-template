var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { Reservation } from '../../data/models';

const reservationComplete = app => {

	// new CronJob('0 * * * * *', async function () {
		new CronJob('0 45 23 * * *', async function () {
			console.log('holy moly completed reservation');


		const getTodayReservations = await sequelize.query(
			`SELECT id, reservationState, hostId, checkIn, checkOut, guests, paymentState, DATE_FORMAT(checkout,'%Y-%m-%d') AS formatCheckout FROM Reservation having Date(formatCheckout) <= CURDATE() AND reservationState = 'approved' AND paymentState = 'completed';`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		// Update Reservation Status to completed
		console.log('getTodayReservations', getTodayReservations)
		if (getTodayReservations != null && getTodayReservations.length > 0) {
			getTodayReservations.map(async (item) => {

				// Update Reservation Status
				let updateReservation = await Reservation.update({
					reservationState: 'completed'
				}, {
					where: {
						id: item.id
					}
				});

			})
		}

	}, null, true, 'America/Los_Angeles');

};

export default reservationComplete;