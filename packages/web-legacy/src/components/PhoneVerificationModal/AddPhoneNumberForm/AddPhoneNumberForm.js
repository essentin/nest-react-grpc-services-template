import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Modal
} from 'react-bootstrap';

import s from './AddPhoneNumberForm.css';

import CountryList from '../../CountryList';
import Loader from '../../Loader';

import { sendVerificationSms } from '../../../actions/SmsVerification/sendVerificationSms';
import { openSmsVerificationModal, closeSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

import messages from '../../../locale/messages';
class AddPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      countryCode: 'SE',
      country: '+46',
      phoneNumber: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { sendVerificationSms } = this.props;
    const { formatMessage } = this.props.intl;
    const { country, phoneNumber } = this.state;
    let error = null, submitting = false;
    if (!phoneNumber) {
      error = {
        phoneNumber: formatMessage(messages.required)
      };
    } else if (isNaN(phoneNumber)) {
      error = {
        phoneNumber: formatMessage(messages.required)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { status, errorMessage } = await sendVerificationSms(country, phoneNumber);

      if (status != '200') {
        if (errorMessage) {
          error = {
            phoneNumber: errorMessage
          };
        } else {
          error = {
            phoneNumber: 'Sorry, something went wrong. Please try again'
          };
        }
      }
    }
    if (this.refs.addPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }
  }

  handleCountryChange(e, selectedData) {
    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { closeSmsVerificationModal } = this.props;
    const { country, phoneNumber, submitting, error, countryCode } = this.state;

    return (
      <div ref="addPhoneNumberForm">
        <Modal
          show={true}
          animation={false}
          onHide={closeSmsVerificationModal}
          dialogClassName={cx(s.logInModalContainer, 'loginModal', 'signupModal', 'NewSignUpModal', 'meetModal', 'appyBetaModal')}
        >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.addAPhoneNumber} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <FormGroup className={cx(s.formGroup, s.mainPadding, s.spaceTop1, 'emailDisable')}>
              <label className={s.labelText} >
                <FormattedMessage {...messages.selectACountry} />
              </label>
              <CountryList
                input={
                  {
                    name: 'countryCode',
                    onChange: this.handleChange,
                    value: countryCode
                  }
                }
                isFrom
                className={cx('formControlSelect', s.select)}
                dialCode={false}
                getSelected={this.handleCountryChange}
              />
            </FormGroup>
            <hr className={s.horizontalLineThrough} />
            <FormGroup className={cx(s.formGroup, 'addPhoneNumberAddon', s.mainPadding)}>
              <label className={s.labelText} >
                <FormattedMessage {...messages.addAPhoneNumber} />
              </label>
              <InputGroup>
                <InputGroup.Addon className={s.inputGroupAddon}>{country}</InputGroup.Addon>
                <FormControl
                  name={'phoneNumber'}
                  value={phoneNumber}
                  placeholder={''}
                  type={'text'}
                  className={cx('formControlInput', s.phoneBg)}
                  onChange={this.handleChange} />
              </InputGroup>
            </FormGroup>
            {error && error.phoneNumber && <span className={cx(s.errorMessage, s.mainPadding)}>{error.phoneNumber}</span>}
            <hr className={s.horizontalLineThrough} />
            <FormGroup className={cx('text-right', s.mainPadding, s.space3)}>
              <Loader
                type={"button"}
                buttonType={"button"}
                className={cx(s.btnPrimary)}
                disabled={submitting}
                show={submitting}
                label={formatMessage(messages.verifyViaSms)}
                handleClick={this.submitForm}
              />
            </FormGroup>
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
  sendVerificationSms,
  openSmsVerificationModal,
  closeSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(AddPhoneNumberForm);