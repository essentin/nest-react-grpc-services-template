import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditCancellation from './EditCancellation';
const title = 'Edit Cancellation';

export default {

    path: '/siteadmin/edit/cancellation/:cancellationId',

    async action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        const cancellationId = Number(params.cancellationId);

        return {
            title,
            component: <AdminLayout><EditCancellation title={title} cancellationId={cancellationId} /></AdminLayout>,
        };
    },

};
