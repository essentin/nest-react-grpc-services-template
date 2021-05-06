import React from 'react';
import { compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MoreAbout.css';

//Components
import MoreAboutFlowpass from '../../components/MoreAboutFlowpass/MoreAboutFlowpass';
import MoreAboutSection from '../../components/MoreAboutFlowpass/MoreAboutSection';


class MoreAbout extends React.Component {
    render() {
        return (
            <div className={s.positionRelative}>
                <MoreAboutFlowpass />
                <div className={s.moreBgSection}>
                    <MoreAboutSection />
                </div>
            </div>
        );
    }
}

export default compose(withStyles(s))(MoreAbout);