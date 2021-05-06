// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, reset } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './VerifyPhoneNumberForm.css';

import {
  FormGroup,
  Col,
  Row,
  FormControl,
  Modal
} from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

// Redux Action
import { openSmsVerificationModal, closeSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

import getPhoneDataQuery from '../getUserData.graphql';

// Internal Components
import Loader from '../../Loader';

class VerifyPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { mutate } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode } = this.state;
    let error = null, submitting = false;
    if (!verificationCode) {
      error = {
        verificationCode: formatMessage(messages.required)
      };
    } else if (isNaN(verificationCode)) {
      error = {
        verificationCode: formatMessage(messages.required)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { data } = await mutate({
        variables: {
          verificationCode
        },
        refetchQueries: [{
          query: getPhoneDataQuery
        }]
      });

      if (data && data.VerifyPhoneNumber) {
        if (data.VerifyPhoneNumber.status === '200') {
          toastr.success("Success!", "Phone number has been verified successfully.");
        } else {
          error = {
            verificationCode: 'We were unable to validate your phone number. Please try again.'
          };
        }
      }
    }

    if (this.refs.verifyPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }

  }

  render() {
    const { openSmsVerificationModal, countryCode, phoneNumber, closeSmsVerificationModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode, submitting, error } = this.state;
    let mobileNumber = phoneNumber && phoneNumber.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    return (
      <div className={s.formContainer} ref="verifyPhoneNumberForm">
        <Modal
          show={true}
          animation={false}
          onHide={closeSmsVerificationModal}
          dialogClassName={cx(s.logInModalContainer, 'loginModal', 'signupModal', 'NewSignUpModal', 'meetModal', 'appyBetaModal', 'verifyPhoneNumber')}
        >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.addAPhoneNumber} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <FormGroup className={s.formGroup}>
              <label className={s.labelText} >
                <FormattedMessage {...messages.weHaveSentVerificationCode} />
                {' ' + countryCode}{' ' + mobileNumber}
              </label>
            </FormGroup>
            <FormGroup className={s.formGroup}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <div className={s.displayGrid}>
                    <div className={s.codeText}>
                      <p className={cx(s.labelText, s.codeTextmobile)} >
                        <FormattedMessage {...messages.verificationCodeLabel} />
                      </p>
                    </div>
                    <div>
                      <FormControl
                        name={'verificationCode'}
                        value={verificationCode}
                        placeholder={''}
                        type={'password'}
                        maxLength={4}
                        className={cx('formControlInput', s.inputSection, s.inputPaddingTop)}
                        onChange={this.handleChange} />
                    </div>
                  </div>
                </Col>
              </Row>
              {error && error.verificationCode && <span className={s.errorMessage}>{error.verificationCode}</span>}
            </FormGroup>

            <FormGroup className={cx(s.formGroup)}>
              <div className={s.verifyBtn}>
                <a className={cx(s.modalCaptionLink)} href={'javascript:void(0)'} onClick={closeSmsVerificationModal}>
                  <FormattedMessage {...messages.cancel} />
                </a>
              </div>
              <div className={cx(s.verifyBtn, s.textAlignRight)}>
                <Loader
                  containerClass={s.btnContainer}
                  type={"button"}
                  buttonType={"button"}
                  className={cx(s.btnPrimary)}
                  disabled={submitting}
                  show={submitting}
                  label={'Verify'}
                  handleClick={this.submitForm}
                />
              </div>
            </FormGroup>
            <label className={s.descText} ><FormattedMessage {...messages.verifyPhoneNumberDesc} /></label>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation VerifyPhoneNumber($verificationCode: Int!) {
      VerifyPhoneNumber(verificationCode: $verificationCode) {
          status
      }
    }
  `)
)(VerifyPhoneNumberForm);