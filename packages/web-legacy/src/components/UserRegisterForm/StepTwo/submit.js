import { SubmissionError } from 'redux-form';
import fetch from '../../../core/fetch';
import { toastr } from 'react-redux-toastr';

import history from '../../../core/history';

import messages from '../../../locale/messages';

async function submit(values, dispatch) {

  const query = `mutation UserUpdate(
    $firstName: String!,
    $lastName: String!,
    $zipcode: String!,
    $stepTwo: Boolean,
    $companyName: String
  ){
    userUpdate(
      firstName: $firstName, 
      lastName: $lastName, 
      zipcode: $zipcode,
      stepTwo: $stepTwo,
      companyName: $companyName
  ) {
      status
      errorMessage
    }
  }`;

  const params = {
    firstName: values.firstName,
    lastName: values.lastName,
    zipcode: values.zipcode,
    stepTwo: true,
    companyName: values.companyName
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (!(data && data.userUpdate)) {
    toastr.success('Oops!', 'Something went wrong');
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  } else if (data && data.userUpdate && data.userUpdate.status === 200) {
    history.push('/register/step-three')
  } else if (data && data.userUpdate && data.userUpdate.errorMessage) {
    toastr.success('Oops!', data.userUpdate.errorMessage);
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default submit;