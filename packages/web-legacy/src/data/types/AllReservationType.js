import {
	GraphQLInt as IntType,
	GraphQLList as List,
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
} from 'graphql';

import ReservationType from './ReservationType';

const AllReservationType = new ObjectType({
	name: 'AllReservation',
	fields: {
		reservationData: {
			type: new List(ReservationType)
		},
		count: {
			type: IntType
		},
		currentPage: {
			type: IntType
		},
		bookingHistoryData: {
			type: new List(ReservationType)
		},
		bookingHistoryCount: {
			type: IntType
		},
		upcomingBookingData: {
			type: new List(ReservationType)
		},
		upcomingBookingcount: {
			type: IntType
		},
		cancelledBookingData: {
			type: new List(ReservationType)
		},
		cancelledBookingCount: {
			type: IntType
		},
		status: {
			type: StringType
		}
	}
});

export default AllReservationType;