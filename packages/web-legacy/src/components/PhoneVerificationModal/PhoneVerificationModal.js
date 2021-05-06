import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';


import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as MdIconPack from 'react-icons/lib/md';

import s from './PhoneVerificationModal.css';

import Loader from '../Loader';
import AddPhoneNumberForm from './AddPhoneNumberForm';
import VerifyPhoneNumberForm from './VerifyPhoneNumberForm';

import {
  openSmsVerificationModal,
  closeSmsVerificationModal,
} from '../../actions/SmsVerification/modalActions';
import { sendVerificationSms } from '../../actions/SmsVerification/sendVerificationSms';

import getUserDataQuery from './getUserData.graphql';

import messages from '../../locale/messages';

class PhoneVerificationModal extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object,
  };

  static defaultProps = {
    modalStatus: false,
    data: {
      getPhoneData: null,
      loading: false,
    },
    modalFormType: 'addPhoneNumber',
  };

  constructor(props) {
    super(props);

    this.state = {
      form1: true,
      form2: false,
      buttonLoader: false,
    };

    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderAddPhoneNumber = this.renderAddPhoneNumber.bind(this);
    this.renderVerifyPhoneNumber = this.renderVerifyPhoneNumber.bind(this);
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
    this.renderConfirmedPhoneNumber = this.renderConfirmedPhoneNumber.bind(
      this,
    );
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { modalFormType } = nextProps;
    if (modalFormType == 'verifyPhoneNumber') {
      this.setState({
        form1: false,
        form2: true,
      });
    } else {
      this.setState({
        form1: true,
        form2: false,
      });
    }
  }

  async verifyPhoneNumber() {
    const {
      sendVerificationSms,
      data,
      data: { loading, getPhoneData },
    } = this.props;
    let error;
    if (!loading && getPhoneData) {
      this.setState({ buttonLoader: true });
      const { status, errorMessage } = await sendVerificationSms(
        getPhoneData.countryCode,
        getPhoneData.phoneNumber,
      );
      if (status != '200') {
        if (errorMessage) {
          error = errorMessage;
        } else {
          error = 'Sorry, something went wrong. Please try again';
        }
        toastr.error('Error!', error);
      }
      this.setState({ buttonLoader: false });
    }
  }

  async handleClick(formType) {
    const { openSmsVerificationModal } = this.props;
    openSmsVerificationModal(formType);
  }

  async handleRemove() {
    const { mutate, closeSmsVerificationModal } = this.props;

    const { data } = await mutate({
      refetchQueries: [
        {
          query: getUserDataQuery,
        },
      ],
    });

    await closeSmsVerificationModal();
  }

  formatPhoneNumber(phoneNumber) {
    let formattedNumber = '';
    if (phoneNumber && phoneNumber != '') {
      if (phoneNumber.length > 6) {
        formattedNumber = phoneNumber.substr(0, phoneNumber.length - 3);
        formattedNumber = formattedNumber.replace(new RegExp('\\d', 'g'), '*');
        formattedNumber =
          formattedNumber +
          phoneNumber.substr(phoneNumber.length - 3, phoneNumber.length);
      } else {
        formattedNumber =
          '***' +
          formattedNumber +
          phoneNumber.substr(phoneNumber.length - 1, phoneNumber.length);
      }
    }
    return formattedNumber;
  }

  renderAddPhoneNumber() {
    return (
      <div>
        <a
          href="javascript:void(0)"
          className={cx(s.modalCaptionLink)}
          onClick={() => this.handleClick('addPhoneNumber')}
        >
          <FormattedMessage {...messages.addPhoneNumber} />
        </a>
      </div>
    );
  }

  renderVerifyPhoneNumber() {
    const {
      data,
      data: { loading, getPhoneData },
    } = this.props;
    const { formatMessage } = this.props.intl;
    const { buttonLoader } = this.state;

    return (
      <div>
        <table className={s.tableBox}>
          <tbody>
            <tr>
              {!loading && (
                <th className={s.tableBoxHeader}>
                  {getPhoneData.countryCode +
                    ' ' +
                    this.formatPhoneNumber(getPhoneData.phoneNumber)}
                </th>
              )}
              <td>
                <Loader
                  type={'button'}
                  buttonType={'button'}
                  className={cx(s.button, s.btnPrimaryBorder)}
                  disabled={buttonLoader}
                  show={buttonLoader}
                  label={formatMessage(messages.verifyViaSms)}
                  handleClick={this.verifyPhoneNumber}
                  spinnerColor={'#f56e9f'}
                />
              </td>
              <td className={'text-right'}>
                <a
                  href="javascript:void(0)"
                  className={cx(s.modalCaptionLink)}
                  title="Remove"
                  onClick={this.handleRemove}
                >
                  <MdIconPack.MdClear className={s.iconSize} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderConfirmedPhoneNumber() {
    const {
      data,
      data: { loading, getPhoneData },
    } = this.props;

    return (
      <div>
        <table className={s.tableBox}>
          <tbody>
            <tr>
              {!loading && (
                <th className={s.tableBoxHeader}>
                  {getPhoneData.countryCode +
                    ' ' +
                    this.formatPhoneNumber(getPhoneData.phoneNumber)}
                </th>
              )}
              <td>
                <p className={s.noMargin}>
                  <MdIconPack.MdCheckCircle className={cx(s.confirmedIcon)} />{' '}
                  <FormattedMessage {...messages.confirmedLabel} />
                </p>
              </td>
              <td className={'text-right'}>
                <a
                  href="javascript:void(0)"
                  className={cx(s.modalCaptionLink)}
                  title="Remove"
                  onClick={this.handleRemove}
                >
                  <MdIconPack.MdClear className={s.iconSize} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const {
      modalStatus
    } = this.props;
    const {
      data,
      data: { loading, getPhoneData },
    } = this.props;
    const { form1, form2, buttonLoader } = this.state;

    let verificationStatus =
      getPhoneData &&
      getPhoneData.verification &&
      getPhoneData.verification.isPhoneVerified == true
        ? true
        : false;

    return (
      <div>
        {loading && <Loader show={true} />}
        {!loading &&
          getPhoneData &&
          !modalStatus &&
          !getPhoneData.phoneNumber &&
          !verificationStatus && <div>{this.renderAddPhoneNumber()}</div>}
        {!loading &&
          getPhoneData &&
          !modalStatus &&
          getPhoneData.phoneNumber &&
          !verificationStatus && <div>{this.renderVerifyPhoneNumber()}</div>}
          {!loading &&
            getPhoneData &&
            modalStatus &&
            !verificationStatus &&
            (form1 || form2) && (
              <div>
                {form1 ? <AddPhoneNumberForm /> :  <VerifyPhoneNumberForm
                  countryCode={getPhoneData.countryCode}
                  phoneNumber={getPhoneData.phoneNumber}
                />}
              </div>
            )}
        {!loading && verificationStatus && (
          <div>{this.renderConfirmedPhoneNumber()}</div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  modalStatus: state.modalStatus.smsVerificationModalOpen,
  modalFormType: state.modalStatus.formType,
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal,
  sendVerificationSms,
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getUserDataQuery, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(gql`
    mutation {
      RemovePhoneNumber {
        status
      }
    }
  `),
)(PhoneVerificationModal);