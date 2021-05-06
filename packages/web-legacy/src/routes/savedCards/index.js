import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import SavedCardContainer from './SavedCardContainer';
import { isGuest, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'Payment';

export default {

  path: '/user/cards',

  async action({ store, query }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (!isGuest(store.getState().account)) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    return {
      title,
      component: <UserLayout><SavedCardContainer title={title} /></UserLayout>,
    };
  },

};
