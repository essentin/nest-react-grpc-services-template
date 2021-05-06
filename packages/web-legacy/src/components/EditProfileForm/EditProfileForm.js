import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import submit from './submit';
import validate from './validate';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import {
  Button,
  Form,
  Row,
  Col,
  FormControl,
  FormGroup,
  InputGroup
} from 'react-bootstrap';

import s from './EditProfileForm.css';

import PhoneVerificationModal from '../PhoneVerificationModal';
import CountryList from '../CountryList';
import DropZone from './DropZone';
import Avatar from '../Avatar';
import Loader from '../Loader';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

import { doRemoveProfilePicture } from '../../actions/manageUserProfilePicture';

import PopulateData from '../../helpers/populateData';

import messages from '../../locale/messages';

class EditProfileForm extends Component {

  static propTypes = {
    loadAccount: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {},
      countryCode: 'SE',
      country: '+46',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount() {
    const { change, initialValues } = this.props;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }
    change('loggedinEmail', loggedinEmail);

    if (initialValues && initialValues.countryName && initialValues.countryCode) {
      this.setState({
        countryCode: initialValues.countryName,
        country: initialValues.countryCode
      });
    }

  }

  componentWillReceiveProps() {
    const { change, initialValues } = this.props;
    const { country, countryCode } = this.state;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }

    change('loggedinEmail', loggedinEmail);

