import { reset } from 'redux-form';

import fetch from '../../core/fetch';

import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

  const query = `
    mutation (
        $newPassword: String!
    ) {
        ChangePassword (
            newPassword: $newPassword
        ) {
            status
            errorMessage
        }
    }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });
  dispatch(reset('ChangePasswordForm'))
  const { data } = await resp.json();

  if (data && data.ChangePassword && data.ChangePassword.status) {
    data.ChangePassword.status === 200 && toastr.success('Success!', 'Password updated successfully');
    data.ChangePassword.status === 500 && toastr.error('Error', data.ChangePassword.errorMessage);
  }

}

export default submit;