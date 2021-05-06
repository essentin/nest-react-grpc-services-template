import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TripsContainer from './TripsContainer';
import { isGuest, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'Bookings';

export default {

  path: '/bookings',

  action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;

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
      component: <UserLayout><TripsContainer /></UserLayout>,
    };
  },

};
