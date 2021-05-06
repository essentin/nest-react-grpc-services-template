import { GraphQLInt as IntType } from 'graphql';

import { UserInvitationSettings } from '../../../models';

import UserInvitationSettingsCommonType from '../../../types/siteadmin/UserInvitationSettings/UserInvitationSettingsCommonType';


const updateUserInvitationSettings = {

    type: UserInvitationSettingsCommonType,

    args: {
        maxInvites: { type: IntType },
    },

    async resolve({ request }, { maxInvites }) {
        // Check if user already logged in
        try {
            if (request.user && request.user.admin) {
                let result;
                const settings = await UserInvitationSettings.findOne({ where: { id: 1 } })
                if (settings) {
                    result = UserInvitationSettings.update({
                        maxInvites
                    },
                        {
                            where: {
                                id: 1
                            }
                        });
                } else {
                    result = UserInvitationSettings.create({ maxInvites });
                }

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

export default updateUserInvitationSettings;

/**
mutation updateUserInvitationSettings($maxInvites: Int){
        updateUserInvitationSettings(maxInvites:$maxInvites) {
    status
    errorMessage
  }
}
**/