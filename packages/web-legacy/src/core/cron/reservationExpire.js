var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { ListBlockedDates, Reservation, SiteSettings } from '../../data/models';
import { emailBroadcast } from './expiredEmail';

const reservationExpire = app => {

	new CronJob('0 45 23 * * *', async function () {
		console.log('holy moly expire reservation');

		let emailLogo;
		let getEmailLogo = await SiteSettings.findOne({
			where: {
				title: 'Email Logo'
			},
			raw: true
		});

		emailLogo = getEmailLogo && getEmailLogo.value;

		// get all reservation id
		// const getReservationIds = await Reservation.findAll({
		// 	attributes: ['id', 'reservationState', [sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'hours_difference']],
		// 	having: {
		// 		'hours_difference': {
		// 			$gt: 24
		// 		},
		// 		reservationState: 'pending',
		// 	}
		// });

		const getTodayReservations = await sequelize.query(`SELECT id, reservationState, hostId, checkIn, checkOut, guests, paymentState, createdAt,  DATE_FORMAT(checkIn,'%Y%m%d') AS formatCheckout, DATE_FORMAT(NOW(),'%Y%m%d') as today , TIMESTAMPDIFF(HOUR, createdAt, NOW()) as hours_difference FROM Reservation having (formatCheckout <= today OR hours_difference > 24) AND reservationState = 'pending';
		`,
			{ type: sequelize.QueryTypes.SELECT }
		);


		// Store them in an array
		if (getTodayReservations != null && getTodayReservations.length > 0) {
			getTodayReservations.map(async (item) => {
				// Update Reservation Status
				let updateReservation = await Reservation.update({
					reservationState: 'expired'
				}, {
					where: {
						id: item.id
					}
				});

				// Unblock blocked dates
				let unblockDates = await ListBlockedDates.destroy({
					where: {
						reservationId: item.id
					}
				});

				await emailBroadcast(item.id, emailLogo);
			})
		}

	}, null, true, 'America/Los_Angeles');

};

export default reservationExpire;