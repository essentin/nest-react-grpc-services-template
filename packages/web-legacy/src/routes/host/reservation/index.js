import React from 'react';
import ReservationContainer from './ReservationContainer';

//Components
import HostLayout from '../../../components/Host/Layout/HostLayout';
import FeatureFlagError from '../../../components/Host/FeatureFlagError/FeatureFlagError';
import { isHostFeatureAllowed, isHost, renderNotFound } from '../../../helpers/userTypeHelper';

const title = 'Reservation';

export default {

  path: '/reservation/:type',

  action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const type = params.type;

    if (!isAuthenticated) {
      return { redirect: '/space/login' };
    }

    let invalidType = type !== "previous" && type !== "current" && type !== "cancelled";

    if (!isHost(store.getState().account) || invalidType) {
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
      component: <HostLayout><ReservationContainer type={type} /></HostLayout>,
    };
  },

};
