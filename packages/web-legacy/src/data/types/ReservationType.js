import {
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

// Models
import {
  Cancellation,
  CancellationDetails,
  Listing,
  ListSettings,
  ReservationBlockedDates,
  Transaction,
  User,
  UserProfile,
} from '../models';

// Type
import ShowListingType from './ShowListingType';
import ProfileType from './ProfileType';
import TransactionType from './TransactionType';
import CancellationDetailsType from './CancellationDetailsType';
import UserType from './UserType';
import CancellationType from './CancellationType';
import ReservationBlockedDatesType from './ReservationBlockedDatesType';
import ListSettingsActivity from './ListSettingsActivity';


const ReservationType = new ObjectType({
    name: 'Reservation',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        listData: {
            type: ShowListingType,
            resolve(reservation) {
                return Listing.findOne({
                    where: { id: reservation.listId }
                })
            }
        },
        hostId: {
            type: StringType
        },
        hostData: {
            type: ProfileType,
            resolve(reservation) {
                return UserProfile.findOne({
                    where: { userId: reservation.hostId }
                });
            }
        },
        guestId: {
            type: StringType
        },
        guestData: {
            type: ProfileType,
            resolve(reservation) {
                return UserProfile.findOne({
                    where: { userId: reservation.guestId }
                })
            }
        },
        transaction: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'booking' }
                })
            }
        },
        refundStatus: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'cancellation' }
                })
            }
        },
        guestUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.guestId }
                })
            }
        },
        hostUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.hostId }
                })
            }
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        cleaningPrice: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        cancellationDetails: {
            type: CancellationDetailsType,
            resolve(reservation) {
                return CancellationDetails.findOne({
                    where: {
                        reservationId: reservation.id
                    }
                });
            }
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        count: {
            type: IntType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        cancellationPolicy: {
            type: IntType
        },
        cancellation: {
            type: CancellationType,
            resolve(reservation) {
                return Cancellation.findOne({
                    where: {
                        id: reservation.cancellationPolicy,
                        isEnable: true
                    }
                });
            }
        },

        dayDifference: {
            type: FloatType
        },

        startTime: {
            type: FloatType
        },

        endTime: {
            type: FloatType
        },

        totalHours: {
            type: FloatType
        },

        minHour: {
            type: FloatType
        },

        discountPercentage: {
            type: FloatType
        },

        activityId: {
            type: IntType
        },

        activityType: {
            type: IntType
        },

        listTitle: {
            type: StringType
        },

        reservationBlockedDates: {
            type: new List(ReservationBlockedDatesType),
            async resolve(reservation) {
                return await ReservationBlockedDates.findAll({
                    where: {
                        reservationId: reservation.id,
                    }
                });
            }
        }
    }
});

export default ReservationType;