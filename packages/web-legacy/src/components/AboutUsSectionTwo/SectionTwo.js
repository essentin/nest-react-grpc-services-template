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

class SectionTWo extends React.Component {

    render() {
        const { account, openApplyForBetaModal } = this.props;
        return (
            <div className={cx(s.bgParent, s.fourBgTwo)}>
                <div className={cx(s.spaceBg, s.fourSpaceBg)} style={{ backgroundImage: `url(${bannertwo})` }} />
                <Grid fluid className={s.container}>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <h2 className={cx(s.oneTitleText, s.space4)}><FormattedMessage {...messages.whatYouGetLabel} /></h2>
                                </div>
                                <div className={s.fourGrid}>
                                    <div>
                                        <div className={s.fourOne}>
                                            <h3 className={cx(s.sectionOneSubTitle, s.fontBold)}><FormattedMessage {...messages.oneStopShop} /></h3>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.oneStopShopDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.fourOne}>
                                            <h3 className={cx(s.sectionOneSubTitle, s.fontBold)}><FormattedMessage {...messages.flexibilityLabel} /></h3>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.flexibilityLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.fourOne}>
                                            <h3 className={cx(s.sectionOneSubTitle, s.fontBold)}><FormattedMessage {...messages.lowerCostsLabel} /></h3>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.lowerCostsLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.fourOne}>
                                            <h3 className={cx(s.sectionOneSubTitle, s.fontBold)}><FormattedMessage {...messages.goodWorkingEnviromentLabel} /></h3>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.goodWorkingEnviromentLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.fourOne}>
                                            <h3 className={cx(s.sectionOneSubTitle, s.fontBold)}><FormattedMessage {...messages.happyEmployeesProductiveLabel} /></h3>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.happyEmployeesProductiveLabelDesc} />
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.fourOne}>
                                            <h3 className={cx(s.sectionOneSubTitle, s.fontBold)}><FormattedMessage {...messages.easeOfAdministrationLabel} /></h3>
                                            <h4 className={s.sectionOneDescText}>
                                                <FormattedMessage {...messages.easeOfAdministrationLabelDesc} />
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