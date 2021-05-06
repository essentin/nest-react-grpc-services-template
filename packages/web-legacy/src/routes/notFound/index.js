import React from 'react';
import NotFound from './NotFound';
import { renderComponent } from '../../helpers/userTypeHelper';

const title = 'Page Not Found';

export default {

  path: '*',

  action({ store }) {
    return {
      title,
      component: renderComponent(store.getState().account, <NotFound title={title} />),
      status: 404,
    };
  },

};
