import React from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import Link from '../Link';

import messages from '../../locale/messages';
import { openApplyForBetaModal } from '../../actions/modalActions';

import bannertwo from '../../../public/SiteImages/rectangleAboutUs.svg';
import IconOne from '../../../public/SiteImages/nounBuilding.svg';
import IconTwo from '../../../public/SiteImages/nounWork-3.svg';
import IconThree from '../../../public/SiteImages/nounCoins.svg';


class SectionTWo extends React.Component {

    render() {
        const { account, openApplyForBetaModal } = this.props;
        return (
            <div className={s.bgParent}>
                <div className={cx(s.spaceBg, s.threeAboutBg)} style={{ backgroundImage: `url(${bannertwo})` }} />
                <Grid fluid className={s.sectionOneContainer}>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <h2 className={cx(s.oneTitleText, s.space4)}>
                                        <FormattedMessage {...messages.howItWorks} />
                                    </h2>
                                </div>
                                <div className={s.displayGridOne}>
                                    <div>
                                        <div className={s.howItThree}>
                                            <img src={IconOne} className={s.sectionOneImg} />
                                        </div>
                                        <div>
                                            <h4 className={s.sectionOneSubTitle}>
                                                <FormattedMessage {...messages.listYourSpace} />
                                            </h4>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.listYourPlaceDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.howItThree}>
                                            <img src={IconTwo} className={s.sectionOneTwoImg} />
                                        </div>
                                        <div>
                                            <h4 className={s.sectionOneSubTitle}>
                                                <FormattedMessage {...messages.reachNewCustomersLabel} />
                                            </h4>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.reachNewCustomersLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.howItThree}>
                                            <img src={IconThree} className={s.sectionOneThreeImg} />
                                        </div>
                                        <div>
                                            <h4 className={s.sectionOneSubTitle}>
                                                <FormattedMessage {...messages.decreaseMarketingLabel} />
                                            </h4>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.decreaseMarketingLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                {(!account || !account.userId) && <div className={'aboutBtnCenter'}>
                                    <Link onClick={openApplyForBetaModal} className={cx(s.btnPrimary, 'aboutBtnScetion', 'curserHand')}>
                                      <FormattedMessage {...messages.joinBeta} />
                                    </Link>
                                </div>}
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}


const mapState = (state) => ({
    account: state.account.data
});

const mapDispatch = {
    openApplyForBetaModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(SectionTWo));