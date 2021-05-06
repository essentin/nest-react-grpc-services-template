import React from 'react';
import PasswordVerification from './PasswordVerification';
import { renderComponent, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'Forgot Password';

export default {

  path: '/password/verification',

  action({ store, query }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let email, token;
    if (isAuthenticated) {
      return { redirect: '/' };
    }

    if ('token' in query && 'email' in query) {
      email = query.email;
      token = query.token
    } else {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404,
      };
    }

    return {
      title,
      component: renderComponent(store.getState().account, <PasswordVerification email={email} token={token} title={title} />)
    };
  },

};
