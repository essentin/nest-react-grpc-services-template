import React from 'react';
import ManageListing from './ManageListing';

//Components
import HostLayout from '../../../components/Host/Layout/HostLayout';
import FeatureFlagError from '../../../components/Host/FeatureFlagError/FeatureFlagError';

import { getListingSteps, resetListingSteps } from '../../../actions/getListingSteps';
import { isHostFeatureAllowed, isHost, renderNotFound } from '../../../helpers/userTypeHelper';

const title = "Manage Listing";
export default {

  path: '/space',

  async action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    store.dispatch(resetListingSteps());
    await store.dispatch(getListingSteps());

    if (!isAuthenticated) {
      return { redirect: '/space/login' };
    }

    if (!isHost(store.getState().account)) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    if (!isHostFeatureAllowed(store.getState().featureFlag)) {
      return {
        title,
        component: <HostLayout><FeatureFlagError /></HostLayout>
      };
    }

    return {
      title,
      component: <HostLayout><ManageListing /></HostLayout>,
    };
  },

};
