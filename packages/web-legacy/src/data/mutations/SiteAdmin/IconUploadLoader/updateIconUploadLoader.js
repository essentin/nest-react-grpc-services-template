// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import AdminListSettingsType from '../../../types/siteadmin/AdminListSettingsType';

// Sequelize models
import { ListSettings } from '../../../models';

const UpdateIconUploadLoader = {

    type: AdminListSettingsType,

    args: {
        id: { type: IntType },
        thumbnail: { type: StringType }
    },
    async resolve({ request, response }, {
        id,
        thumbnail
    }) {

        if (request.user && request.user.admin == true) {

            const isUser = await ListSettings.findOne({
                where: {
                    id
                }
            });

            if (isUser.id) {
                const popularValue = await ListSettings.update({
                    thumbnail: thumbnail
                },
                    {
                        where: {
                            id: id
                        }
                    });

                if (popularValue) {
                    return {
                        status: 'success'
                    }
                }
            }

        } else {
            return {
                status: 'failed'
            }
        }
    },
};

export default UpdateIconUploadLoader;

/**
mutation UpdateSuitableOccastion (
    $id: Int,
    $thumbnail: String
) {
    UpdateSuitableOccastion (
        id: $id,
        thumbnail: $thumbnail
    ) {
        status
    }
}
 */

