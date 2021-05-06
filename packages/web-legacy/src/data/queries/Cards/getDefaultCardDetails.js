import CardTypes from '../../types/CardTypes';
import { CardDetails } from '../../models';
import stripePackage from 'stripe';
import { payment } from '../../../config';
import { checkUserType } from '../../../helpers/checkUserType';

const stripe = stripePackage(payment.stripe.secretKey, {
    apiVersion: '2019-12-03'
});

const getDefaultCardDetails = {

    type: CardTypes,

    async resolve({ request }) {
        try {
            if (request.user && !request.user.admin) {
                let isGuest = await checkUserType(request.user.id, 1);
                if (!isGuest) return { status: "failed" };

                const userId = request.user.id;

                const getCard = await CardDetails.findOne({
                    where: {
                        userId,
                        default: true
                    },
                    raw: true
                })

                return await getCard;

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

export default getDefaultCardDetails;

/**

query getDefaultCardDetails {
  getDefaultCardDetails {
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