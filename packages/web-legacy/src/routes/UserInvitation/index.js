import React from 'react';
import UserInvitation from './UserInvitation';

import { renderNotFound, renderComponent, isGuest } from '../../helpers/userTypeHelper';

const title = 'Invitation';

export default {

  path: '/user-invitation',

  action({ store }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const featureFlag = store.getState().featureFlag;

    if (!isAuthenticated) return { redirect: '/login' };

    if (!isGuest(store.getState().account) || !featureFlag || !featureFlag.inviteUser) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404,
      };
    }

    return {
      title,
      component: renderComponent(store.getState().account, <UserInvitation />)
    };
  }

};
