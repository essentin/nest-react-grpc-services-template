import { gql } from 'react-apollo';
import {
    GET_DEFAULT_CARD_START,
    GET_DEFAULT_CARD_SUCCESS,
    GET_DEFAULT_CARD_ERROR,
} from '../../constants';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';

import { toastr } from 'react-redux-toastr';

export function getDefaultCardDetails() {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: GET_DEFAULT_CARD_START,
        });

        dispatch(setLoaderStart('getDefaultCard'));

        try {

            let query = gql`
            query getDefaultCardDetails {
                getDefaultCardDetails {
                  id
                  userId
                  customerId
                  paymentMethodId
                  last4Digits
                  default
                  isVerified
                  cardUserName
                  cardType
                  expiryDate
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.query({
                query,
                fetchPolicy: 'network-only',
            });

            if (data && data.getDefaultCardDetails && data.getDefaultCardDetails) {
                const defaultCardDetails = { ...data.getDefaultCardDetails };

                await dispatch({
                    type: GET_DEFAULT_CARD_SUCCESS,
                    defaultCardDetails
                });
            }

            await dispatch(setLoaderComplete('getDefaultCard'));

        } catch (err) {

            dispatch({
                type: GET_DEFAULT_CARD_ERROR
            });

            dispatch(setLoaderComplete('getDefaultCard'));
        }

    };
}