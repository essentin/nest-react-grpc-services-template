import React from 'react';

import HomeLayout from '../../components/Layout/HomeLayout';
import Home from './Home';

import { getDefaultCardDetails } from '../../actions/Cards/getDefaultCardDetails';
import { setInitialPersonalizedValues } from '../../actions/personalized';
import { searchListing } from '../../actions/searchListing';
import { getActivityType } from '../../actions/siteadmin/getActivityType';
import { setPersonalizedValues } from '../../actions/personalized';

import { defaultLat, defaultLng } from '../../config';
import { isGuest } from '../../helpers/userTypeHelper';

export default {
  path: '/',

  async action({ store, query }) {
    const title = store.getState().siteSettings.data.siteTitle;
    const description = store.getState().siteSettings.data.metaDescription;
    const listingFields = store.getState().listingFields.data;
    const layoutType = store.getState().siteSettings.data.homePageType;
    const account = store.getState().account;
    const isAuthenticated = store.getState().runtime && store.getState().runtime.isAuthenticated || false;

    if (isAuthenticated && !isGuest(account)) {
      return { redirect: '/space' };
    }

    let lat =  defaultLat;
    let lng =  defaultLng;

    await store.dispatch(getActivityType())

    await store.dispatch(setInitialPersonalizedValues())

    await store.dispatch(getDefaultCardDetails());


    await store.dispatch(
      setPersonalizedValues({
        name: 'lat',
        value: lat
      })
    );
    await store.dispatch(
      setPersonalizedValues({
        name: 'lng',
        value: lng
      })
    );
    await store.dispatch(
      searchListing({
        currentPage: 1,
        lat,
        lng
      }),
    );

    return {
      title,
      description,
      listingFields,
      chunk: 'home',
      component: (
        <HomeLayout layoutType={layoutType}>
          <Home layoutType={layoutType} />
        </HomeLayout>
      ),
    };
  },
};
