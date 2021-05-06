import React from 'react';

import AdminLayout from '../../../components/Layout/AdminLayout';
import UserInvitationSettings from './UserInvitationSettings';

import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'User Invitation Settings';

export default {

  path: '/siteadmin/settings/user-invitation',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/settings/user-invitation', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><UserInvitationSettings /></AdminLayout>,
    };
  },

};
