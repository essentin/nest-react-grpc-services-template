import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
// External Reducers
import { reducer as formReducer } from 'redux-form';
import account from './account';
import book from './book';
import calendar from './calendar';
import content from './content';
import currency from './currency';
import intl from './intl';
import listingFields from './listingFields';
import location from './listYourSpace';
import loader from './loader';
import mobileSearch from './mobileSearch';
import modalStatus from './modalReducer';
import onChangeListing from './onChangeListing';
import personalized from './personalized';
import reservation from './reservation';
import runtime from './runtime';
import search from './search';
import activityType from './siteadmin/activityType';
import adminListSettingsData from './siteadmin/adminListSettingsData';
import adminModalStatus from './siteadmin/adminModalReducer';
import adminPrevileges from './siteadmin/adminUserReducer';
import iconUploadLoader from './siteadmin/iconUploadLoader';
import listSettings from './siteadmin/listSettings';
// Site Admin
import userManagement from './siteadmin/users';
import siteSettings from './siteSettings';
import sticky from './stickyReducers';
import toggle from './toggle';
// Internal Reducers
import user from './user';
import viewListing from './viewListing';
//Invite
import invite from './invite'

import featureFlag from './featureFlag'

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    //loadingBar: loadingBarReducer,
    user,
    runtime,
    intl,
    siteSettings,
    form: formReducer,
    content,
    account,
    userManagement,
    toastr: toastrReducer,
    location,
    modalStatus,
    listSettings,
    adminModalStatus,
    listingFields,
    adminListSettingsData,
    viewListing,
    currency,
    search,
    toggle,
    personalized,
    mobileSearch,
    book,
    reservation,
    loader,
    calendar,
    sticky,
    onChangeListing,
    adminPrevileges,
    activityType,
    iconUploadLoader,
    invite,
    featureFlag
  });
}
