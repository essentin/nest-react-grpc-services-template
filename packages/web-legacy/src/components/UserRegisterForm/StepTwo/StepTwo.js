import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './StepTwo.css';

import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
  Grid
} from 'react-bootstrap';

import submit from './submit';
import validate from './validate';

import messages from '../../../locale/messages';

class StepTwo extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

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

  render() {
    const { error, handleSubmit, submitting } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={s.mobileNoPadding}>
            <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
              <h1 className={cx(s.registerText)}>{formatMessage(messages.createProfile)}</h1>
              <div>
                <form onSubmit={handleSubmit(submit)} className="SelectFocus">
                  {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                  <FormGroup className={cx(s.formGroup, s.firstNameInput)}>
                    <Field
                      name="firstName"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.firstName)}
                      className={cx(s.formControlInput, s.profileBgPosition, 'inputProfile', 'CardFormInput')}
                    />
                  </FormGroup>
                  <FormGroup className={cx(s.formGroup, s.lastNamedInput)}>
                    <Field name="lastName"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.lastName)}
                      className={cx(s.formControlInput, s.profileBgPosition, 'inputProfile', 'CardFormInput')}
                    />
                  </FormGroup>
                  <div className={s.formGroup}>
                    <p className={cx(s.descText, s.subDescText)}>{formatMessage(messages.signUpStep2DescText)}</p>
                  </div>
                  <FormGroup className={s.formGroup}>
                    <Field name="companyName"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.companyName)}
                      className={cx(s.formControlInput, s.companyBgPosition, 'inputCompany', 'CardFormInput')}
                    />
                  </FormGroup>
                  <FormGroup className={s.formGroup}>
                    <Field name="zipcode"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.yourZipCode)}
                      className={cx(s.formControlInput, s.backgroundThree, 'inputLocation', 'CardFormInput')}
                    />
                  </FormGroup>
                  <p className={s.descText}>{formatMessage(messages.postcodeSuggest)}</p>
                  <FormGroup className={cx(s.formGroup, s.noBorder, s.spaceTop5, s.space5, s.padding1)}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.paddingBtn}>
                        <Button
                          className={cx(s.button, s.btnPrimary)} bsSize="large" block type="submit" disabled={submitting} >
                          {formatMessage(messages.save)}
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

StepTwo = reduxForm({
  form: 'ZipcodeForm', // a unique name for this form
  validate
})(StepTwo);

export default injectIntl(withStyles(s)(StepTwo));