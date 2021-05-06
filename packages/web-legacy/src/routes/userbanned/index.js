import React from 'react';
import UserBanned from './UserBanned';
import { renderComponent } from '../../helpers/userTypeHelper';

const title = 'User Banned';

export default {

  path: '/userbanned',

  action({ store }) {
    return {
      title,
      component: renderComponent(store.getState().account, <UserBanned title={title} />),
      status: 404,
    };
  },

};
