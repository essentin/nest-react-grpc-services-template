import {
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType
} from 'graphql';

import { Listing, UserProfile } from '../../models';

import CommonResponseType from '../../types/siteadmin/CommonResponseType';

const updatePartner = {

    type: CommonResponseType,

    args: {
        id: { type: new NonNull(IntType) },
        isPartner: { type: new NonNull(BooleanType) },
        userId: { type: new NonNull(StringType) }
    },

    async resolve({ request, response }, {
        id,
        isPartner,
        userId
    }) {
        try {
            if (!(request.user && request.user.admin === true)) {
                return {
                    status: 401,
                    errorMessage: 'Please login with your account and continue.'
                };
            }
            if (isPartner) {
                await UserProfile.update({ isPartner }, { where: { userId } })
            } else {
                const userListingCount = await Listing.count({
                    where: {
                        userId,
                        isPartner: true
                    }
                })
                if (userListingCount === 1) await UserProfile.update({ isPartner }, { where: { userId } })
            }

            const result = await Listing.update({ isPartner }, { where: { id } });

            return await {
                status: result ? 200 : 500,
                errorMessage: result ? null : "Oops! something went wrong. Please try again."
            }

        } catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            };
        }
    },
};

export default updatePartner;