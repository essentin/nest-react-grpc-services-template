import {
    GraphQLInt as IntType,
} from 'graphql';
import stripePackage from 'stripe';
import CardTypes from '../../types/CardTypes';
import { payment } from '../../../config';
import { CardDetails } from '../../models';
import { checkUserType } from '../../../helpers/checkUserType';

const stripe = stripePackage(payment.stripe.secretKey, {
    apiVersion: '2019-12-03'
});

const removeCard = {

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
                    const paymentMethod = await stripe.paymentMethods.detach(cardDetails.paymentMethodId);

                    const cardRemove = await CardDetails.destroy({
                        where: { id, userId }
                    });

                    if (cardRemove) {
                        return {
                            status: 200
                        }
                    } else {
                        return {
                            status: 400,
                            errorMessage: 'Error in deleting record.'
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
                errorMessage: err.message
            };
        }

    },
};

export default removeCard;

/**
mutation removeCard(
  $id: Int,
){
    removeCard(
      id: $id
    ) {
        status
    }
}
**/
