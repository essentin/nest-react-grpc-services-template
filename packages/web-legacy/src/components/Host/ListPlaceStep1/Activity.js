// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm } from 'redux-form';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Helpers
import validateStep3 from './validateStep3';
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

import ActivityBox from './ActivityBox';
import updateStep3 from './updateStep3';
import { isEmpty } from '../../../helpers/mergeObjects';

class Activity extends Component {
  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      activityType: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const { submit } = this.props;
    const { step3Errors } = this.props;
    if (isEmpty(step3Errors)) {
      await submit('ListPlaceStep3');
    } else {
      toastr.error('Error!', 'It seems you have missed required fields. Please fill them.')
    }
  }

  componentDidMount() {
    const { valid, activityTypeList, formErrors, change, baseCurrency } = this.props;

    change('currency', baseCurrency)

    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (activityTypeList != undefined && activityTypeList.results.length > 0) {
      this.setState({
        activityType: activityTypeList.results,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activityTypeList, formErrors } = nextProps;
    if (activityTypeList != undefined && activityTypeList.results.length > 0) {
      this.setState({
        activityType: activityTypeList.results,
      });
    }
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
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
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, availableCurrencies } = this.props;
    const { isDisabled, activityType } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.whichActivity} />
              </h3>
              <div className={cx(s.spaceTop4, s.space5)}>
                <p className={cx(s.fontSize2, s.textPrimaryColor, s.lineHeight1)}>
                  <FormattedMessage {...messages.whichActivityDesc} />
                </p>
                <p className={cx(s.fontSize2, s.textPrimaryColor, s.lineHeight1)}>
                  <FormattedMessage {...messages.tipLabel} />: <span className={s.fontWeight}>
                    <FormattedMessage {...messages.whichActivityDesc1} />
                  </span>
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  {/* <FormGroup className={s.space5}>
                    <ControlLabel className={cx(s.fontSize3, s.fontWeight)}>
                      <FormattedMessage {...messages.currency} />
                    </ControlLabel>
                    <Field name="currency" component={this.renderFormControlSelect}
                      className={cx(s.formControlSelect, s.jumboSelect, 'slectDroupDownIcon', s.requiedBorder)} >
                      {
                        availableCurrencies.map((currency, key) => {
                          if (currency.isEnable === true) {
                            return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                          }
                        })
                      }
                    </Field>
                  </FormGroup> */}

                  <FormGroup className={cx(s.formGroup, s.paddingTop1)}>
                    <ActivityBox
                      activityType={activityType}
                      fieldName="activity"
                    />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button
                          className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)}
                          onClick={() => previousPage("calendar")}
                        >
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button
                          className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)}
                          disabled={isDisabled}
                          onClick={this.handleSubmit}
                        >
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
Activity = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Activity);

const mapState = (state) => ({
  activityTypeList: state.activityType.data,
  formErrors: state.form.ListPlaceStep3,
  availableCurrencies: state.currency.availableCurrencies,
  baseCurrency: state.currency.base,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Activity)));
