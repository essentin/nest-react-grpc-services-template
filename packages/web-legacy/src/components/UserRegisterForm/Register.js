import React from 'react';

import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import s from './Register.css';

import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree';
import Toaster from '../Toaster';

import { loadAccount } from '../../actions/account'

import messages from '../../locale/messages';

class Register extends React.Component {

  componentWillMount() {
    const { isAuthenticated, loadAccount } = this.props;
    // if (isAuthenticated) loadAccount(true);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { step, account, isAuthenticated, initialValues: initial } = this.props;
    let initialValues = { ...initial };
    if (isAuthenticated && account) {
      initialValues = {
        ...initial,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email
      };
    }

    return <div>
      <Toaster />
      {step === 1 && <div><StepOne refer={''} initialValues={initialValues} />
        <div className={s.footerText}>
          <div>{step} <span>{formatMessage(messages.of)}</span> 3</div>
          <div>{formatMessage(messages.registerPageFooterSection)}</div>
        </div>
      </div>}
      {step === 2 && <div>
        <StepTwo initialValues={initialValues} />
        <div className={s.footerText}>
          <div>{step} <span>{formatMessage(messages.of)}</span> 3</div>
          <div>{formatMessage(messages.registerPageFooterSectionTwo)}</div>
        </div>
      </div>}
      {step === 3 && <div>
        <StepThree />
        <div className={s.footerText}>
          <div>{step} <span>{formatMessage(messages.of)}</span> 3</div>
          <div>{formatMessage(messages.registerPageFooterSectionThree)}</div>
        </div>
      </div>}
    </div>
  }
}

const mapState = (state) => ({
  isAuthenticated: state.runtime.isAuthenticated,
  account: state.account && state.account.data
});

const mapDispatch = {
  loadAccount
}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Register)));