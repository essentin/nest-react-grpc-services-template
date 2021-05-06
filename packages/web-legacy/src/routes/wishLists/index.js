import React from 'react';
import WishLists from './WishLists';
import Layout from '../../components/Layout';
import { isGuest, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'Wish Lists';

export default {

  path: '/wishlists/:id?',

  action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    let profileId, wishListId;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (isAuthenticated) {
      profileId = store.getState().account.data.profileId;
    }

    if (!isGuest(store.getState().account)) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    if (params && params.id) {
      wishListId = params.id;
    }

    return {
      title,
      component: <Layout><WishLists
        profileId={profileId}
        wishListId={wishListId}
      />
      </Layout>,
    };
  },

};
