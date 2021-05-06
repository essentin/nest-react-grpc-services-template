
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage } from 'react-intl';
import { Col, Grid, Row } from 'react-bootstrap';

import s from './Footer.css';

import { compose } from 'react-apollo';
import { connect } from 'react-redux';

import Link from '../Link';

import messages from '../../locale/messages';
import { openApplyForBetaModal } from '../../actions/modalActions';
//Images
import facebookIcon from '../../../public/NewIcon/facebook.svg';
import instaIcon from '../../../public/NewIcon/instagram.svg';
import PinterestIcon from '../../../public/NewIcon/pinterest.svg';
import linkedInIcon from '../../../public/NewIcon/linkedin.svg';
import SiteIcon from '../../../public/NewIcon/group.svg';
import RectangleIcon from '../../../public/NewIcon/rectangle.svg';

// Locale

class Footer extends React.Component {
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
      instagram,
      linkedinLink,
      pinterestLink,
      openApplyForBetaModal,
      featureFlag
    } = this.props;

    return (
      <div className={s.positionRelative}>
        <div className={s.container}>
          <div className={cx(s.footerSectionContainer, 'hidden-print')}>
            <Grid fluid>
              <Row>
                <div className={s.responsivePadding}>
                  <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddinFirstSection)}>
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

                    </ul>
                  </Col>
                  <Col sm={3} md={3} lg={3} xs={12} className={cx(s.noPadding, s.responsiveMargin)}>
                    <ul className={s.listContainer}>
                      <li>
                        <Link to={'/aboutus/about-the-initiatives'} className={s.textLink}>
                          <FormattedMessage {...messages.moreAboutFlowpass} />
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
                      {
                        featureFlag && featureFlag.inviteUser && <li>
                          <Link to={'/user-invitation'} className={s.textLink}>
                            <FormattedMessage {...messages.inviteMembers} />
                          </Link>
                        </li>
                      }
                    </ul>
                  </Col>
                  <Col sm={3} md={3} lg={3} xs={12} className={cx(s.noPadding)}>
                    <Link onClick={openApplyForBetaModal} className={cx(s.joinBtn, s.spaceTop2, 'curserHand')}>
                      <FormattedMessage {...messages.joinBeta} />
                    </Link>
                  </Col>
                  <Col xs={12} sm={3} md={3} lg={3} className={cx(s.responsiveMarginOne, s.spaceTop2)}>
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
                </div>
              </Row>
            </Grid>
          </div>
          <div className={s.footerPosition}>
            <div className={s.footerImg} style={{ backgroundImage: `url(${RectangleIcon})` }} />
            <Row className={s.footerContainer}>
              <Col xs={12} sm={6} md={6} lg={6} className={s.spaceTop2}>
                <span className={s.text}>© 2021 {siteName}. <FormattedMessage {...messages.allRightReserved} />{" "}<FormattedMessage {...messages.orgNameAndNumber} /> </span>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.textAlignRight)}>
                <img src={SiteIcon} alt='siteicon' className={s.siteIcon} />
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
  featureFlag: state.featureFlag
});


const mapDispatch = {
  openApplyForBetaModal
};

export default compose(withStyles(s), connect(mapState, mapDispatch))(Footer);
