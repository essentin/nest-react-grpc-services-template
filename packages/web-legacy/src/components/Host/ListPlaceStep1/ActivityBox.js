// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm, change, FieldArray, formValueSelector } from 'redux-form';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Helper
import { getCurrencySymbol } from '../../../helpers/currencyConvertion';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Collapse,
  InputGroup
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import * as FontAwesome from 'react-icons/lib/fa';

class ActivityBox extends Component {
  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func
  };
  static defaultProps = {
    categories: [],
    category: '',
    categoryTitle: '',
    isActive: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isReadMore: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.renderActivityBox = this.renderActivityBox.bind(this);
  }

  async handleToggle(fieldName, index, typeId) {
    const { change, activityData } = this.props;

    let data = false;
    if (activityData != undefined) {
      data = !activityData[index]['isSelected'];
    }

    await change('ListPlaceStep3', `activity[${index}].isSelected`, data);
    await change('ListPlaceStep3', `activity[${index}].activityType`, typeId);

  }

  renderFormControlPrefix = ({ input, label, type, meta: { touched, error }, className, isPrefix, prefixLabel }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('activitiAddon', 'requriedBorderLeftAddon')}>
        <InputGroup>
          {
            isPrefix && <InputGroup.Addon className={s.prefixIcon}>{prefixLabel}</InputGroup.Addon>
          }
          <FormControl {...input} placeholder={label} type={type} className={className} maxLength={6} />
          {
            !isPrefix && <InputGroup.Addon className={s.prefixIconSmall}>{prefixLabel}</InputGroup.Addon>
          }
        </InputGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  normalizeBoolean(value) {
    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return value;
};

  renderActivityBox = ({ fields, meta: { error, submitFailed }, className }) => {
    const { activityType, activityData, currency, currentLocale } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row className={'customRatioButton'}>
        {
          activityType && activityType.length > 0 && activityType.map((item, index) => {

            if (item.isEnable == 1 && item.id === 2) {
              return (
                <Col lg={4} md={4} sm={12} xs={12} key={index}>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <div className={cx(s.occasionContainer)}>
                        <div>
                          <p className={s.occasionContainerTitle}>{item.name}</p>
                        </div>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, { [s.disableOccasions]: activityData && activityData[index] && !activityData[index]['isSelected'] })}
                          onClick={(e) => this.handleToggle(item.name, index, item.id)}>
                          {activityData && activityData.length > 0 && activityData[index] && activityData[index]['isSelected'] ? formatMessage(messages.selected) : formatMessage(messages.select)}
                          {
                            activityData && activityData.length > 0 && activityData[index] && activityData[index]['isSelected']
                          }
                        </Button>

                        {<Collapse in={activityData && activityData.length > 0 && activityData[index] && activityData[index]['isSelected']} className={s.subMenu} unmountOnExit>
                          <div>
                            <div className={s.occasionContent}>
                              <hr className={cx(s.space1, s.spaceTop4)} />
                              <h3 className={cx(s.landingContentTitle, s.pricingTop)}>
                                <FormattedMessage {...messages.tabPricing} />
                              </h3>
                              <FormGroup className={cx(s.formGroup, s.space3, s.spaceTop3, s.pricingMarginTop)}>
                                <ControlLabel className={cx(s.occasionLabel, s.marginBottomPricing)}>
                                  {item.id == '3'
                                    ?
                                    <FormattedMessage {...messages.hourlyRate} />
                                    :
                                    <FormattedMessage {...messages.dailyRate} />
                                  }
                                </ControlLabel>
                                <span className={s.hourlyText}>
                                  {item.id == '3'
                                    ?
                                    <FormattedMessage {...messages.hourlyRateDesc} />
                                    :
                                    <FormattedMessage {...messages.dailyRateDesc} />
                                  }
                                </span>
                                <Field
                                  name={`activity[${index}].basePrice`}
                                  component={this.renderFormControlPrefix}
                                  label={'eg: 75'}
                                  isPrefix
                                  prefixLabel={getCurrencySymbol(currency, currentLocale)}
                                  className={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.noZIndex, s.occasionsInput)}
                                />
                              </FormGroup>
                              {item.id == '3' && <FormGroup className={cx(s.formGroup, s.space3, s.pricingMarginTop)}>
                                <ControlLabel className={cx(s.occasionLabel, s.marginBottomPricing)}>
                                  <FormattedMessage {...messages.minimumHours} />
                                </ControlLabel>
                                <span className={s.hourlyText}>
                                  <FormattedMessage {...messages.minimumHoursDesc} />
                                </span>
                                <Field
                                  name={`activity[${index}].minHour`}
                                  component={this.renderFormControlPrefix}
                                  label={'eg: 4'}
                                  isPrefix
                                  prefixLabel={<FontAwesome.FaClockO />}
                                  className={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.noZIndex, s.occasionsInput)}
                                />
                              </FormGroup>}
                              {/* {item.id == '3' && <FormGroup className={cx(s.formGroup, s.space3, s.pricingMarginTop)}>
                                <ControlLabel className={cx(s.occasionLabel, s.marginBottomPricing)}>
                                  <FormattedMessage {...messages.hoursDiscountLabel} />
                                </ControlLabel>
                                <span className={s.hourlyText}>
                                  <FormattedMessage {...messages.hoursDiscountLabelDesc} />
                                </span>
                                <Field
                                  name={`activity[${index}].discount`}
                                  component={this.renderFormControlPrefix}
                                  label={'Optional'}
                                  prefixLabel={'% OFF'}
                                  className={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.noZIndex, s.occasionsInput, s.requiedBorder)}
                                />
                              </FormGroup>} */}
                              <FormGroup className={cx(s.formGroup, s.space3, s.spaceTop3, s.pricingMarginTop)}>
                                <ControlLabel className={cx(s.occasionLabel, s.marginBottomPricing)}>
                                  <FormattedMessage {...messages.cleaningFee} />
                                </ControlLabel>
                                <span className={s.hourlyText}>
                                  <FormattedMessage {...messages.cleaningFeeDesc} />
                                </span>
                                <div>
                                  <label className={cx(s.landingLabel, s.displayInlineblock, s.blockTab)}>
                                    <span>
                                      <Field name={`activity[${index}].isCleaningIncluded`}
                                        component="input" type="radio" value={true} normalize={this.normalizeBoolean}
                                      />
                                    </span>
                                    <span className={cx(s.fontSize2, s.vtrMiddle, s.cancelPolicyText)}>
                                      <FormattedMessage {...messages.includeHourRate} />
                                    </span>
                                  </label>
                                  <label className={cx(s.landingLabel, s.displayInlineblock, s.blockTab)}>
                                    <span>
                                      <Field name={`activity[${index}].isCleaningIncluded`}
                                        component="input" type="radio" value={false} normalize={this.normalizeBoolean}
                                      />
                                    </span>
                                    <span className={cx(s.fontSize2, s.vtrMiddle, s.cancelPolicyText)}>
                                      <FormattedMessage {...messages.additionalFee} />
                                    </span>
                                  </label>
                                </div>
                                {activityData && activityData.length > 0 && activityData[index] && !activityData[index]['isCleaningIncluded'] && <Field
                                  name={`activity[${index}].cleaningFee`}
                                  component={this.renderFormControlPrefix}
                                  label={'eg: 75'}
                                  isPrefix
                                  prefixLabel={getCurrencySymbol(currency, currentLocale)}
                                  className={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.noZIndex, s.occasionsInput)}
                                />}
                              </FormGroup>
                              <FormGroup className={cx(s.formGroup, s.space3, s.spaceTop2)}>
                                <ControlLabel className={cx(s.occasionLabel, s.marginBottomPricing)}>
                                  <FormattedMessage {...messages.capacityLabel} />
                                </ControlLabel>
                                <span className={s.hourlyText}>
                                  <FormattedMessage {...messages.maximumGuest} />
                                </span>
                                <Field
                                  name={`activity[${index}].maxGuest`}
                                  component={this.renderFormControlPrefix}
                                  label={'eg: 4'}
                                  isPrefix
                                  prefixLabel={<FontAwesome.FaUser />}
                                  className={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.noZIndex, s.occasionsInput)}
                                />
                              </FormGroup>
                            </div>
                          </div>
                        </Collapse>}
                      </div>
                    </Col>
                  </Row>
                </Col>
              )
            }
          })
        }
      </Row>
    );
  }

  render() {
    const { fieldName } = this.props;
    return (
      <div>
        <FieldArray
          name={fieldName}
          component={this.renderActivityBox}
        />
      </div>
    );
  }
}

const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name
const mapState = (state) => ({
  listingFields: state.listingFields.data,
  isListingLoader: state.loader.updateListing,
  activityData: selector(state, 'activity'),
  currency: selector(state, 'currency'),
  currentLocale: state.intl.locale
});

const mapDispatch = {
  change
};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ActivityBox)));
