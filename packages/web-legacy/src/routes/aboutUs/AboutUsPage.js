import React from 'react';
import { compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsPage.css';

//Components
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection';


class AboutUsPage extends React.Component {
    render() {
        const { tab, show } = this.props;
        return (
            <div>
                <AboutUsSection tab={tab} show={show} />
            </div>
        );
    }
}

export default compose(withStyles(s))(AboutUsPage);