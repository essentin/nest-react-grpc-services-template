//Models
import { UserInvitation } from '../../models';

//Types
import UserInvitationCommonType from '../../types/UserInvitation/UserInvitationCommonType';

const getAllUserInvitation = {
    type: UserInvitationCommonType,

    async resolve({ request, response }, { }) {
        try {
            let userFilter = { userId: request.user.id }, statusFilter = { status: { $ne: 'cancelled' } };

            if (!request.user || request.user.admin) {
                return {
                    status: 401,
                    errorMessage: 'Please login with your account and continue.'
                };
            }

            const count = await UserInvitation.count({
                where: {
                    $and: [
                        userFilter,
                        statusFilter
                    ]
                }
            });

            const results = await UserInvitation.findAll({
                where: {
                    $and: [
                        userFilter
                    ]
                }
            });

            return await {
                status: !results ? 500 : 200,
                errorMessage: !results ? "Oops! something went wrong. Please try again." : null,
                results,
                count
            };

        } catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            };
        }
    }
};

export default getAllUserInvitation;

/*
    query GetAllUserInvitation {
        getAllUserInvitation {
            status
            errorMessage
            results {
            id
            userId
            email
            status
            inviteCode
            invitedAt
            registeredAt
            cancelledAt
            registeredEmail
            }
            count
        }
    }
*/