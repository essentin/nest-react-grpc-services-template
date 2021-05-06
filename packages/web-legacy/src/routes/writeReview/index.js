import React from 'react';
import WriteReview from './WriteReview';
import { renderNotFound, renderComponent } from '../../helpers/userTypeHelper';

const title = 'Write Review';

export default {

  path: '/review/write/:reservationId',

  async action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (reservationId === undefined || isNaN(reservationId)) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    return {
      title,
      component: renderComponent(store.getState().account, <WriteReview reservationId={Number(reservationId)} />)
    };
  },

};
