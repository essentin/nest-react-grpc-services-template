import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import { loadAccount } from '../../actions/account';

let query = gql`
    query GetAllUserInvitation {
        getAllUserInvitation {
        status
        errorMessage
        results {
            id
            userId
            email
            status
            inviteCode
            invitedAt
            registeredAt
            cancelledAt
            registeredEmail
        }
        count
        }
    }
  `;

function cancelUserInvitation(variables) {

    return async (dispatch, getState, { client }) => {

        try {
            const mutation = gql`
                    mutation CancelUserInvitation($id: Int!) {
                        cancelUserInvitation(id: $id) {
                            status
                            errorMessage
                        }
                    }
                  `;
            const { data } = await client.mutate({
                mutation,
                variables,
                refetchQueries: [{ query }]
            });

            if (data && data.cancelUserInvitation && data.cancelUserInvitation.status == 200) {
                await dispatch(loadAccount());
                toastr.success('Success', 'Your invite is cancelled successfully.');
            } else if (data && data.cancelUserInvitation && data.cancelUserInvitation.errorMessage) {
                toastr.error('Error', data.cancelUserInvitation.errorMessage);
            } else {
                toastr.error('Error', "Oops! something went wrong. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toastr.error('Error', "Oops! something went wrong. Please try again.");
        }
    }
}

export default cancelUserInvitation;