import React from 'react';
import Contact from './Contact';
import { renderComponent } from '../../helpers/userTypeHelper';

const title = 'Contact Us';

export default {

  path: '/contact',

  action({ store, query }) {
    return {
      title,
      component: renderComponent(store.getState().account, <Contact title={title} />)
    };
  },

};
