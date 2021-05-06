import React from 'react';

import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import Link from '../Link';

import messages from '../../locale/messages';

import bannertwo from '../../../public/SiteImages/dummyImage.jpg';
import IconOne from '../../../public/SiteImages/nounTime.svg';
import IconTwo from '../../../public/SiteImages/nounFlexible.svg';
import IconThree from '../../../public/SiteImages/desk.svg';
import IconFour from '../../../public/SiteImages/nounSocial.svg';

class SectionThree extends React.Component {

    render() {
        return (
            <div className={cx(s.threeBg, s.bgParentColor)}>
                <div className={s.threeBgImage} style={{ backgroundImage: `url(${bannertwo})` }} />
                <Grid fluid className={cx(s.Maincontainer, s.paddingTop, s.threeSection)}>
                    <div>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <h2 className={cx(s.oneTitleText, s.space4, s.siteColor)}>
                                        <FormattedMessage {...messages.whyFlowpassLabel} />
                                    </h2>
                                    <h3 className={cx(s.threeSubTitle, s.space3)}>
                                        <FormattedMessage {...messages.whyFlowpassLabelDesc1} />
                                    </h3>
                                </div>
                                <div className={s.displayGridThree}>
                                    <div>
                                        <div>
                                            <img src={IconOne} className={s.threeIcons} />
                                        </div>
                                        <div>
                                            <h4 className={cx(s.sectionOneSubTitle, s.siteColor, s.fontBold)}>
                                                <FormattedMessage {...messages.saveTimeLabel} />
                                            </h4>
                                            <h4 className={cx(s.sectionOneDescText, s.siteColor)}>
                                                <FormattedMessage {...messages.saveTimeLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <img src={IconTwo} className={s.threeIcons} />
                                        </div>
                                        <div>
                                            <h4 className={cx(s.sectionOneSubTitle, s.siteColor, s.fontBold)}>
                                                <FormattedMessage {...messages.flexible} />
                                            </h4>
                                            <h4 className={cx(s.sectionOneDescText, s.siteColor)}>
                                                <FormattedMessage {...messages.flexibleLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <img src={IconThree} className={s.threeIcons} />
                                        </div>
                                        <div>
                                            <h4 className={cx(s.sectionOneSubTitle, s.siteColor, s.fontBold)}>
                                                <FormattedMessage {...messages.focusLabel} />
                                            </h4>
                                            <h4 className={cx(s.sectionOneDescText, s.siteColor)}>
                                                <FormattedMessage {...messages.FocusLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <img src={IconFour} className={s.threeIcons} />
                                        </div>
                                        <div>
                                            <h4 className={cx(s.sectionOneSubTitle, s.siteColor, s.fontBold)}>
                                                <FormattedMessage {...messages.socialLabel} />
                                            </h4>
                                            <h4 className={cx(s.sectionOneDescText, s.siteColor)}>
                                                <FormattedMessage {...messages.socialLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className={'aboutBtnCenter'}>
                                    <Link to={'/aboutus/about-the-initiatives'} className={cx(s.btnPrimary, 'aboutBtnScetion')}>
                                      <FormattedMessage {...messages.moreAboutUsLabel} />
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(SectionThree);