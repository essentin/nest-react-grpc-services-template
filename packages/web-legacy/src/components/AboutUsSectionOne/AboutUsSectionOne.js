import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsSectionOne.css';
import cx from 'classnames';

import messages from '../../locale/messages';

import MobileImage from '../../../public/SiteImages/phones.png';

import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';


class AboutUsSectionOne extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <SectionOne
                    title={formatMessage(messages.workWhereYouAre)}
                    subTitle={formatMessage(messages.workWhereYouAreDesc)}
                />
                <div className={cx(s.textAlignCenter, s.positionRelative)}>
                    <div className={s.displayInlineBlock}>
                        <img src={MobileImage} />
                        <div className={s.afterBg}>
                            <div className={s.descriptionSection}>
                                <FormattedMessage {...messages.wereInBeta} />
                            </div>
                        </div>
                    </div>
                </div>
                <SectionTwo />
                <SectionThree />
            </div>
        );
    }
}

export default injectIntl((withStyles(s)(AboutUsSectionOne)));