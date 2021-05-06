import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';
import stripePackage from 'stripe';
import { CardDetails } from '../../models';
import CardTypes from '../../types/CardTypes';
import { payment } from '../../../config';
import { getCustomerId } from '../../../core/payment/stripe/helpers/getCustomerId';
import { updateUserProfile } from '../../../core/payment/stripe/helpers/updateUserProfile';
import { checkUserType } from '../../../helpers/checkUserType';

const stripe = stripePackage(payment.stripe.secretKey, {
    apiVersion: '2019-12-03'
});

const addCard = {

    type: CardTypes,

    args: {
        paymentMethodId: { type: StringType },
        last4Digits: { type: IntType },
        isDefaultCard: { type: BooleanType },
        cardUserName: { type: StringType },
        cardType: { type: StringType },
        expiryDate: { type: StringType },
    },

    async resolve({ request, response }, {
        paymentMethodId,
        last4Digits,
        isDefaultCard,
        cardUserName,
        cardType,
        expiryDate,
    }) {

        try {
            if (request.user && !request.user.admin) {
                let isGuest = await checkUserType(request.user.id, 1);
                if (!isGuest) return { status: "failed" };

                const userId = request.user.id;
                const email = request.user.email;
                let defaultvalue = false;

                let customerId = await getCustomerId(userId), createCustomer;

                if (!customerId) {
                    createCustomer = await stripe.customers.create(
                        { email, payment_method: paymentMethodId }
                    );

                    if ('id' in createCustomer) {
                        customerId = createCustomer.id;
                        await updateUserProfile(
                            userId,
                            customerId
                        );
                    }
                }


                const attachPaymentMethod = await stripe.paymentMethods.attach(
                    paymentMethodId,
                    {
                        customer: customerId,
                    }
                );


                let count = await CardDetails.count({
                    where: {
                        userId,
                        default: true
                    }
                });

                if (count <= 0) {
                    defaultvalue = true;
                }

                if (isDefaultCard) {
                    await CardDetails.update({
                        default: false
                    }, {
                        where: { userId }
                    });
                }

                const addNewCard = await CardDetails.create({
                    userId,
                    customerId,
                    paymentMethodId,
                    last4Digits,
                    default: isDefaultCard ? isDefaultCard : defaultvalue,
                    cardUserName,
                    cardType,
                    expiryDate,
                })

                if (addNewCard) {
                    return {
                        status: 200
                    }
                } else {
                    return {
                        status: 400,
                        errorMessage: 'Error while creating record.'
                    }
                }

            } else {
                return {
                    status: 400,
                    errorMessage: 'Please authenticate user.'
                };
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                errorMessage: err
            };
        }


    },
};

export default addCard;

/**
mutation addCard(
    $paymentMethodId: String,
){
    addCard(
        paymentMethodId: $paymentMethodId,
    ) {
        id
        paymentMethodId
        userId
        customerId
        default
        status
        errorMessage
    }
}
  **/
