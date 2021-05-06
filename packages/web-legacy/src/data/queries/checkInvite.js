import {
    GraphQLString as StringType,
} from 'graphql';

import { UserInvitation, Invites } from '../models';

import CommonResponseType from '../types/siteadmin/CommonResponseType';

const checkInvite = {

    type: CommonResponseType,

    args: {
        inviteCode: { type: StringType },
        email: { type: StringType }
    },

    async resolve({ request, response }, { inviteCode, email }) {
        try {
            let where = {}, result, attributes = ['id'];
            if (inviteCode && email) {
                where = {
                    status: 'invited',
                    inviteCode,
                    email
                }

                result = await UserInvitation.findOne({
                    attributes,
                    where
                });

            } else if (email) {
                where = {
                    inviteStatus: 'invited',
                    email
                }

                result = await Invites.findOne({
                    attributes,
                    where
                });
            }

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

export default checkInvite;

/*
query ValidateInvite($inviteCode: String, $email: String){
  checkInvite(inviteCode: $inviteCode, email: $email) {
    status,
    errorMessage
  }
}
*/