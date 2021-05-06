import React from 'react';
import ReceiptContainer from './ReceiptContainer';
import { getListingFields } from '../../actions/getListingFields';
import { getActivityType } from '../../actions/siteadmin/getActivityType';
import { renderComponent, renderNotFound } from '../../helpers/userTypeHelper';

const title = 'View Receipt';

export default {

  path: '/users/bookings/receipt/:reservationId',

  async action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;
    const listingFields = store.getState().listingFields.data;
    if (listingFields === undefined) {
      store.dispatch(getListingFields());
    }
    store.dispatch(getActivityType());

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (!reservationId) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    return {
      title,
      component: renderComponent(store.getState().account, <ReceiptContainer title={title} reservationId={Number(reservationId)} />)
    };
  }

};
