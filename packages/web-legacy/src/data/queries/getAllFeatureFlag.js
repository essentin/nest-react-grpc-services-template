import { getFeatureFlag } from '../../core/optimizely/optimizely';

import { User } from '../models';

import FeatureFlagType from '../types/FeatureFlagType';

const getAllFeatureFlag = {

    type: FeatureFlagType,

    async resolve({ request }) {
        try {
            let user;

            if (request.user && request.user.id) {
                user = await User.findOne({
                    attributes: ['email'],
                    where: {
                        userDeletedAt: null,
                        id: request.user.id
                    }
                });
            }

            let featureFlag = await getFeatureFlag(request.user && request.user.id, user && user.email);
            if (!featureFlag) featureFlag = {};
            return {
                status: 200,
                result: {
                    ...featureFlag
                }
            }
        } catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            }
        }
    },
};

export default getAllFeatureFlag;