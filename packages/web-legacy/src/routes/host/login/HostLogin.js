// General
import React from 'react';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostLogin.css';

// Components
import HostLoginForm from '../../../components/Host/HostLoginForm/HostLoginForm';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';
import { toastr } from 'react-redux-toastr'
import ForgotPassword from '../../../components/ForgotPassword';

// Locale
import messages from '../../../locale/messages';

class HostLogin extends React.Component {

  componentDidMount() {
    const { errorMessage } = this.props;
    errorMessage && toastr.error('Oops!', errorMessage);
  }

  render() {
    let errorReturn = '/space/login?';
    if (errorReturn) {
      errorReturn = errorReturn.indexOf('?') >= 0 ? errorReturn.replace('?', '---') : errorReturn;
      errorReturn = errorReturn.indexOf('&') >= 0 ? errorReturn.replace('&', '--') : errorReturn;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <ForgotPassword userType={2} />
          <div className={s.socialPadding}>
            <SocialLogin errorReturn={errorReturn} userType='host' />
          </div>
          <strong className={s.lineThrough}><FormattedMessage {...messages.or} /></strong>
          <HostLoginForm />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HostLogin);