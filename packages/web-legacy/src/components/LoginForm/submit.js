
// Redux Form
import { SubmissionError } from 'redux-form';

// Locale
import messages from '../../locale/messages';

// Redirection
import history from '../../core/history';

// Fetch request
import fetch from '../../core/fetch';

// Redux
import { setRuntimeVariable } from '../../actions/runtime';
import { loadAccount } from '../../actions/account';
import { closeLoginModal } from '../../actions/modalActions';

async function submit(values, dispatch) {
  const query = `query (
    $email: String!,
    $password: String!,
  ) {
      userLogin (
        email: $email,
        password: $password,
        userType: 1
      ) {
        status
      }
    }`;

  const params = {
    email: values.email,
    password: values.password,
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: params,
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.userLogin.status == 'success') {
    dispatch(closeLoginModal());
    let loginScreen = false;
    let refer = values.refer;
      loginScreen = true;
      refer = values.refer ? values.refer : '/';
    
    await dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: true,
    }));
    
    await dispatch(loadAccount(loginScreen, refer));

  } else if (data.userLogin.status == 'email') {
    throw new SubmissionError({ _error: messages.emailNotExists });
  } else if (data.userLogin.status == 'password') {
    throw new SubmissionError({ _error: messages.passwordWrong });
  } else if (data.userLogin.status == 'loggedIn') {
    dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: true,
    }));
    throw new SubmissionError({ _error: messages.loggedIn });
  } else if (data.userLogin.status == 'adminLoggedIn') {
    throw new SubmissionError({ _error: messages.adminLoggedIn });
  } else if (data.userLogin.status == 'userbanned') {
    dispatch(closeLoginModal());
    history.push('/userbanned');
  } else if (data.userLogin.status == 'userDeleted') {
    throw new SubmissionError({ _error: messages.emailNotExists });
  } else if (data.userLogin.status == 'invalidAccountType') {
    throw new SubmissionError({ _error: messages.invalidAccountType });
  } else {
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }
}

export default submit;