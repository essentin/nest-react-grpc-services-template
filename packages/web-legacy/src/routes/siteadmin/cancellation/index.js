import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Cancellation from './Cancellation';

const title = 'Cancellation Management';

export default {

    path: '/siteadmin/cancellation/management',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        return {
            title,
            component: <AdminLayout><Cancellation title={title} /></AdminLayout>,
        };
    },

};
