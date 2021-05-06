import React from 'react';
import Register from './Register';
import NotFound from '../notFound/NotFound';
import SignUpLayout from '../../components/Layout/SignUpLayout';
import fetch from '../../core/fetch'
import { renderNotFound } from '../../helpers/userTypeHelper';

const title = 'New User Registration';

export default {

  path: '/register/:step?',

  async action({ store, query, params }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated,
      account = store.getState().account && store.getState().account.data,
      email = query.email, error_message = query.error_message,
      inviteStatus, validRequest = true, step = params.step || 'step-one', stepNumber,
      inviteCode = query.inviteCode;

    if (step === 'step-one' && (isAuthenticated || !email)) validRequest = false;
    if (step === 'step-two' && (!isAuthenticated || !account || account.stepTwo)) validRequest = false;
    if (step === 'step-three' && (!isAuthenticated || !account || account.stepThree)) validRequest = false;
    if (step !== 'step-one' && step !== 'step-two' && step !== 'step-three') validRequest = false;

    if (validRequest) {

      if (step === 'step-one') {

        const query = `query ValidateInvite($inviteCode: String, $email: String){
          checkInvite(inviteCode: $inviteCode, email: $email) {
            status,
            errorMessage
          }
        }`;

        const response = await fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            variables: {
              email,
              inviteCode
            }
          }),
          credentials: 'include',
        });

        const { data } = await response.json();
        inviteStatus = data && data.checkInvite && data.checkInvite.status;
      }
      if (step === 'step-one') stepNumber = 1;
      if (step === 'step-two') stepNumber = 2;
      if (step === 'step-three') stepNumber = 3;

      if ((inviteStatus === 200 || step !== 'step-one') && stepNumber) {
        return {
          title,
          component: <SignUpLayout><Register title={title} error_message={error_message} initialValues={{ email, inviteEmail: email, inviteCode }} step={stepNumber} /></SignUpLayout>,
        };
      }
    }
    if (isAuthenticated && account && (!account.stepTwo || !account.stepThree)) {
      return {
        title,
        component: <SignUpLayout><NotFound title={title} /></SignUpLayout>,
        status: 404,
      };
    } else {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404,
      };
    }

  },

};