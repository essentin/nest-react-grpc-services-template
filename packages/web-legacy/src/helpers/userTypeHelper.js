import React from 'react';
import NotFound from '../routes/notFound/NotFound';
import Layout from '../components/Layout';
import HostLayout from '../components/Host/Layout/HostLayout';

export function isHost(account) {
    return account && account.data && account.data.userType === 2;
}

export function isGuest(account) {
    return account && account.data && account.data.userType === 1;
}

export function isHostFeatureAllowed(featureFlag) {
    return featureFlag && featureFlag.hostExperience;
}

export function renderNotFound(account, title) {
    if(isHost(account)) return <HostLayout><NotFound title={title} /></HostLayout>;
    else return <Layout><NotFound title={title} /></Layout>;
}

export function renderComponent(account, children) {
    if(isHost(account)) return <HostLayout>{children}</HostLayout>;
    else return <Layout>{children}</Layout>;
}