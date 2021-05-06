import { gql } from 'react-apollo';
import { reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';


import { closeWorkplaceSuggestModal } from './modalActions';;

export function suggestWrokplace(values) {

  return async (dispatch, getState, { client }) => {

    dispatch(closeWorkplaceSuggestModal());

    try {

      let mutation = gql`mutation CreateSuggestWorkplace($placeName: String!, $userId: String, $userName: String, $city: String) {
        CreateSuggestedWorkplace(placeName: $placeName, userId: $userId, userName: $userName, city: $city) {
          status
          errorMessage
        }
      }
      `;
        dispatch(reset('WorkplaceSuggestForm'));
      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          placeName: values.workplaceName,
          userId: getState().account.data && getState().account.data.userId,
          userName: getState().account.data && getState().account.data.firstName,
          city: values.city
        },
      });
      if (data && data.CreateSuggestedWorkplace && data.CreateSuggestedWorkplace.status) {
        data.CreateSuggestedWorkplace.status === 200 && toastr.success('Thank you!', 'We received your message and we will contact you as soon as possible.');
        data.CreateSuggestedWorkplace.status === 500 && toastr.error('Error', data.CreateSuggestedWorkplace.errorMessage);
      }
      return true;
    } catch (error) {
      toastr.error('Error', 'Workplace suggested Failed' + error);
      return false;
    }
  };
}