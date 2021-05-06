import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import { UserProfile, UserInvitation } from '../../models';

import CommonResponseType from '../../types/siteadmin/CommonResponseType';


const updateUserMaxInvites = {

    type: CommonResponseType,

    args: {
        profileId: { type: new NonNull(IntType) },
        maxInviteCount: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { maxInviteCount, profileId }) {
        // Check if user already logged in
        try {
            if (request.user && request.user.admin) {

                const user = await UserProfile.findOne({
                    attributes: ['userId'],
                    where: { profileId },
                    raw: true
                });

                if (!user || !user.userId) {
                    return {
                        status: 500,
                        errorMessage: 'Invalid Profile Id'
                    };
                }

                const usedInvitesCount = await UserInvitation.count({
                    where: {
                        $and: [
                            { userId: user.userId },
                            { status: { $ne: 'cancelled' } }
                        ]
                    }
                });

                let remainingCount = maxInviteCount - usedInvitesCount;

                if (remainingCount < 0) {
                    return {
                        status: 500,
                        errorMessage: 'The provided count is less than the used limit'
                    };
                }

                const result = UserProfile.update({
                    maxInviteCount
                },
                    {
                        where: {
                            profileId
                        }
                    });

                return await {
                    status: result ? 200 : 500,
                    errorMessage: result ? null : "Something went wrong, Maximum invites not updated"
                }
            } else {
                return {
                    status: 401,
                    errorMessage: `Oops! Please login and continue.`
                }
            }
        } catch (e) {
            return {
                status: 500,
                errorMessage: `Something went wrong, ${e.message}`
            }
        }
    }
};

export default updateUserMaxInvites;

/**
mutation updateUserMaxInvites($profileId: Int!, $maxInviteCount: Int!) {
  updateUserMaxInvites(profileId: $profileId, maxInviteCount: $maxInviteCount) {
    status
    errorMessage
  }
}
**/