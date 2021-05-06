import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './StepOne.css';

import {
  Button,
  Row,
  FormGroup,
  Col,
  Grid,
  FormControl,
} from 'react-bootstrap';

import SocialLogin from '../../SocialLogin/SocialLogin';
import Link from '../../Link/Link';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';

import submit from './submit';
import validate from './validate';


import messages from '../../../locale/messages';


class StepOne extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {}
    };
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div>
          <label className={s.labelText}>{label}</label>
        </div>
        <FormControl {...input} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className}>
          {children}
        </FormControl>
      </div>
    )
  }

  renderCheckBox = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <CustomCheckbox {...input}
          className={'icheckbox_square-green'}
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, isAcceptTerm, initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const loginURL = '/login';
    const email = initialValues && initialValues.inviteEmail;
    const inviteCode = initialValues && initialValues.inviteCode
    let errorReturn = `/register/step-one?email=${email}`;
    if (inviteCode) errorReturn = errorReturn + '&inviteCode=' + inviteCode;
    if (errorReturn && errorReturn != null) {
      errorReturn = errorReturn.indexOf('?') >= 0 ? errorReturn.replace('?', '---') : errorReturn;
      errorReturn = errorReturn.indexOf('&') >= 0 ? errorReturn.replace('&', '--') : errorReturn;
    }
    return (
      <div className={s.container}>
        <Grid fluid>
          <Row>
            <div>
              <h1 className={s.registerText}>{formatMessage(messages.registerAccount)}</h1>
              <div className={s.socialLogin}>
                <SocialLogin inviteCode={inviteCode} errorReturn={errorReturn} />
              </div>
              <strong className={cx(s.lineThrough, s.noMarginBottom)}>
                {formatMessage(messages.or)}
              </strong>
            </div>
            <form onSubmit={handleSubmit(submit)} className="SelectFocus">
              {error && <span className={cx(s.errorMessage, s.paddingLeft)}>{error}</span>}
              <FormGroup className={cx(s.formGroup, s.firstNameInput, s.firstNameInputPadding, s.mobileMarginTopFirstName)}>
                <Field
                  name="firstName"
                  type="text"
                  component={this.renderFormControl}
                  onChange={this.onChange}
                  label={formatMessage(messages.firstName)}
                  className={cx(s.formControlInput, s.backgroundTwo, 'inputProfile', 'CardFormInput')}
                />
              </FormGroup>
              <FormGroup className={cx(s.formGroup, s.lastNamedInput)}>
                <Field name="lastName"
                  type="text"
                  onChange={this.onChange}
                  component={this.renderFormControl}
                  label={formatMessage(messages.lastName)}
                  className={cx(s.formControlInput, s.backgroundTwo, 'inputProfile', 'CardFormInput')}
                />
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <Field name="email"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.email)}
                  className={cx(s.formControlInput, s.backgroundTwo, 'inputEmailImg', 'CardFormInput')}
                />
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <Field name="password"
                  type="password"
                  component={this.renderFormControl}
                  label={formatMessage(messages.password)}
                  className={cx(s.formControlInput, s.backgroundThree, 'inputCsv', 'CardFormInput')}
                />
              </FormGroup>
              <FormGroup className={cx(s.formGroup, s.noBorder, s.noMargin)}>
                <div className={s.displayTable}>
                  <div className={s.displayTableRow}>
                    <div className={s.dislayTableCellCheckBox}>
                      <Field name="acceptTerms"
                        component={this.renderCheckBox}
                        className={cx(s.formControlInput, s.backgroundThree, 'inputCsv', 'CardFormInput')}
                      />
                    </div>
                    <div className={s.displayTableCelltext}>
                      <p className={s.checkboxText}>
                        <span>{formatMessage(messages.acceptFlowpass)}</span>{' '}
                        <span><a href='/' className={s.checkboxLink}>{formatMessage(messages.termsOfUse)}</a></span>
                      </p>
                    </div>
                  </div>
                </div>
              </FormGroup>
              <FormGroup className={cx(s.formGroup, s.noBorder, s.space5, s.padding2)}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.paddingBtn}>
                    <Button
                      className={cx(s.button, s.btnPrimary)} bsSize="large" block type="submit" disabled={!isAcceptTerm || submitting} >
                      {formatMessage(messages.createAccount)}
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </form>
            <hr className={s.horizontalLineThrough} />
            <div className={cx(s.formGroup, s.formSection, s.noBorder, s.paddingLoginBtn)}>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.textAlignLeft)}>
                <span className={s.descText}>
                  {formatMessage(messages.alreadyHaveAccount)}
                </span>
                <Link className={cx(s.btnText)} to={loginURL}>
                  {formatMessage(messages.login)}
                </Link>
              </Col>
            </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

StepOne = reduxForm({
  form: 'UserRegisterForm', // a unique name for this form
  validate
})(StepOne);

const selector = formValueSelector('UserRegisterForm');

const mapState = (state) => ({
  isAcceptTerm: selector(state, 'acceptTerms'),
});

const mapDispatch = {

}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(StepOne)));