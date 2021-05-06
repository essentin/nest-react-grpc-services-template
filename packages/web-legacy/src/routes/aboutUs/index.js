import React from 'react';
import AboutUsPage from './AboutUsPage';
import LandingHomeLayout from '../../components/Layout/LandingHomeLayout';
import { isGuest, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'About Us';

export default {

  path: '/aboutUs/:type',

  action({ store, params }) {

    let tab = params.type,
      show = params.type === 'about-the-initiatives' ? true : false;

    let isAuthenticated = store.getState().runtime && store.getState().runtime.isAuthenticated;
    let account = store.getState().account;
    if (isAuthenticated && !isGuest(store.getState().account)) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    return {
      title,
      component: <LandingHomeLayout>
        <AboutUsPage tab={tab} show={show} />
      </LandingHomeLayout>
    };
  },
};