import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

//Model
import { User, Listing, Reservation } from '../../models';

//Type
import CommonResponseType from '../../types/siteadmin/CommonResponseType';

const updateUserType = {
    type: CommonResponseType,

    args: {
        id: { type: new NonNull(StringType) },
        userType: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, { id, userType }) {
        try {
            if (request.user && request.user.admin === true) {
                if (userType === 1) { // Convert Host to Guest
                    let publishedListCount = await Listing.count({
                        where: {
                            isPublished: true,
                            userId: id
                        }
                    });

                    if (publishedListCount > 0) {
                        return {
                            status: 500,
                            errorMessage: 'The user type cannot be changed as this user has an active listing. Please un-publish the listing to change the user type.'
                        };
                    }
                }

                if (userType === 2) { // Convert Guest to Host
                    let futureReservationCount = await Reservation.count({
                        where: {
                            guestId: id,
                            $or: [
                                { paymentState: 'requires_capture' },
                                { paymentState: 'completed' },
                            ],
                            $or: [
                                { reservationState: 'approved' },
                                { reservationState: 'pending' }
                            ]
                        }
                    });
                    if (futureReservationCount > 0) {
                        return {
                            status: 500,
                            errorMessage: 'You cannot change the user type as host as you have upcoming booking'
                        };
                    }
                }

                const result = await User.update({ userType }, { where: { id } });
                return await {
                    status: result ? 200 : 500,
                    errorMessage: result ? null : 'Oops! something went wrong. Please try again.'
                };
            } else {
                return {
                    status: 401,
                    errorMessage: 'Please login with your account and continue.'
                };
            }
        }
        catch (error) {
            return {
                status: 500,
                errorMessage: 'Oops! something went wrong. Please try again. ' + error
            };
        }
    }
}

export default updateUserType;

/*
mutation UpdateUserType($id: String!, $userType: Int!) {
  updateUserType(id: $id, userType: $userType) {
    status
    errorMessage
  }
}
*/