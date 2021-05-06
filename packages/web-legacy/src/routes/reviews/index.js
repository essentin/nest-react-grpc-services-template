import React from 'react';
import ReviewsContainer from './ReviewsContainer';
import { renderComponent } from '../../helpers/userTypeHelper';

const title = 'Reviews';

export default {

  path: '/user/reviews',

  action({ store }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: renderComponent(store.getState().account, <ReviewsContainer />)
    };
  },

};