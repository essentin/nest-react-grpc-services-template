import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import UserInvitation from './UserInvitation';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'User Invitation Management';

export default {

  path: '/siteadmin/user-invitation',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/user-invitation', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><UserInvitation /></AdminLayout>,
    };
  },

};
