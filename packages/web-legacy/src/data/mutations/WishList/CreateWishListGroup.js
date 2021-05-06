import WishListGroupType from '../../types/WishListGroupType';
import { WishListGroup } from '../../models';

import {
    GraphQLString as StringType
} from 'graphql';

import { checkUserType } from '../../../helpers/checkUserType';

const CreateWishListGroup = {

    type: WishListGroupType,

    args: {
        name: { type: StringType },
        isPublic: { type: StringType }
    },

    async resolve({ request, response }, { name, isPublic }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            const userId = request.user.id;

            if (!request.user.admin) {
                let isGuest = await checkUserType(request.user.id, 1);
                if (!isGuest) return { status: "failed" };
            }

            const createWishListGroup = await WishListGroup.create({
                userId,
                name,
                isPublic
            });

            return {
                status: "success",
                id: createWishListGroup.id
            };

        } else {
            return {
                status: "Not loggedIn"
            };
        }

    },
};

export default CreateWishListGroup;

/*

mutation CreateWishListGroup(
    $name: String!,
    $isPublic: String,
){
    CreateWishListGroup(
        name: $name,
        isPublic: $isPublic
    ) {
        status
    }
}

*/
