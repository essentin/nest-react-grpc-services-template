import React from 'react';
import LandingLayout from '../../components/Layout/LandingLayout';
import MoreAbout from './MoreAbout';

const title = "More About Flowpass";
export default {

    path: '/moreAboutFlowpass',

    async action({ store }) {

        return {
            title,
            component: <LandingLayout>
                <MoreAbout />
            </LandingLayout>,
        };
    },

};