    if (countryCode && country) {
      change('countryCode', countryCode);
      change('dialCode', country);
    }
  }

  componentWillMount() {
    const { change } = this.props;
    change('preferredLanguage', 'en');
    let now = new Date();
    let currentYear = now.getFullYear();
    let years = PopulateData.generateData(1920, currentYear, "desc");
    let days = PopulateData.generateData(1, 31);
    let months = PopulateData.generateData(0, 11);
    this.setState({
      dateOfBirthData: {
        years: years,
        months: months,
        days: days
      }
    });
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea" rows={5}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div>
          <label className={s.labelText}>{label}</label>
        </div>
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlEmail = ({ input, label, type, meta: { touched, error }, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div>
          <label className={s.labelText}>{label}</label>
        </div>
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={disabled} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlCurrency = ({ input, label, type, meta: { touched, error }, className, country }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.margintop15}>
        <InputGroup>
          <InputGroup.Addon className={s.addonStyle}>
            {country}
          </InputGroup.Addon>
          <FormControl {...input} placeholder={label} type={type} className={className} />
        </InputGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCountryChange(e, selectedData) {
    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });
  }

  render() {

    const { error, handleSubmit, submitting, initialValues, siteSettingStatus } = this.props;
    const { formatMessage } = this.props.intl;
    const { profilePictureData: { loading, userAccount }, doRemoveProfilePicture, profilePhotoLoading } = this.props;
    const { country, countryCode } = this.state;

    let isPhoneStatus = siteSettingStatus && siteSettingStatus.phoneNumberStatus == 1 ? true : false,
      userType = initialValues.userType;

    const title = <h3>{formatMessage(messages.RequiredDetails)}</h3>;
    return (
      <div className={cx('inputFocusColor', s.inputMainSection)}>
        <h1 className={s.myProfileTitle}><FormattedMessage {...messages.myProfile} /></h1>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <div header={title}>
          <Form onSubmit={handleSubmit(submit)}>
            <FormGroup className={cx(s.formGroup, s.firstNameInput, s.btnPadding, s.firstNamePadding)}>
              <Field name="firstName"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.firstName)+' '+formatMessage(messages.audienceAll)} 
                className={cx(s.formControlInput, s.backgroundTwo, 'inputProfile', 'CardFormInput')}
              />
            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.lastNamedInput, s.btnPadding)}>
              <Field name="lastName"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.lastName)+' '+formatMessage(messages.audiencePlaceHost)}
                className={cx(s.formControlInput, s.backgroundTwo, 'inputProfile', 'CardFormInput')}
              />
            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.btnPadding, 'emailDisable')}>
              <Field name="email"
                type="text"
                component={this.renderFormControlEmail}
                label={formatMessage(messages.email)}
                className={cx(s.formControlInput, s.backgroundEmail, 'inputEmailImg', 'CardFormInput')}
                disabled={true}
              />
            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.btnPadding)}>
              <Field name="zipcode"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.zipCodeLabel)+' '+formatMessage(messages.guestPlaceNearYou)}
                className={cx(s.formControlInput, s.backgroundThree, 'inputLocation', 'CardFormInput')}
              />
            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.btnPadding)}>
            <label  className={s.labelText}>{formatMessage(messages.phoneNumber)+' '+formatMessage(messages.audienceHostBooking)}</label>
              {!isPhoneStatus && <div className={s.widthredcd}>
                <CountryList
                  input={
                    {
                      name: 'countryCode',
                      onChange: this.handleChange,
                      value: countryCode,
                    }
                  }
                  className={cx(s.formControlSelect)}
                  dialCode={false}
                  getSelected={this.handleCountryChange}
                  formName={'EditProfileForm'}
                />
                <Field
                  name="phoneNumber"
                  type="text"
                  component={this.renderFormControlCurrency}
                  label={formatMessage(messages.phoneNumber)}
                  className={cx(s.formControlInput, s.backgroundThree, 'inputPhone', 'CardFormInput')}
                  onChange={this.handleChange}
                  country={country}
                />
              </div>}
              {
                isPhoneStatus && <PhoneVerificationModal />
              }
              <p className={s.labelText}>{formatMessage(messages.phoneNumberInfo)}</p>
            </FormGroup>
            {userType === 1 && <FormGroup className={cx(s.formGroup, s.btnPadding)}>
              <Field name="companyName"
                type="text"
                component={this.renderFormControl}
                label={formatMessage(messages.companyName)} 
                className={cx(s.formControlInput, s.backgroundCompany, 'inputCompany', 'CardFormInput')}
              />
            </FormGroup>}
            {/* <FormGroup className={cx(s.formGroup, s.btnPadding)}>
              <Field name="preferredLanguage"
                type="hidden"
                value={'sv-SV'}
                component={this.renderFormControl}
                label={formatMessage(messages.preferredLanguage)}
                className={cx(s.formControlInput, s.commonBorder)}
              />
            </FormGroup> */}
            <FormGroup className={cx(s.formGroup, s.btnPadding)}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
                  <div className={s.profileImg}>
                    <div className={'loaderSection'}>
                      <Loader show={profilePhotoLoading} type={"page"}>
                        <ProfilePicture />
                        {
                          userAccount && userAccount.picture != null && <a className={s.trashIcon} href="javascript:void(0);" onClick={() => doRemoveProfilePicture(userAccount.picture)}>
                            <FontAwesome.FaTrash />
                          </a>
                        }
                      </Loader>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className={s.centerFlex}>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.fullWidth, s.dropZoneHeight, 'signUpDroupZone')}>
                      <DropZone show={true} data={userAccount} placeHolder={formatMessage(messages.uploadProfilePlaceHolder)}>
                      </DropZone>
                    </Col>
                  </div>
                </Col>
                <p className={cx(s.textMuted, s.spaceTop1, s.btnPadding, s.profileUploadText)}>
                  {formatMessage(messages.profilePhotoInfo)}
                </p>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <div className={s.btnPadding}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop3}>
                    <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting}>
                      {formatMessage(messages.save)}
                    </Button>
                  </Col>
                </div>
              </Row>
            </FormGroup>
          </Form>
        </div>
      </div >
    )
  }

}
EditProfileForm = reduxForm({
  form: 'EditProfileForm',
  validate,
})(EditProfileForm);
const selector = formValueSelector('EditProfileForm');

const mapState = (state) => ({
  initialValues: state.account.data,
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
  siteSettingStatus: state.siteSettings.data,
  phoneNumber: selector(state, 'phoneNumber'),
  profilePhotoLoading: state.account.profilePhotoLoading
});
const mapDispatch = {
  doRemoveProfilePicture,
  change
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
      query {
          userAccount {
              picture
          }
      }
    `, {
      name: 'profilePictureData',
      options: {
        ssr: false
      }
    }),
  graphql(gql`
      query getCountries {
          getCountries{
              id
              countryCode
              countryName
              isEnable
              dialCode
          }
      }
  `, {
      options: {
        ssr: false,
        fetchPolicy: 'network-only'
      }
    })
)(EditProfileForm);