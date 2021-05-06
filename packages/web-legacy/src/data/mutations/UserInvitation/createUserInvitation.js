import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { sendEmailFromServer } from '../../../core/email/sendEmailFromServer';
import { adminEmail } from '../../../config'

//Models
import { UserInvitation, UserProfile, User } from '../../models';

//Types
import UserInvitationCommonType from '../../types/UserInvitation/UserInvitationCommonType';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';

const createUserInvitation = {

    type: UserInvitationCommonType,

    args: {
        invitedList: { type: new NonNull(new List(StringType)) }
    },

    async resolve({ request, response }, { invitedList }) {
        try {
            let invitedUser = [];

            if (!request.user || request.user.admin) {
                return {
                    status: 401,
                    errorMessage: 'Please login with your account and continue.'
                };
            }

            if (!invitedList || invitedList.length === 0) {
                return {
                    status: 500,
                    errorMessage: 'Please add at least one email id.'
                };
            }

            invitedList = [...new Set(invitedList)];

            const user = await UserProfile.findOne({
                attributes: ['maxInviteCount', 'inviteCode', 'firstName'],
                where: { userId: request.user.id },
                raw: true
            });

            const invitedCount = await UserInvitation.count({
                where: {
                    userId: request.user.id,
                    status: {
                        $ne: 'cancelled'
                    }
                }
            });

            const remainingInviteCount = (user && user.maxInviteCount || 0) - (invitedCount || 0);
            const userName = user.firstName && capitalizeFirstLetter(user.firstName);

            if (remainingInviteCount <= 0 || remainingInviteCount < invitedList.length) {
                return {
                    status: 500,
                    errorMessage: 'You do not have any invites left, please contact admin if you would like to request additional invites.'
                };
            }

            //check if the already invited
            const isAlreadyInvited = await UserInvitation.count({
                where: {
                    email: { $in: invitedList },
                    userId: request.user.id,
                    status: { $ne: 'cancelled' }
                }
            });

            if (isAlreadyInvited > 0) {
                return {
                    status: 500,
                    errorMessage: 'This user has been already invited.'
                };
            }

            //check if the user already exists
            const isInviteUserExists = await User.count({
                where: {
                    email: { $in: invitedList },
                    userDeletedAt: null
                }
            });

            if (isInviteUserExists > 0) {
                return {
                    status: 500,
                    errorMessage: 'This user is already a member of the Flowpass community!'
                };
            }

            invitedList.map(email => {
                let invite = {
                    userId: request.user.id,
                    email,
                    inviteCode: user.inviteCode,
                    invitedAt: new Date()
                }
                invitedUser.push(invite)
            });

            const result = await UserInvitation.bulkCreate(invitedUser);
            if (result) {
                await Promise.all([
                    await invitedList.map(async (email) => {
                        await sendEmailFromServer(email, 'sendUserInvite',
                            {
                                userName,
                                email,
                                inviteCode: user.inviteCode,
                                subjectValue: { userName }
                            }
                        );
                    })
                ]);

                await sendEmailFromServer(adminEmail, 'invitationDetailsToAdmin',
                    {
                        userName,
                        invitedList
                    }
                );
            }

            return await {
                status: !result ? 500 : 200,
                errorMessage: !result ? "Oops! something went wrong. Please try again." : null
            };
        }
        catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            };
        }
    }
}

export default createUserInvitation;

/*
    mutation CreateUserInvitation($invitedList: [String]!) {
        createUserInvitation(invitedList: $invitedList) {
            status
            errorMessage
        }
    }
*/