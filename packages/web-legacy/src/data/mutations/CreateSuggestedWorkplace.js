import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import { SuggestedWorkplace } from '../models';

import CommonResponseType from '../types/siteadmin/CommonResponseType';

import { sendEmailFromServer } from '../../core/email/sendEmailFromServer';

import { adminEmail } from  '../../config';

const CreateSuggestedWorkplace = {

    type: CommonResponseType,

    args: {
        userId: { type: StringType },
        placeName: { type: new NonNull(StringType) },
        userName: { type: StringType },
        city: { type: StringType }
    },

    async resolve({ request, response }, {
        userId,
        placeName,
        userName,
        city
    }) {
        try {
            const suggested = await SuggestedWorkplace.create({
                userId,
                placeName,
                city
            });

            await sendEmailFromServer(adminEmail, 'suggestWorkplace',
                {
                    workplaceName: placeName,
                    userName,
                    city
                }
            );

            return {
                status: suggested ? 200 : 500,
                errorMessage: suggested ? null : "Oops! something went wrong. Please try again."
            }

        } catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            };
        }
    },
};

export default CreateSuggestedWorkplace;