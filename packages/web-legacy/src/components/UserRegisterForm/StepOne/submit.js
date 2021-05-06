import { SubmissionError } from 'redux-form';
import fetch from '../../../core/fetch';

import { sendEmail } from '../../../core/email/sendEmail';

import { setRuntimeVariable } from '../../../actions/runtime';
import { loadAccount } from '../../../actions/account';

import history from '../../../core/history';

import messages from '../../../locale/messages';

async function submit(values, dispatch) {

  const query = `mutation createAccount(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $acceptTerms: Boolean!,
    $password: String!,
    $inviteEmail: String!,
    $inviteCode: String
  ){
    createUser(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      acceptTerms: $acceptTerms, 
      password: $password,
      inviteEmail: $inviteEmail,
      inviteCode: $inviteCode
  ) {
      status
      errorMessage
      result {
        emailToken
      }
    }
  }`;


  const params = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    acceptTerms: values.acceptTerms,
    inviteEmail: values.inviteEmail,
    inviteCode: values.inviteCode
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
  
  if (!(data && data.createUser)) {
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  } else if (data && data.createUser && data.createUser.status === 200) {
    await dispatch(loadAccount());
    await dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: true,
    }));
    // Send Email
    let content = {
      token: data.createUser.result && data.createUser.result.emailToken,
      name: values.firstName,
      email: values.email
    };
    await sendEmail(values.email, 'welcomeEmail', content);
    await history.push('/register/step-two')
  } else {
    // if (data.createUser.errorMessage == "Logged in") {
    //   throw new SubmissionError({ _error: messages.loggedIn });
    // } else if (data.createUser.errorMessage) {
      throw new SubmissionError({ _error: data.createUser.errorMessage });
    // }
  }

}

export default submit;