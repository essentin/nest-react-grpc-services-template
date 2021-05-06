import React from 'react';

// Redux Action
import { getListingSteps, resetListingSteps } from '../../../actions/getListingSteps';
import { getListingFields } from '../../../actions/getListingFields';
import { getListingStepTwo } from '../../../actions/Listing/getListingStepTwo';
import { getActivityType } from '../../../actions/siteadmin/getActivityType';

// Components
import ListLayout from '../../../components/Layout/ListLayout';
import BecomeHost from './BecomeHost';
import NewListLayout from '../../../components/Layout/NewListLayout';
import HostLayout from '../../../components/Host/Layout/HostLayout';
import FeatureFlagError from '../../../components/Host/FeatureFlagError/FeatureFlagError';

// Helpers
import { restrictUrls } from '../../../helpers/adminPrivileges';
import { isHostFeatureAllowed, isHost, renderNotFound } from '../../../helpers/userTypeHelper';

const title = 'Become a Host';


export default {

  path: '/become-a-host/:listId?/:formPage?',

  async action({ params, store, query }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const listingFields = store.getState().listingFields.data;
    const listingSteps = store.getState().location.listingSteps;
    const isExistingList = store.getState().location.isExistingList;
    const initialValuesLoaded = store.getState().location.initialValuesLoaded;
    const baseCurrency = store.getState().currency.base;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    // From URI
    const listId = params.listId;
    const formPage = params.formPage;
    const formBaseURI = "/become-a-host/";
    const className = 'hiddenFooterMobile';

    let mode;

    if ("mode" in query) {
      if (query.mode === "new") {
        mode = query.mode;
      }
    }

    if (!isAuthenticated && !isAdminAuthenticated) {
      return { redirect: '/space/login' };
    }

    if (!isAdminAuthenticated && !isHost(store.getState().account)) {
      return {
        title,
        component: renderNotFound(store.getState().account, title),
        status: 404
      };
    }

    // Admin restriction
    if (isAdminAuthenticated && !restrictUrls('/become-a-host/', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    if (!isHostFeatureAllowed(store.getState().featureFlag) && !isAdminAuthenticated) {
      return {
        title,
        component: <HostLayout><FeatureFlagError /></HostLayout>,
        status: 404
      };
    }

    // Fetch all settings fields 
    if (listingFields === undefined) {
      store.dispatch(getListingFields());
    }

    store.dispatch(getActivityType());

    if (listId != undefined && !isNaN(listId)) {
      // Fetch All steps status
      if (listingSteps === undefined) {
        store.dispatch(getListingSteps(listId));
      } else {
        // Fetch All steps status for another list
        if (listingSteps.listId != listId) {
          store.dispatch(getListingSteps(listId));
        } else if (formPage && formPage == 'home') {
          store.dispatch(getListingSteps(listId));
        }
      }
      store.dispatch(getListingStepTwo(listId));

    } else {
      if (initialValuesLoaded != true || (mode && mode == 'new')) {
        await store.dispatch(resetListingSteps());
        await store.dispatch(getListingSteps());
      }
    }



    if (listId != undefined && !isNaN(listId)) {
      let step;
      const step1Pages = [
        "location", "spaces-parking", "amenities", "moods", "contact"
      ];
      const step2Pages = [
        "about-your-space", "house-rules", "instructions", "photos", "cover-photo"
      ];
      const step3Pages = [
        "availability", "calendar", "cancellation-policy", "activities", "booking-scenarios", "local-laws"
      ];



      if (step1Pages.indexOf(formPage) > -1) {
        step = 1;
      } else if (step2Pages.indexOf(formPage) > -1) {
        step = 2;
      } else if (step3Pages.indexOf(formPage) > -1) {
        step = 3;
      }
      if (step != undefined) {
        return {
          title,
          component: <ListLayout step={step} formPage={formPage}>
            <BecomeHost
              listId={Number(listId)}
              title={title}
              formPage={formPage}
              formBaseURI={formBaseURI}
              mode={mode}
              baseCurrency={baseCurrency}
            />
          </ListLayout>,
        };
      }
    }

    return {
      title,
      component: <NewListLayout>
        <BecomeHost
          listId={Number(listId)}
          title={title}
          formPage={formPage}
          formBaseURI={formBaseURI}
          mode={mode}
          baseCurrency={baseCurrency}
        />
      </NewListLayout>
    };
  },

};
