import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'react-apollo';
import { Col, Grid, Row } from 'react-bootstrap';

import s from './Footer.css';

import Link from '../Link';

import { openApplyForBetaModal } from '../../actions/modalActions';
import messages from '../../locale/messages';

import facebookIcon from '../../../public/NewIcon/facebook.svg';
import instaIcon from '../../../public/NewIcon/instagram.svg';
import PinterestIcon from '../../../public/NewIcon/pinterest.svg';
import linkedInIcon from '../../../public/NewIcon/linkedin.svg';
import SiteIcon from '../../../public/NewIcon/group.svg';
import RectangleIcon from '../../../public/NewIcon/rectangleMobile.svg';

class FooterMobile extends React.Component {
    static propTypes = {
        siteName: PropTypes.string.isRequired,
        facebook: PropTypes.string,
        twitter: PropTypes.string,
        instagram: PropTypes.string,
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            loading: PropTypes.bool,
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            rentall: false,
            hosting: false,
            discover: false,
        };
    }

    render() {
        const {
            siteName,
            facebook,
            twitter,
            instagram,
            appAvailableStatus,
            playStoreUrl,
            appStoreUrl,
            linkedinLink,
            pinterestLink,
            openApplyForBetaModal
        } = this.props;

        return (
            <div className={s.positionRelative}>
                <div className={s.container}>
                    <div className={cx(s.footerSectionContainer, 'hidden-print')}>
                        <Grid fluid>
                            <Row>
                                <div className={s.responsivePadding}>
                                    <Col xs={8} className={cx(s.responsiveMargin, s.noPaddinFirstSection)}>
                                        <ul className={s.listContainer}>
                                            <li>
                                                <Link to={'/aboutus/for-workers'} className={s.textLink}>
                                                    <FormattedMessage {...messages.forWorkers} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/aboutus/for-employers'} className={s.textLink}>
                                                    <FormattedMessage {...messages.forEmployers} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/aboutus/for-workspaces'} className={s.textLink}>
                                                    <FormattedMessage {...messages.forWorkSpace} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/aboutus/for-workers'} className={s.textLink}>
                                                    <FormattedMessage {...messages.about} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/contact'} className={s.textLink}>
                                                    <FormattedMessage {...messages.contactForm} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/privacy'} className={s.textLink}>
                                                    <FormattedMessage {...messages.termsPrivacy} />
                                                </Link>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col xs={4} className={cx(s.responsiveMarginOne)}>
                                        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.socialLogin, s.textAlignRight)}>
                                            {
                                                linkedinLink && <a href={linkedinLink} className={cx(s.shareIcon)} target='_blank'>
                                                    <img src={linkedInIcon} alt="Linkedin" />
                                                </a>
                                            }
                                            {instagram && (
                                                <a href={instagram} className={cx(s.shareIcon)} target='_blank'>
                                                    <img src={instaIcon} alt="instagram" />
                                                </a>
                                            )}
                                            {facebook && (
                                                <a href={facebook} className={cx(s.shareIcon)} target='_blank'>
                                                    <img src={facebookIcon} alt="facebook" />
                                                </a>
                                            )}
                                            {
                                                pinterestLink && <a href={pinterestLink} className={cx(s.shareIcon)} target='_blank'>
                                                    <img src={PinterestIcon} alt="Pinterest" />
                                                </a>
                                            }
                                        </Col>
                                    </Col>
                                    <Col xs={12} className={cx(s.noPadding, s.textAlignCenter)}>
                                        <Link onClick={openApplyForBetaModal} className={cx(s.joinBtn, s.spaceTop2)}>
                                            <FormattedMessage {...messages.joinBeta} />
                                        </Link>
                                    </Col>
                                </div>
                            </Row>
                        </Grid>
                    </div>
                    <div className={cx(s.footerPosition, s.space4)}>
                        <div className={s.footerImg} style={{ backgroundImage: `url(${RectangleIcon})` }} />
                        <Row className={s.footerContainer}>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.textAlignCenter)}>
                                <img src={SiteIcon} alt='siteicon' className={s.siteIcon} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.textAlignCenter)}>
                                <div className={s.text}>© 2020 {siteName}. <FormattedMessage {...messages.allRightReserved} /></div>
                                <div className={s.text}>{" "}<FormattedMessage {...messages.orgNameAndNumber} /></div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    facebook: state.siteSettings.data.facebookLink,
    twitter: state.siteSettings.data.twitterLink,
    instagram: state.siteSettings.data.instagramLink,
    appAvailableStatus: state.siteSettings.data.appAvailableStatus,
    playStoreUrl: state.siteSettings.data.playStoreUrl,
    appStoreUrl: state.siteSettings.data.appStoreUrl,
    linkedinLink: state.siteSettings.data.linkedinLink,
    pinterestLink: state.siteSettings.data.pinterestLink,
});


const mapDispatch = {
    openApplyForBetaModal
};

export default compose(withStyles(s), connect(mapState, mapDispatch))(FooterMobile);