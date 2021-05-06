import CardTypes from '../../types/CardTypes';
import { CardDetails } from '../../models';
import stripePackage from 'stripe';
import { payment } from '../../../config';
import { checkUserType } from '../../../helpers/checkUserType';

const stripe = stripePackage(payment.stripe.secretKey, {
    apiVersion: '2019-12-03'
});

import {
    GraphQLList as List,
    GraphQLString as StringType
} from 'graphql';

const getCardDetails = {

    type: new List(CardTypes),

    async resolve({ request }) {
        try {
            if (request.user && !request.user.admin) {
                let isGuest = await checkUserType(request.user.id, 1);
                if (!isGuest) return { status: "failed" };

                const userId = request.user.id;

                const getCards = await CardDetails.findAll({
                    where: {
                        userId
                    },
                    raw: true
                })

                return await getCards;

            } else {
                return {
                    status: 400,
                    errorMessage: 'Please authenticate user.'
                };
            }
        } catch (err) {
            console.log(err)
            return {
                status: 400,
                errorMessage: err
            };
        }

    }
};

export default getCardDetails;

/**

query getCardDetails {
  getCardDetails {
    id
    userId
    customerId
    paymentMethodId
    last4Digits
    default
    isVerified
    status
    errorMessage
  }
}

**/