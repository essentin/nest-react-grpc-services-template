import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
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

function createUserInvitation(variables) {

    return async (dispatch, getState, { client }) => {

        try {
            const mutation = gql`
                mutation CreateUserInvitation($invitedList: [String]!) {
                    createUserInvitation(invitedList: $invitedList) {
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

            if (data && data.createUserInvitation && data.createUserInvitation.status == 200) {
                await dispatch(reset('UserInviteForm'));
                await dispatch(loadAccount());
                toastr.success('Success', 'Your Invite has been sent.');
            } else if (data && data.createUserInvitation && data.createUserInvitation.errorMessage) {
                toastr.error('Error', data.createUserInvitation.errorMessage);
            } else {
                toastr.error('Error', "Oops! something went wrong. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toastr.error('Error', "Oops! something went wrong. Please try again.");
        }
    }
}

export default createUserInvitation;