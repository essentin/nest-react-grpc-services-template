import CancellationType from '../../types/CancellationType';
import { Cancellation } from '../../models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
const updateCancellation = {
    type: CancellationType,
    args: {
        id: { type: IntType },
        policyName: { type: StringType },
        policyContent: { type: StringType },
        subTitle: { type: StringType },
        subContent: { type: StringType },
        image: { type: StringType }
    },
    async resolve({ request }, {
        id,
        policyName,
        policyContent,
        subTitle,
        subContent,
        image
    }) {

        if (request.user && request.user.admin == true) {

            if (policyName && policyContent && subTitle && subContent) {
                const Update = await Cancellation.update({
                    policyName,
                    policyContent,
                    subTitle,
                    subContent,
                }, {
                    where: {
                        id: id
                    }
                });
            }

            if (image) {
                const Update = await Cancellation.update({
                    image
                }, {
                    where: {
                        id: id
                    }
                });
            } else {
                const Update = await Cancellation.update({
                    image: null
                }, {
                    where: {
                        id: id
                    }
                });
            }

            return {
                status: 'success'
            }
        } else {
            return {
                status: 'failed'
            }
        }
    },
};
export default updateCancellation;
