// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialShareModal.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Modal,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';
import { openSocialShareModal, closeSocialShareModal } from '../../../actions/modalActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { url } from '../../../config';
import { ShareButtons, generateShareIcon } from 'react-share';
import history from '../../../core/history';
// Helpers
import { formatURL } from '../../../helpers/formatURL';
import { encode } from '../../../helpers/base64Encryption';
// import imageOne from './mail.png';
const {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton
} = ShareButtons;

class SocialShareModal extends Component {
  static propTypes = {
    closeSocialShareModal: PropTypes.func,
    socialshareModal: PropTypes.bool,
    openSocialShareModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      socialshareModalStatus: false,
      isFormOpen: false,
      value: 'Copy Link',
      copied: false,
    };
    this.openForm = this.openForm.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { socialshareModal } = this.props;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { socialshareModal } = nextProps;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    } else {
      this.setState({ socialshareModalStatus: false });
    }
  }

  async copyText() {

    this.setState({
      value: 'Link Copied',
      copied: true
    })

    setTimeout(() => {
      this.setState({
        value: 'Copy Link',
        copied: false
      })
    }, 2000)
  }

  render() {
    const { closeSocialShareModal, openSocialShareModal, listId, title, city, state, country, activityType, siteName } = this.props;
    const { socialshareModalStatus, isFormOpen } = this.state;

    let locationPath = history.location ? history.location.pathname : null;
    let locationSearch = history.location && history.location.search ? history.location.search : '';
    var locationPathValue;
    if (locationPath && locationPath.indexOf('/preview') > -1) {
      locationPathValue = "/space/" + formatURL(title) + '-' + listId + "?c=" + encode(activityType);
    } else {
      locationPathValue = locationPath + locationSearch
    }
    const shareUrl = url + locationPathValue;
    let previewText = `Check out this listing on ${siteName}!`;
    let bodyText = `Check out this listing on ${siteName}!` + ' ' + shareUrl;


    return (
      <div>
        <Modal show={socialshareModalStatus} animation={false} onHide={closeSocialShareModal} dialogClassName={cx(s.signupModalContainer, 'signupModal', 'sharesocialModal')} >
          <Modal.Header closeButton className={cx(s.marginBottom24, 'customClosebutton', s.marginleftM5)}>

            {/* <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <div className={s.paddingbottom24}>
              <div className={s.share}>
              <FormattedMessage {...messages.shareLabel} />
            </div>
              <div className={s.content}>
              <FormattedMessage {...messages.shareModalDesc} />:{' '}
                {title} in {city}, {state}, {country}
                {/* 'Silo Studio' Cottage - Guesthouses for Rent in Tyringham */}
              </div>
            </div>
            <ListGroup className={'sharingsocial'}>
              <ListGroupItem tag="a" href={shareUrl} className={s.borderradiusNone}>
                {/* <FontAwesome.FaFacebook className={s.socialIcons} /> */}
                <FacebookShareButton
                  url={shareUrl}
                // className={s.displayIcon}
                >
                  <FontAwesome.FaFacebook className={s.socialIcons} />

                  <FormattedMessage {...messages.facebook} />
                </FacebookShareButton>
                {/* Facebook */}
              </ListGroupItem>
              <ListGroupItem tag="a" href={shareUrl}>
                {/* <FontAwesome.FaTwitter className={s.socialIcons} /> */}
                <TwitterShareButton
                  url={shareUrl}
                  className={s.displayIcon}>
                  <FontAwesome.FaTwitter className={s.socialIcons} />
                  <FormattedMessage {...messages.twitterLabel} />
                </TwitterShareButton>
                {/* Twitter */}
              </ListGroupItem>
              <ListGroupItem tag="a" href={shareUrl}>
                {/* <FontAwesome.FaEnvelope className={s.socialIcons} /> */}
                <EmailShareButton
                  url={shareUrl}
                  subject={previewText}
                  body={bodyText}
                  className={s.displayIcon}>
                  <FontAwesome.FaEnvelope className={s.socialIcons} />
                  <FormattedMessage {...messages.emailLabel} />
              </EmailShareButton>
                {/* Email */}
              </ListGroupItem>
              <ListGroupItem tag="a" href='#'>
                {/* <FontAwesome.FaCopy className={s.socialIcons} /> */}
                <CopyToClipboard
                  text={shareUrl}
                  onCopy={() => this.copyText()}

                >
                  <span>
                    <FontAwesome.FaCopy className={s.socialIcons} />
                    {this.state.value}</span>
                </CopyToClipboard>
              </ListGroupItem>
            </ListGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  socialshareModal: state.modalStatus.isSocialShareModal,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  closeSocialShareModal,
  openSocialShareModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialShareModal));
