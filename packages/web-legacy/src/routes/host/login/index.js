import React from 'react';
import HostLayout from '../../../components/Host/Layout/HostLayout';
import HostLogin from './HostLogin';
import { isHost } from '../../../helpers/userTypeHelper';

const title = 'Host Log In';

export default {

    path: '/space/login',

    action({ store, query }) {
        
        let errorMessage = query.error_message;

        // From Redux Store
        let isAuthenticated = store.getState().runtime.isAuthenticated;
        if (isAuthenticated) {
            return { redirect: isHost(store.getState().account) ? '/space' : '/' };
        }

        return {
            title,
            component: <HostLayout><HostLogin errorMessage={errorMessage} /></HostLayout>,
        };
    }

};