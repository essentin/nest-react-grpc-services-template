import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import {
  Field,
  reduxForm,
  formValueSelector,
  FieldArray,
  change,
} from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';

import s from './ListPlaceStep1.css';

import Switch from './Switch';

import messages from '../../../locale/messages';

import { generateTimes } from '../../../helpers/timeHelper';
import validateStep3 from './validateStep3';
import updateStep3 from './updateStep3';

import CloseIcon from '../../../../public/SiteIcons/x-1.png';

class Availability extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
    };
    this.changeSlot = this.changeSlot.bind(this);
  }

  componentDidMount() {
    const { formErrors } = this.props;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        if (formErrors.syncErrors.hasOwnProperty('spaceAvailability')) {
          this.setState({ isDisabled: true });
        } else {
          this.setState({ isDisabled: false });
        }
      } else {
        this.setState({ isDisabled: false });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { formErrors } = nextProps;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        if (formErrors.syncErrors.hasOwnProperty('spaceAvailability')) {
          this.setState({ isDisabled: true });
        } else {
          this.setState({ isDisabled: false });
        }
      } else {
        this.setState({ isDisabled: false });
      }
    }
  }

  async changeSlot(index, type) {
    const { change } = this.props;

    if (type) {
      await change(`spaceAvailability[${index}].timeSlot[${0}].startTime`, {
        label: '6:00AM',
        value: 6,
      });
      await change(`spaceAvailability[${index}].timeSlot[${0}].endTime`, {
        label: '6:30AM',
        value: 6.5,
      });
    } else {
      await change(`spaceAvailability[${index}].timeSlot`, []);
    }
  }

  renderSwitch = ({ input, label, meta: { touched, error }, index }) => {
    return (
      <div>
        <Switch {...input} index={index} defaultValue={input.value} />
      </div>
    );
  };

  renderSelect({ input, label, meta: { touched, error }, options }) {
    const colourStyles = {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        let backgroundColor = null;
        let color = '#1A1B1C';
        let textDecoration = isDisabled ? 'line-through' : 'unset';

        if (data.isBlocked === true) {
          if (data.isAvailable === true && !isDisabled) {
            if (isSelected) {
              color = '#FFF';
              backgroundColor = '#f56e9f';
            }
          } else {
            color = '#999';
            backgroundColor = '#CCC';
          }
        } else {
          if (isDisabled) {
            color = '#999';
          } else {
            if (isSelected) {
              color = '#FFF';
              backgroundColor = '#f56e9f';
            }
          }
        }

        return {
          ...styles,
          backgroundColor,
          color,
          textDecoration,
          outline: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        };
      },
    };
    return (
      <div className={'searchSelect'}>
        <Select
          {...input}
          options={options}
          autoBlur
          onBlur={null}
          placeholder={label}
          className={'time-select'}
          label={'Single select'}
          isSearchable={false}
          styles={colourStyles}
          isOptionDisabled={(option) => option.disabled == true}
          maxMenuHeight={150}
          classNamePrefix={'time-select-list'}
        />
      </div>
    );
  }

  renderTimeSlot = ({ fields, meta: { error, submitFailed }, indexValue }) => {
    const { spaceAvailability, change } = this.props;
    let startTimeLookup = generateTimes(360, 1410);
    let endTimeLookups = generateTimes(390, 360);
    let isAlreadyExist = false;

    return (
      <div>
        {fields.map((item, index) => {
          let nextStartTime, nextEndTime;
          let endTimeLookup =
            endTimeLookups &&
            endTimeLookups.filter(
              (o) =>
                o.isNextDay === true ||
                o.value >
                spaceAvailability[indexValue].timeSlot[index].startTime.value,
            );
          let hideLabel = true;
          if (
            spaceAvailability[indexValue] &&
            spaceAvailability[indexValue].timeSlot &&
            spaceAvailability[indexValue].timeSlot.length > 0
          ) {
            nextStartTime = endTimeLookup.find(
              (o) =>
                o.value ==
                (spaceAvailability[indexValue].timeSlot[index].endTime &&
                  spaceAvailability[indexValue].timeSlot[index].endTime.value +
                  0.5),
            );
            nextEndTime = endTimeLookup.find(
              (o) =>
                o.value ==
                (nextStartTime &&
                  (nextStartTime.value == 23.5
                    ? 0
                    : nextStartTime.value + 0.5)),
            );
            if (nextEndTime && nextEndTime.value > 0 && nextEndTime.value < 7) {
              hideLabel = false;
            }
            if (!nextEndTime) {
              hideLabel = false;
            }
            let modifiedLookupStart1 = startTimeLookup.findIndex(
              (o) =>
                index > 0 &&
                o.value ==
                spaceAvailability[indexValue].timeSlot[index - 1].startTime
                  .value,
            );
            let modifiedLookupStart2 = startTimeLookup.findIndex(
              (o) =>
                index > 0 &&
                o.value ==
                spaceAvailability[indexValue].timeSlot[index].startTime.value,
            );
            if (modifiedLookupStart1 > -1) {
              startTimeLookup[modifiedLookupStart1]['disabled'] = true;
            }
            if (modifiedLookupStart2 > -1) {
              startTimeLookup[modifiedLookupStart2]['disabled'] = true;
            }

            let modifiedLookupEnd1 = endTimeLookup.findIndex(
              (o) =>
                index > 0 &&
                o.value ==
                spaceAvailability[indexValue].timeSlot[index - 1].endTime
                  .value,
            );
            let modifiedLookupEnd2 = endTimeLookup.findIndex(
              (o) =>
                index > 0 &&
                o.value ==
                spaceAvailability[indexValue].timeSlot[index].endTime.value,
            );
            if (modifiedLookupEnd1 > -1) {
              endTimeLookup[modifiedLookupEnd1]['disabled'] = true;
            }
            if (modifiedLookupEnd2 > -1) {
              endTimeLookup[modifiedLookupEnd2]['disabled'] = true;
            }

            if (
              spaceAvailability[indexValue].timeSlot &&
              spaceAvailability[indexValue].timeSlot.length > 0
            ) {
              let checkAvailability = spaceAvailability[
                indexValue
              ].timeSlot.filter(
                (o) =>
                  spaceAvailability[indexValue].timeSlot[index].startTime &&
                  spaceAvailability[indexValue].timeSlot[index].endTime &&
                  ((o.startTime.value <=
                    spaceAvailability[indexValue].timeSlot[index].startTime
                      .value &&
                    o.endTime.value >
                    spaceAvailability[indexValue].timeSlot[index].startTime
                      .value) ||
                    (o.startTime.value <
                      spaceAvailability[indexValue].timeSlot[index].startTime
                        .value &&
                      o.endTime.value >
                      spaceAvailability[indexValue].timeSlot[index].startTime
                        .value) ||
                    (o.startTime.value ==
                      spaceAvailability[indexValue].timeSlot[index].startTime
                        .value &&
                      o.endTime.value ==
                      spaceAvailability[indexValue].timeSlot[index].endTime
                        .value)),
              );

              if (checkAvailability && checkAvailability.length == 1) {
              } else if (!isAlreadyExist) {
                // Already Exist
                isAlreadyExist = true;
              }
              isAlreadyExist
                ? change(`spaceAvailability[${indexValue}].isExist`, true)
                : change(`spaceAvailability[${indexValue}].isExist`, false);
            }
          }

          return (
            <div key={index}>
              <FormGroup className={cx(s.noMargin, s.positionRelative)}>
                <Row className={cx(s.noMargin)}>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={cx(s.noPadding, s.space1)}
                  >
                    <div>
                      <div className={cx(s.timeInline)}>
                        <Field
                          name={`[${item}].startTime`}
                          component={this.renderSelect}
                          index={index}
                          className={cx(s.noMargin, s.calenderArrowPosition)}
                          onChange={(e) => {
                            if (
                              e.value >=
                              spaceAvailability[indexValue].timeSlot[index]
                                .endTime.value
                            ) {
                              let endValue = endTimeLookup.find(
                                (o) =>
                                  o.value ==
                                  (e.value < 23.5 ? e.value + 0.5 : 0),
                              );
                              change(
                                `spaceAvailability[${indexValue}].timeSlot[${index}].endTime`,
                                endValue,
                              );
                            }
                          }}
                          options={startTimeLookup}
                        ></Field>
                      </div>
                      <div className={cx(s.timeInline)}>
                        <Field
                          name={`[${item}].endTime`}
                          component={this.renderSelect}
                          index={index}
                          className={cx(s.noMargin, s.calenderArrowPosition)}
                          onChange={(e) => {
                            // change(`spaceAvailability[${ indexValue }].timeSlot[${ index }].endTime`, e.value)
                          }}
                          options={endTimeLookup}
                        ></Field>
                      </div>
                    </div>
                  </Col>
                </Row>
                {fields.length > 1 && fields.length - 1 == index && (
                  <div>
                    <Button
                      bsStyle={'link'}
                      onClick={() => fields.remove(index)}
                      className={s.timeCloseBtn}
                    >
                      <img src={CloseIcon} alt="close" />
                    </Button>
                  </div>
                )}
              </FormGroup>
              <Row className={s.noMargin}>
                {hideLabel && fields.length - 1 == index && (
                  <Col
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    className={cx(s.space2, s.noPadding)}
                  >
                    <Button
                      bsStyle={'link'}
                      onClick={async () => {
                        fields.push({
                          startTime: nextStartTime,
                          endTime: nextEndTime,
                        });
                      }}
                      className={s.addLink}
                    >
                      <FormattedMessage {...messages.addHours} />
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          );
        })}
        {isAlreadyExist && (
          <span className={s.slotTime}>
            {' '}
            <FormattedMessage {...messages.timeSlotAvailable} />{' '}
          </span>
        )}
      </div>
    );
  };

  renderAvailabilityBox = ({
    fields,
    meta: { error, submitFailed },
    className,
  }) => {
    const { spaceOpeningTime, spaceAvailability, change } = this.props;
    let startTimeLookup = generateTimes(0, undefined, true);
    let endTimeLookups = generateTimes(30, 1440, true);
    endTimeLookups[endTimeLookups.length - 1].label = '23.59';
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {spaceAvailability &&
          spaceAvailability.length > 0 &&
          spaceAvailability.map((item, index) => {
            let endTimeLookup = endTimeLookups && endTimeLookups.filter(
              (o) => !spaceOpeningTime || !spaceOpeningTime[index] || !spaceOpeningTime[index].startTime || o.value > spaceOpeningTime[index].startTime.value,
            );
            return (
              <tr className={cx(s.tableText, s.space2)}>
                <td className={cx(s.noBorder, s.tableText)}>
                  <span
                    className={cx(
                      s.fontWeight,
                      s.fontSize3,
                      s.space3,
                      s.displayBlock,
                    )}
                  >
                    {messages[item.day] && <FormattedMessage {...messages[item.day]} />}
                    {!messages[item.day] && item.day}
                  </span>
                  <div>
                    <div className={cx(s.displayInlineblock, s.switchSection)}>
                      <FormGroup className={s.formGroup}>
                        <Field
                          name={`spaceAvailability[${index}].isOpen`}
                          component={this.renderSwitch}
                          index={index}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  {
                    item.isOpen && <div className={cx(s.displayInlineblock, s.radioBtnSection)}>
                      <label className={cx(s.landingLabel, s.displayInlineblock)}>
                        <span className={cx(s.fontWeight, s.vtrMiddle, s.cancelPolicyText, 'cancelPolicyTextRTL')}>
                          <FormattedMessage {...messages.openingTime} />
                        </span>
                      </label>

                      <div>
                        <FormGroup className={cx(s.noMargin, s.positionRelative)}>
                          <Row className={cx(s.noMargin)}>
                            <Col
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                              className={cx(s.noPadding, s.space1)}
                            >
                              <div>
                                <div className={cx(s.timeInline)}>
                                  <Field
                                    name={`spaceOpeningTime[${index}].startTime`}
                                    component={this.renderSelect}
                                    index={index}
                                    className={cx(s.noMargin, s.calenderArrowPosition)}
                                    onChange={(e) => {
                                      if (spaceOpeningTime && spaceOpeningTime[index] && spaceOpeningTime[index].endTime && e.value >= spaceOpeningTime[index].endTime.value) {
                                        let endValue = endTimeLookup.find((o) => o.value === (e.value + 0.5));
                                        change(
                                          `spaceOpeningTime[${index}].endTime`,
                                          endValue,
                                        );
                                      }
                                      change(`spaceOpeningTime[${index}].day`, item.day);
                                    }
                                    }
                                    options={startTimeLookup}
                                  ></Field>
                                </div>
                                <div className={cx(s.timeInline)}>
                                  <Field
                                    name={`spaceOpeningTime[${index}].endTime`}
                                    component={this.renderSelect}
                                    index={index}
                                    className={cx(s.noMargin, s.calenderArrowPosition)}
                                    onChange={(e) => {
                                      change(`spaceOpeningTime[${index}].day`, item.day);
                                    }}
                                    options={endTimeLookup}
                                  ></Field>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      </div>
                    </div>
                  }
                </td>
              </tr>
            );
          })}
      </div>
    );
  };

  render() {
    const { handleSubmit, previousPage, nextPage } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled } = this.state;

    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, 'customRatioButton')}>
          <Col xs={12} sm={12} md={8} lg={8} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.whatOperatingHour} />
              </h3>
              <div>
                <p className={s.subContent}>
                  <FormattedMessage {...messages.whatOperatingHourDesc1} />
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <table className={cx('table')}>
                    <tbody>
                      <FieldArray
                        name="spaceAvailability"
                        component={this.renderAvailabilityBox}
                      />
                    </tbody>
                  </table>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={s.noPadding}
                      >
                        <Button
                          className={cx(
                            s.button,
                            s.btnPrimaryBorder,
                            s.backNextBtn,
                            s.pullLeft,
                          )}
                          onClick={() => previousPage('home')}
                        >
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button
                          className={cx(
                            s.button,
                            s.btnPrimary,
                            s.backNextBtn,
                            s.noMarginRight,
                          )}
                          disabled={isDisabled}
                          onClick={() => nextPage('calendar')}
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

Availability = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Availability);

const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
  spaceAvailability: selector(state, 'spaceAvailability'),
  spaceOpeningTime: selector(state, 'spaceOpeningTime'),
  formErrors: state.form.ListPlaceStep3
});

const mapDispatch = {
  change
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Availability))
);