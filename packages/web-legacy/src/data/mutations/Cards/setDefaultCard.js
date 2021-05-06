import {
    GraphQLInt as IntType,
} from 'graphql';

import CardTypes from '../../types/CardTypes';

import { CardDetails } from '../../models';

import { checkUserType } from '../../../helpers/checkUserType';

const setDefaultCard = {

    type: CardTypes,

    args: {
        id: { type: IntType },
    },

    async resolve({ request, response }, { id }) {

        try {
            if (request.user && !request.user.admin) {
                let isGuest = await checkUserType(request.user.id, 1);
                if (!isGuest) return { status: "failed" };

                const userId = request.user.id;

                const cardDetails = await CardDetails.findOne({
                    where: { id, userId },
                    raw: true
                })

                if (cardDetails) {
                    await CardDetails.update({
                        default: false
                    }, {
                        where: { userId }
                    });

                    const cardUpdated = await CardDetails.update({
                        default: true
                    }, {
                        where: { id, userId }
                    });

                    if (cardUpdated) {
                        return {
                            status: 200
                        }
                    } else {
                        return {
                            status: 400,
                            errorMessage: 'Error in updating record.'
                        }
                    }
                } else {
                    return {
                        status: 400,
                        errorMessage: 'Card details not found.'
                    }
                }

            } else {
                return {
                    status: 400,
                    errorMessage: 'Please authenticate user.'
                };
            }
        } catch (err) {
            return {
                status: 500,
                errorMessage: err
            };
        }

    },
};

export default setDefaultCard;

/**
mutation setDefaultCard(
  $id: Int,
){
    setDefaultCard(
      id: $id
    ) {
        status
    }
}
**/
