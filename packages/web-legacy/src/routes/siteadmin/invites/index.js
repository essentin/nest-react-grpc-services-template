import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Invites from './Invites';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Invites Management';

export default {

  path: '/siteadmin/invites',

  async action({ store }) {


    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    // if (!restrictUrls('/siteadmin/listings', adminPrivileges)) {
    //   return { redirect: '/siteadmin' };
    // }

    return {
      title,
      component: <AdminLayout><Invites title={title} /></AdminLayout>,
    };
  },

};
