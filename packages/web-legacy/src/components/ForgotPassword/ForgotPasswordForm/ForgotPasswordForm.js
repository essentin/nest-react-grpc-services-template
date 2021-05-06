// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux form
import { Field, reduxForm, change } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Internal Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import s from './ForgotPasswordForm.css';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Checkbox
} from 'react-bootstrap';
class ForgotPasswordForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
  };

  componentDidMount() {
    const { userType, dispatch } = this.props;
    dispatch(change('ForgotPasswordForm', 'userType', userType))
  }
  
  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { openLoginModal } = this.props;
    return (
      <div className={s.container}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <span className={cx(s.errorMessage, s.mainPadding)}>{formatMessage(error)}</span>}
          <FormGroup className={cx(s.formGroup, s.mainPadding)}>
            <p><FormattedMessage {...messages.forgotPasswordInfo} /></p>
          </FormGroup>
          <div className={cx(s.forgetEmail, s.mainPadding)}>
            <FormattedMessage {...messages.email} />
          </div>
          <FormGroup className={cx(s.formGroup, s.mainPadding)}>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.email)}
              className={cx(s.formControlInput, s.meassageicon)}
            />
          </FormGroup>
          <hr className={s.horizontalLineThrough} />
          <div className={cx(s.formGroup, s.formSection, s.mainPadding, s.space4)}>
            <Col xs={12} sm={7} md={7} lg={7} className={cx(s.noPadding, s.textAlignLeft)}>
              <span><FontAwesome.FaChevronLeft className={s.leftICon} /></span>
              <a href="#" onClick={openLoginModal} className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}>
                <FormattedMessage {...messages.backToLogin} />
              </a>
            </Col>
            <Col xs={12} sm={5} md={5} lg={5} className={cx(s.noPadding, s.textAlignRight, s.smSpace)}>
              <Button className={cx(s.button, s.btnPrimary)} type="submit" disabled={submitting}>
                <FormattedMessage {...messages.sendLink} />
              </Button>
            </Col>
          </div>
        </form>
      </div>
    )
  }

}

ForgotPasswordForm = reduxForm({
  form: 'ForgotPasswordForm', // a unique name for this form
  validate,
  destroyOnUnmount: false
})(ForgotPasswordForm);

export default injectIntl(withStyles(s)(ForgotPasswordForm));
