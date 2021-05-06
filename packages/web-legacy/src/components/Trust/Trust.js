import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';


import { Panel } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trust.css';

import history from '../../core/history';

// Component
import Item from './Item';

// Redux
import { connect } from 'react-redux';
import { disconnectVerification, resendEmailVerification } from '../../actions/manageUserVerification';

// Locale
import messages from '../../locale/messages';

class MenuComponent extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      isEmailConfirmed: PropTypes.bool,
      isFacebookConnected: PropTypes.bool,
      isGoogleConnected: PropTypes.bool,
      isLinkedinConnected: PropTypes.bool,
    }),
    disconnectVerification: PropTypes.any.isRequired,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
    resendEmailLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    data: {
      isEmailConfirmed: false,
      isFacebookConnected: false,
      isGoogleConnected: false,
      isLinkedinConnected: false
    },
    resendEmailLoading: false,
  }

  constructor(props) {
    super(props);
    this.sendConfirmEmail = this.sendConfirmEmail.bind(this);
    this.facebookDisconnect = this.facebookDisconnect.bind(this);
    this.googleDisconnect = this.googleDisconnect.bind(this);
    this.linkedinDisconnect = this.linkedinDisconnect.bind(this);
  }

  sendConfirmEmail() {
    const { resendEmailVerification } = this.props;
    resendEmailVerification();
  }

  facebookDisconnect() {
    const { disconnectVerification, account } = this.props;
    disconnectVerification("facebook", account.userId);
  }

  googleDisconnect() {
    const { disconnectVerification, account } = this.props;
    disconnectVerification("google", account.userId);
  }

  linkedinDisconnect() {
    const { disconnectVerification, account } = this.props;
    disconnectVerification("linkedin", account.userId);
  }

  render() {
    const { data: { isEmailConfirmed, isFacebookConnected, isGoogleConnected, isLinkedinConnected }, resendEmailLoading } = this.props;
    const { formatMessage } = this.props.intl;
    let displayVerifiedPanel = isEmailConfirmed || isFacebookConnected || isGoogleConnected || isLinkedinConnected || false;
    let displayUnVerifiedPanel = !isEmailConfirmed || !isFacebookConnected || !isGoogleConnected || !isLinkedinConnected || false;

    return (
      <div>
        {displayVerifiedPanel && <div className={s.scrollScetion}>
          <div className={s.labelTitle}>
            {formatMessage(messages.VerifiedInformation)}<span className={s.pullRight}>{formatMessage(messages.options)}</span>
          </div>
          <ul className={cx(s.listLayout)}>
            {
              isEmailConfirmed && <Item
                title={formatMessage(messages.email)}
                content={formatMessage(messages.verifiedEmail)}
                isAction={false}
                isImage={true}
                name='email'
              />
            }

            {
              isFacebookConnected && <Item
                title={formatMessage(messages.facebook)}
                content={formatMessage(messages.facebookInfo)}
                isAction
                isLink={false}
                buttonLabel={formatMessage(messages.disconnect)}
                handleClick={this.facebookDisconnect}
                name='facebook'
              />
            }

            {
              isGoogleConnected && <Item
                title={formatMessage(messages.google)}
                content={formatMessage(messages.googleInfo)}
                isAction
                isLink={false}
                buttonLabel={formatMessage(messages.disconnect)}
                handleClick={this.googleDisconnect}
                name='google'
              />
            }

            {
              isLinkedinConnected && <Item
                title={formatMessage(messages.linkedinVerification)}
                content={formatMessage(messages.linkedinVerificationInfo)}
                isAction
                isLink={false}
                buttonLabel={formatMessage(messages.disconnect)}
                handleClick={this.linkedinDisconnect}
                name='linkedin'
              />
            }

            {
              !isEmailConfirmed && !isFacebookConnected && !isGoogleConnected && !isLinkedinConnected &&
              <p><FormattedMessage {...messages.notVerifiedDetails} /></p>
            }
          </ul>
        </div>}

        {displayUnVerifiedPanel && <div className={s.scrollScetion}>
          <div className={s.labelTitle}>{formatMessage(messages.notVerifiedDetails)}
            <span className={s.pullRight}>{formatMessage(messages.options)}</span></div>
          <ul className={cx(s.listLayout)}>
            {
              !isEmailConfirmed && <Item
                title={formatMessage(messages.email)}
                content={formatMessage(messages.pleaseVerify)}
                isAction
                isLink={false}
                buttonLabel={formatMessage(messages.verifyEmail)}
                handleClick={this.sendConfirmEmail}
                show={resendEmailLoading}
                name='email'
              />
            }

            {
              !isFacebookConnected && <Item
                title={formatMessage(messages.facebook)}
                content={formatMessage(messages.facebookInfo)}
                isAction
                isLink
                buttonLabel={formatMessage(messages.connect)}
                url={"/login/facebook"}
                name='facebook'
              />
            }

            {
              !isGoogleConnected && <Item
                title={formatMessage(messages.google)}
                content={formatMessage(messages.googleInfo)}
                isAction
                isLink
                buttonLabel={formatMessage(messages.connect)}
                url={"/login/google"}
                name='google'
              />
            }
            {
              !isLinkedinConnected && <Item
                title={formatMessage(messages.linkedinVerification)}
                content={formatMessage(messages.linkedinVerificationInfo)}
                isAction
                isLink
                buttonLabel={formatMessage(messages.connect)}
                url={"/login/linkedin"}
                name='linkedin'
              />

            }
          </ul>
        </div>}
      </div>
    );
  }
}

const mapState = (state) => ({
  resendEmailLoading: state.loader.resendEmailLoading,
  account: state.account.data,
});

const mapDispatch = {
  disconnectVerification,
  resendEmailVerification
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MenuComponent)));