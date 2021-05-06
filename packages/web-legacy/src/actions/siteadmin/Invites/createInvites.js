import { gql } from 'react-apollo';

//redux form 
import { reset } from 'redux-form';

// Toaster
import { toastr } from 'react-redux-toastr';
import {
    CREATE_INVITES_START,
    CREATE_INVITES_SUCCESS,
    CREATE_INVITES_ERROR
} from '../../../constants';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

const CREATE_INVITE = gql`mutation CreateInvite($email: String!, $firstName: String!) {
    createInvites(email: $email, firstName: $firstName) {
      errorMessage
      status
    }
  }`;


export function createInvites({ email, firstName }) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: CREATE_INVITES_START,
            payload: {
                loading: true
            }
        });

        try {

            const { data: { createInvites: { status, errorMessage } } } = await client.mutate({
                mutation: CREATE_INVITE,
                variables: {
                    firstName,
                    email
                },
            });
            if (status === 200) {
                dispatch({
                    type: CREATE_INVITES_SUCCESS,
                    payload: {
                        loading: false,
                        error: false
                    }
                });
                let content = {
                    firstName,
                    email
                }
                await sendEmail(
                    email,
                    'sendInvite',
                    content,
                );
                dispatch(reset('Invites'));
                toastr.success("Hurray!", "The invite has been sent successfully.");
            } else if (status == 500) {
                dispatch({
                    type: CREATE_INVITES_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                    }
                });
                toastr.error("Uh-oh!", errorMessage);

            }

        } catch (error) {
            dispatch({
                type: CREATE_INVITES_ERROR,
                payload: {
                    loading: false,
                    error: true,
                }
            });
            toastr.error("Uh-oh!", "There was an error sending the invite. Please try again.");
            return false;
        }

        return true;
    };
}
