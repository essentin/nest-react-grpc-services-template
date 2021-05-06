import { UserInvitationSettings } from '../../models';

import UserInvitationSettingsCommonType from '../../types/siteadmin/UserInvitationSettings/UserInvitationSettingsCommonType';

const getUserInvitationSettings = {

    type: UserInvitationSettingsCommonType,

    async resolve({ request, response }) {
        try {
            if (request.user && request.user.admin) {
                const result = UserInvitationSettings.findOne({ attributes: ['id', 'maxInvites'] });
                return await {
                    status: result ? 200 : 500,
                    result,
                    errorMessage: result ? null : 'Results not found.'
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
    },
};

export default getUserInvitationSettings;

/**
query {
  getUserInvitationSettings {
    status
    result {
      id
      maxInvites
    }
    errorMessage
  }
}
**/