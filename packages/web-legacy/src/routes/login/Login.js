// General
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import cx from 'classnames';
import {
  Button,
  Col
} from 'react-bootstrap';

// Components
import LoginForm from '../../components/LoginForm';
import SocialLogin from '../../components/SocialLogin';
import { toastr } from 'react-redux-toastr'

// Locale
import messages from '../../locale/messages';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    warning: PropTypes.bool,
    formatMessage: PropTypes.func,
    refer: PropTypes.string
  };

  static defaultProps = {
    warning: false
  }

  componentDidMount() {
    const { error_message } = this.props;
    error_message && toastr.error('Oops!', error_message);
  }

  render() {
    const { warning, refer } = this.props;
    let initialValues = {}, socialLoginRefer, registerURL = '/register', errorReturn = '/login?';
    if (refer) {
      initialValues = {
        refer
      };
      socialLoginRefer = refer;
      if (socialLoginRefer) {
        socialLoginRefer = socialLoginRefer.indexOf('?') >= 0 ? socialLoginRefer.replace('?', '---') : socialLoginRefer;
        socialLoginRefer = socialLoginRefer.indexOf('&') >= 0 ? socialLoginRefer.replace('&', '--') : socialLoginRefer;
      }
      registerURL = '/register?refer=' + refer;
    }

    if (errorReturn) {
      errorReturn = errorReturn.indexOf('?') >= 0 ? errorReturn.replace('?', '---') : errorReturn;
      errorReturn = errorReturn.indexOf('&') >= 0 ? errorReturn.replace('&', '--') : errorReturn;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            warning && <div>
              <FormattedMessage {...messages.loginConfirmation} />
            </div>
          }
          <h1 className={s.titleText}>{this.props.title}</h1>
          <div className={s.socialPadding}>
            <SocialLogin refer={socialLoginRefer} errorReturn={errorReturn} />
          </div>
          <strong className={s.lineThrough}><FormattedMessage {...messages.or} /></strong>
          <LoginForm initialValues={initialValues} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);