import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

//Models
import { UserInvitation } from '../../models';

//Types
import UserInvitationCommonType from '../../types/UserInvitation/UserInvitationCommonType';

const cancelUserInvitation = {
    type: UserInvitationCommonType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, { id }) {
        try {
            if (!request.user || request.user.admin) {
                return {
                    status: 401,
                    errorMessage: 'Please login with your account and continue.'
                };
            }

            const result = await UserInvitation.update({
                status: 'cancelled',
                cancelledAt: new Date()
            }, {
                where: {
                    id,
                    userId: request.user.id,
                    status: { $ne: 'joined' }
                }
            });

            return await {
                status: !result ? 500 : 200,
                errorMessage: !result ? "Oops! something went wrong. Please try again." : null
            };

        } catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            };
        }
    }
};

export default cancelUserInvitation;

/*
    mutation CancelUserInvitation($id: Int!) {
        cancelUserInvitation(id: $id) {
            status
            errorMessage
        }
    }
*/