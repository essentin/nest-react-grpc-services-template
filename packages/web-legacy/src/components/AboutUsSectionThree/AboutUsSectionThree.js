import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

//Images
import MobileImage from '../../../public/SiteImages/tablet-2.png';

import SectionOne from '../../components/AboutUsSectionOne/SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from '../../components/AboutUsSectionTwo/SectionThree';
import AboutUsFaq from './AboutUsFaq';


class AboutUsSectionThree extends React.Component {

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <SectionOne
                    title={formatMessage(messages.increaseOccupancyLabel)}
                    subTitle={formatMessage(messages.increaseOccupancyLabelDesc)}
                />
                <div className={cx(s.textAlignCenter, s.positionRelative)}>
                    <div className={s.displayInlineBlock}>
                        <img src={MobileImage} />
                        <div className={cx(s.afterBg, s.afterBgThree)}>
                            <div className={s.descriptionSection}>
                                <FormattedMessage {...messages.wereInBeta} />
                            </div>
                        </div>
                    </div>
                </div>
                <SectionTwo />
                <AboutUsFaq />
            </div>
        );
    }
}

export default injectIntl((withStyles(s)(AboutUsSectionThree)));
