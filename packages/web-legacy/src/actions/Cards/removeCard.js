import { gql } from 'react-apollo';
import {
  REMOVE_CARD_START,
  REMOVE_CARD_SUCCESS,
  REMOVE_CARD_ERROR,
} from '../../constants';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import getCardDetails from './getCardDetails.graphql'
import { toastr } from 'react-redux-toastr';

export function removeCard(id) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: REMOVE_CARD_START,
    });

    dispatch(setLoaderStart('cardRemove'));

    try {

      let mutation = gql`
          mutation removeCard(
            $id: Int!, 
          ){
              removeCard(
                id: $id
              ) {
                  status
                  errorMessage
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

      if (data && data.removeCard && data.removeCard.status == '200') {
        await dispatch({
          type: REMOVE_CARD_SUCCESS
        });

        await dispatch(setLoaderComplete('cardRemove'));

      } else {
        toastr.error("Oops!", data && data.removeCard && data.removeCard.errorMessage);
      }

    } catch (error) {

      dispatch({
        type: REMOVE_CARD_ERROR
      });
    }

  };
}
