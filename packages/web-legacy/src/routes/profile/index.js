import React from 'react';
import Profile from './Profile';
import { renderNotFound, renderComponent } from '../../helpers/userTypeHelper';

const title = 'User Profile';

export default {

  path: '/users/show/:profileId?',

  async action({ params, store }) {
    const data = store.getState().account.data;

    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let isAdminAuthenticated = store.getState().runtime && store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated && !isAuthenticated) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    const profileId = params.profileId;
    let profile = 0;
    let isUser = false;

    if (profileId) {
      profile = Number(profileId);
      if (isAuthenticated && data && Number(data.profileId) == Number(profileId)) {
        profile = Number(profileId);
        isUser = true;
      }
    } else {
      isUser = false;
    }

    return {
      title,
      component: renderComponent(store.getState().account, <Profile
        title={title}
        isUser={isUser}
        profileId={profile}
      />)
    };
  }

};
