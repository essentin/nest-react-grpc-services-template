import { gql } from 'react-apollo';
import {
    ADD_CARD_START,
    ADD_CARD_SUCCESS,
    ADD_CARD_ERROR,
} from '../../constants';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import getCardDetails from './getCardDetails.graphql'
import { closeCardModal, closeHomeAddCardModal, closeViewListAddCardModal } from '../modalActions'
import { toastr } from 'react-redux-toastr';
import { loadAccount } from '../account';
import { getDefaultCardDetails } from './getDefaultCardDetails';

export function addCard(
    paymentMethodId,
    last4Digits,
    isDefaultCard,
    cardUserName,
    cardType,
    expiryDate,
    page
) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: ADD_CARD_START
        });

        dispatch(setLoaderStart('cardAdd'));

        try {

            let mutation = gql`
                mutation addCard(
                    $paymentMethodId: String,
                    $last4Digits: Int,
                    $isDefaultCard: Boolean,
                    $cardUserName: String,
                    $cardType: String,
                    $expiryDate: String,
                ){
                    addCard(
                        paymentMethodId: $paymentMethodId,
                        last4Digits: $last4Digits,
                        isDefaultCard: $isDefaultCard,
                        cardUserName: $cardUserName,
                        cardType: $cardType,
                        expiryDate: $expiryDate,
                    ) {
                        id
                        paymentMethodId
                        userId
                        customerId
                        last4Digits
                        cardUserName
                        cardType
                        expiryDate
                        default
                        status
                        errorMessage
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    paymentMethodId,
                    last4Digits,
                    isDefaultCard,
                    cardUserName,
                    cardType,
                    expiryDate,
                },
                fetchPolicy: 'network-only',
                refetchQueries: [{ query: getCardDetails }]
            });

            if (data && data.addCard && data.addCard.status == '200') {
                dispatch({
                    type: ADD_CARD_SUCCESS,
                });

                await dispatch(loadAccount());
                await dispatch(getDefaultCardDetails())
                await dispatch(closeHomeAddCardModal())
                await dispatch(closeViewListAddCardModal())

            } else {
                toastr.error("Oops!", data && data.addCard && data.addCard.errorMessage);
            }

            dispatch(closeCardModal())
            dispatch(setLoaderComplete('cardAdd'));

        } catch (err) {
            dispatch(closeCardModal())
            dispatch(setLoaderComplete('cardAdd'));
            dispatch({
                type: ADD_CARD_ERROR,
            });
        }

    };
}
