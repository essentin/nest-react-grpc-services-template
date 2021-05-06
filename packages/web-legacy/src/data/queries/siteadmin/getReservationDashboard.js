import ReservationDashboardType from '../../types/siteadmin/ReservationDashboardType';
import { Reservation } from '../../../data/models';

const getReservationDashboard = {

    type: ReservationDashboardType,

    async resolve({ request }) {

        const paymentState = [
            { paymentState: 'requires_capture' },
            { paymentState: 'completed' },
        ]

        const totalCount = await Reservation.count({
            where: {
                $or: paymentState
            },
        });

        const todayCount = await Reservation.count({
            where: {
                createdAt: {
                    $lt: new Date(),
                    $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                },
                $or: paymentState
            },
        });

        const monthCount = await Reservation.count({
            where: {
                createdAt: {
                    $lt: new Date(),
                    $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                },
                $or: paymentState
            },
        });

        return {
            totalCount,
            todayCount,
            monthCount
        };

    },
};

export default getReservationDashboard;
