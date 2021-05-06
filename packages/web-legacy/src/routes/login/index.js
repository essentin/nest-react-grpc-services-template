import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Log In';

export default {

  path: '/login',

  action({ store, query }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let warning = false;
    let refer = query.refer;
    let error_message = query.error_message;

    if (refer) {
      refer = refer.indexOf('---') >= 0 ? refer.replace('---', '?') : refer;
      refer = refer.indexOf('--') >= 0 ? refer.replace('--', '&') : refer;
    }

    if (isAuthenticated) {
      return { redirect: '/' };
    }

    if ('verification' in query) {
      warning = true;
    }

    return {
      title,
      component: <Layout><Login title={title} error_message={error_message} warning={warning} refer={refer} /></Layout>,
    };
  }

};
