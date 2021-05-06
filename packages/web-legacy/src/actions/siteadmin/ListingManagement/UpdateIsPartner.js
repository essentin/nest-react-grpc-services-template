import { toastr } from 'react-redux-toastr';
import { gql } from 'react-apollo';

import getAllListingsQuery from './getAllListing.graphql';

export function updateIsPartner({ id, isPartner, currentPage, searchList, userId }) {

    return async (dispatch, getState, { client }) => {

        try {

            let mutation = gql`mutation updateIsPartner($id: Int!, $isPartner: Boolean!, $userId: String!) {
                updatePartner(id: $id, isPartner: $isPartner, userId: $userId) {
                  status
                  errorMessage
                }
              }              
          `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isPartner, userId },
                refetchQueries: [{ query: getAllListingsQuery, variables: { currentPage, searchList } }]
            });

            if (data && data.updatePartner && data.updatePartner.status) {
                data.updatePartner.status === 200 && toastr.success('Success!', 'Partner status updated successfully.');
                data.updatePartner.status !== 200 && toastr.error('Oops', data.updatePartner.errorMessage);
            }
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    };
}