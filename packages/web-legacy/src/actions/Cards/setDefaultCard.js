import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
    SET_DEFAULT_CARD_START,
    SET_DEFAULT_CARD_SUCCESS,
    SET_DEFAULT_CARD_ERROR,
} from '../../constants';

import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import { getDefaultCardDetails } from '../Cards/getDefaultCardDetails';
import getCardDetails from './getCardDetails.graphql'

export function setDefaultCard(id) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: SET_DEFAULT_CARD_START,
        });

        dispatch(setLoaderStart('cardDefault'));

        try {

            let mutation = gql`
                mutation setDefaultCard(
                    $id: Int, 
                ){
                    setDefaultCard(
                        id: $id
                    ) {
                        status
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
                refetchQueries: [{ query: getCardDetails }]
            });

            if (data && data.setDefaultCard && data.setDefaultCard.status == '200') {
                await dispatch({
                    type: SET_DEFAULT_CARD_SUCCESS
                });
                await dispatch(getDefaultCardDetails())
            } else {
                toastr.error("Oops!", data && data.setDefaultCard && data.setDefaultCard.errorMessage);
            }

            await dispatch(setLoaderComplete('cardDefault'));

        } catch (error) {

            dispatch({
                type: SET_DEFAULT_CARD_ERROR
            });

            dispatch(setLoaderComplete('cardDefault'));
        }

    };
}