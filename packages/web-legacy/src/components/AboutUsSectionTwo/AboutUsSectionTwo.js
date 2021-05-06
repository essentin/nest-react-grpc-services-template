import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';

import messages from '../../locale/messages';

import MobileImage from '../../../public/SiteImages/tablet.png';

import SectionOne from '../../components/AboutUsSectionOne/SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

class AboutUsSectionTwo extends React.Component {

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <SectionOne
                    title={formatMessage(messages.flexibleWorkSpacesMadeEasy)}
                    subTitle={formatMessage(messages.flexibleWorkSpacesMadeEasyDesc)}
                />
                <div className={cx(s.textAlignCenter, s.positionRelative)}>
                    <div className={s.displayInlineBlock}>
                        <img src={MobileImage} />
                        <div className={cx(s.afterBg, s.afterBgSecond)}>
                            <div className={s.descriptionSection}>
                                <FormattedMessage {...messages.wereInBeta} />
                            </div>
                        </div>
                    </div>
                </div>
                <SectionTwo />

            </div>
        );
    }
}

export default injectIntl((withStyles(s)(AboutUsSectionTwo)));
