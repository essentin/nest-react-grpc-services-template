import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import { BetaMembers, User } from '../models';

import CommonResponseType from '../types/siteadmin/CommonResponseType';

import { sendEmailFromServer } from '../../core/email/sendEmailFromServer';

import { adminEmail } from  '../../config';

const CreateBetaMembers = {

    type: CommonResponseType,

    args: {
        firstName: { type: new NonNull(StringType) },
        lastName: { type: new NonNull(StringType) },
        email: { type: new NonNull(StringType) }
    },

    async resolve({ request, response }, {
        firstName,
        lastName,
        email
    }) {
        try {

            //check if the user already exists
            const isInviteUserExists = await User.count({
                where: {
                    email,
                    userDeletedAt: null
                }
            });

            if (isInviteUserExists > 0) {
                return {
                    status: 500,
                    errorMessage: 'This user is already a member of the Flowpass community!'
                };
            }
            
            const suggested = await BetaMembers.create({
                firstName,
                lastName,
                email
            });

            await sendEmailFromServer(adminEmail, 'applyForBeta',
                {
                    firstName,
                    lastName,
                    email
                }
            );

            return {
                status: suggested ? 200 : 500,
                errorMessage: suggested ? null : "Something went wrong. Please try again."
            }

        } catch (error) {
            return {
                status: 500,
                errorMessage: "Something went wrong. Please try again. " + error
            };
        }
    },
};

export default CreateBetaMembers;