// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux form
import { Field, reduxForm } from 'redux-form';

// Internal Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HostLogin.css';
import {
  Button,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';

import { openForgotPasswordModal, closeLoginModal } from '../../../actions/modalActions';

class HostLoginForm extends Component {

  static propTypes = {
    openForgotPasswordModal: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label className={s.labelText}>
          {label}
        </label>
        <FormControl {...input} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { openForgotPasswordModal } = this.props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <span className={cx(s.errorMessage, 'commonLoginPadding')}>{formatMessage(error)}</span>}
        <FormGroup className={cx(s.noMargin, s.mainPadding)}>
          <Field
            name="email"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.email)}
            className={cx(s.formControlInput, s.backgroundOne)}
          />
        </FormGroup>
        <hr className={s.horizontalLineThrough} />
        <FormGroup className={cx(s.noMargin, s.mainPadding)}>
          <Field
            name="password"
            type="password"
            component={this.renderFormControl}
            label={formatMessage(messages.password)}
            className={cx(s.formControlInput, s.backgroundTwo)}
          />
        </FormGroup>
        <hr className={s.horizontalLineThrough} />
        <FormGroup className={cx(s.formGroup, s.mainPadding, s.spaceTop5)}>
          <Button className={cx(s.button, s.btnPrimary)} bsSize="large" block type="submit" disabled={submitting}>
            {formatMessage(messages.login)}
          </Button>
        </FormGroup>
        <FormGroup className={cx(s.formGroup, s.mainPadding, s.formSection)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.textAlignCenter)}>
            <a onClick={openForgotPasswordModal} className={s.modalCaptionLink}>
              <FormattedMessage {...messages.cantLogin} />
            </a>
          </Col>
        </FormGroup>
      </form>
    );
  }

}

HostLoginForm = reduxForm({
  form: 'HostLoginForm', // a unique name for this form
  validate,
  destroyOnUnmount: false
})(HostLoginForm);

const mapState = state => ({});

const mapDispatch = {
  openForgotPasswordModal,
  closeLoginModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HostLoginForm)));