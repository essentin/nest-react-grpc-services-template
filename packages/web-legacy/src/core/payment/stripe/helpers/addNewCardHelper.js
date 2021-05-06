import { CardDetails } from '../../../../data/models';

export async function addNewCardHelper(userId, customerId, paymentMethodId, last4Digits) {

    let findCard = await CardDetails.findOne({
        where: {
            userId,
        }
    });

    if (findCard) {
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
        default: true,
    })

    if (addNewCard) {
        return {
            status: 200
        }
    } else {
        return {
            status: 400
        }
    }
}

export const checkForNewPaymentMethod = async (customerId, paymentMethodId, ) => {

    const doesPaymentMethodExists = await CardDetails.findOne({
        where: { customerId, paymentMethodId },
        raw: true
    })

    if (doesPaymentMethodExists) {
        return { status: 200 }
    } else {
        return { status: 400 }
    }

}