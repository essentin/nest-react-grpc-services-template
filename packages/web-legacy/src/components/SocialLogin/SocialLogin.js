import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import s from './SocialLogin.css';

import messages from '../../locale/messages';

import GoogleIcon from '../../../public/NewIcon/google.png';
import FaceBookIcon from '../../../public/NewIcon/facebook.png';
import LinkdinIcon from '../../../public/NewIcon/linkedinLogin.svg'

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string
  };

  render() {
    const { refer, errorReturn, inviteCode, linkedInFeature, userType } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    let LinkedinUrl = '/login/linkedin';
    if (refer && errorReturn) {
      FbURL = `/login/facebook?errorReturn=${errorReturn}&refer=${refer}`;
      GoogleURL = `/login/google?errorReturn=${errorReturn}&refer=${refer}`;
      LinkedinUrl = `/login/linkedin?errorReturn=${errorReturn}&refer=${refer}`;
    } else if (errorReturn) {
      FbURL = '/login/facebook?errorReturn=' + errorReturn;
      GoogleURL = '/login/google?errorReturn=' + errorReturn;
      LinkedinUrl = '/login/linkedin?errorReturn=' + errorReturn;
    } else if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
      LinkedinUrl = '/login/linkedin?refer=' + refer;
    }

    if (inviteCode) {
      FbURL = FbURL + (FbURL.includes('?') ? '&' : '?') + 'inviteCode=' + inviteCode;
      GoogleURL = GoogleURL + (GoogleURL.includes('?') ? '&' : '?') + 'inviteCode=' + inviteCode;
      LinkedinUrl = LinkedinUrl + (LinkedinUrl.includes('?') ? '&' : '?') + 'inviteCode=' + inviteCode;
    }

    if(userType === 'host') {
      FbURL = FbURL + (FbURL.includes('?') ? '&' : '?') + 'userType=2';
      GoogleURL = GoogleURL + (GoogleURL.includes('?') ? '&' : '?') + 'userType=2';
      LinkedinUrl = LinkedinUrl + (LinkedinUrl.includes('?') ? '&' : '?') + 'userType=2';
    }

    return (
      <div>
        <div className={s.formGroup}>
          <a className={s.facebook} href={FbURL}>
            <div className={s.icon}>
              <img src={FaceBookIcon} responsive />
            </div>
            <FormattedMessage {...messages.facebookLogin} />
          </a>
        </div>
        <div className={s.formGroup}>
          <a className={cx(s.google)} href={GoogleURL}>
            <div className={s.googleIcon}>
              <img src={GoogleIcon} responsive />
            </div>
            <FormattedMessage {...messages.googleLogin} />
          </a>
        </div>
        {linkedInFeature && <div className={s.formGroup}>
          <a className={cx(s.linkdin)} href={LinkedinUrl}>
            <div className={s.googleIcon}>
              <img src={LinkdinIcon} responsive className={s.loginWithLinkdin}/>
            </div>
            <FormattedMessage {...messages.linkedinLogin} />
          </a>
        </div>}
      </div>
    );
  }
}

const mapState = (state) => ({
  linkedInFeature: state.featureFlag.linkedIn
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));