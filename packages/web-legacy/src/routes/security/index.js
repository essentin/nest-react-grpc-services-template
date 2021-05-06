import React from 'react';

import Layout from '../../components/Layout';
import SecurityContainer from './SecurityContainer';
import NotFound from '../notFound/NotFound';

import { emailVerification } from '../../actions/manageUserVerification';
import { isGuest, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'Security';

export default {

  path: '/security',

  async action({ store, query }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const featureFlag = store.getState().featureFlag;

    if (!isAuthenticated) {
      if ('confirm' in query && 'email' in query) {
        //return { redirect: '/login?verification=email' };
        return { redirect: "/login?refer=/security---confirm=" + query.confirm + "--email=" + query.email };
      }
      return { redirect: '/login' };
    }
    
    if (!isGuest(store.getState().account) || !featureFlag || !featureFlag.security) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    let userId = store.getState().account.data.userId;

    if ('confirm' in query && 'email' in query) {
      store.dispatch(emailVerification(query.confirm, query.email, userId));
      if (!featureFlag || !featureFlag.security) return { redirect: '/' }
    }

    return {
      title,
      component: <Layout><SecurityContainer /></Layout>,
    };
  },

};
