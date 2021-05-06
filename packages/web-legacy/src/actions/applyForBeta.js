import { gql } from 'react-apollo';
import { reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import { closeApplyForBetaModal } from './modalActions';;

export function applyForBeta(values) {

    return async (dispatch, getState, { client }) => {

        dispatch(closeApplyForBetaModal());

        try {

            let mutation = gql`mutation CreateBetaMembers($firstName: String!, $lastName: String!, $email: String!) {
                CreateBetaMembers(firstName: $firstName, lastName: $lastName, email: $email) {
                  status
                  errorMessage
                }
              }              
            `;
            dispatch(reset('ApplyForBetaForm'));
            // Send Message
            const { data } = await client.mutate({
                mutation,
                variables: values,
            });
            if (data && data.CreateBetaMembers && data.CreateBetaMembers.status) {
                data.CreateBetaMembers.status === 200 && toastr.success('Thank you for your interest in Flowpass!', 'We will review your membership information and get back to you soon.');
                data.CreateBetaMembers.status === 500 && toastr.error('Oops', data.CreateBetaMembers.errorMessage);
            }
            return true;
        } catch (error) {
            toastr.error('Error', 'Something went wrong' + error);
            return false;
        }
    };
}