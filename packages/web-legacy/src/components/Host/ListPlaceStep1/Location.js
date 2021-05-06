// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, change } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { updateLocationStatus } from '../../../actions/getLocation';
import { updateListingMap } from '../../../actions/updateListingMap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Helpers
import validate from './validate';

// Internal Component
import CountryList from '../../CountryList/CountryList';
import Loader from '../../Loader/Loader';

import update from './update';

class Location extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    isLocationChosen: PropTypes.bool,
    previousPage: PropTypes.any,
    onSubmit: PropTypes.any,
    updateLocationStatus: PropTypes.any,
    nextPage: PropTypes.any,
    isExistingList: PropTypes.bool,
    updateListingMap: PropTypes.any,
    mapUpdateLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      hideSuggestInput: true,
    };
    this.renderCountryList = this.renderCountryList.bind(this);
  }

  componentWillMount() {
    const { isExistingList, isLocationChosen, change } = this.props;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    }
    change('country', 'SE');
  }

  componentWillReceiveProps(nextProps) {
    const { isExistingList, isLocationChosen } = nextProps;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    } else {
      this.setState({ hideSuggestInput: true });
    }
  }

  renderField = ({ input, label, type, meta: { touched, error, dirty } }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{formatMessage(error)}</span>}
        </div>
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }


  renderCountryList({ input, label, meta: { touched, error }, children, className }) {
    return <CountryList input={input} className={className} isFrom={'become-a-host'} />
  }

  renderLocationForm = () => {
    const { isExistingList, previousPage, updateListingMap, loading, mapUpdateLoading } = this.props;
    const { formatMessage } = this.props.intl;
    const { error, submitting, valid } = this.props;
    let isDisabled = true;
    if (valid) {
      isDisabled = false;
    }
    return (
      <div>
        <div className={s.landingMainContent}>
          <h3 className={s.landingContentTitle}>
            <FormattedMessage {...messages.whereLocated} />
          </h3>
          <div>
            <p className={s.subContent}>
              <FormattedMessage {...messages.whereLocatedTerms} />
            </p>
          </div>
          <Row>
            <Col xs={12} sm={5} md={4} lg={4} className={s.space3}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.country} />
                </ControlLabel>
                <Field name="country" component={this.renderCountryList}
                  className={cx(s.formControlSelect, s.jumboSelect,
                    s.formControlSelectLarge, s.requiedBorder, 'slectDroupDownIcon')} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10} md={8} lg={8} className={s.space3}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.street} />
                </ControlLabel>
                <Field
                  name="street"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput, s.requiedBorder)}
                  label={formatMessage(messages.street)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={5} md={4} lg={4} className={s.space3}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.buildingName} />
                </ControlLabel>
                <Field
                  name="buildingName"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput)}
                  label={formatMessage(messages.buildingName)}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={5} md={4} lg={4} className={s.space3}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.city} />
                </ControlLabel>
                <Field
                  name="city"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput, s.requiedBorder)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={5} md={4} lg={4} className={s.space3}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.zipcode} />
                </ControlLabel>
                <Field
                  name="zipcode"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput, s.requiedBorder)}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className={s.nextPosition}>
          <div className={s.nextBackButton}>
            <hr className={s.horizontalLineThrough} />
            <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                {isExistingList && <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("home")}>
                  <FormattedMessage {...messages.back} />
                </Button>}
                {
                  isExistingList && <Loader
                    type={"button"}
                    label={"Next"}
                    show={mapUpdateLoading}
                    disabled={isDisabled}
                    className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)}
                    handleClick={() => updateListingMap()}
                  />
                }
                {
                  !isExistingList && <Loader
                    type={"button"}
                    label={"Next"}
                    buttonType={"submit"}
                    show={loading}
                    disabled={error || submitting}
                    className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)}
                  />
                }
              </Col>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { error, handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <form onSubmit={handleSubmit}>
              {error && <strong>{formatMessage(error)}</strong>}
              {
                this.renderLocationForm()
              }
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Location = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Location);

const mapState = (state) => ({
  isLocationChosen: state.location.isLocationChosen,
  isExistingList: state.location.isExistingList,
  loading: state.loader.location,
  mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {
  updateLocationStatus,
  updateListingMap,
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Location)));
