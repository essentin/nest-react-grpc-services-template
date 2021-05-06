import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, change } from 'redux-form';
import Select, { components } from 'react-select';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import { Row, Col, FormGroup } from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Components
import SingleDate from '../SingleDate';

// Helpers
import { generateTimes } from '../../../helpers/formatTimes';
import { getTimesLookup } from '../../../actions/Listing/getTimesLookup';
import { getEndTimesLookup } from '../../../actions/Listing/getEndTimesLookup';

// Locale
import messages from '../../../locale/messages';

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>{children}</components.SingleValue>
);

class ExtendDaysField extends Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    listId: PropTypes.number,
  };

  static defaultProps = {
    lookupIsLoading: false,
    lookupIndex: 0,
    listId: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      startTimeLookup: [],
      endTimeLookup: [],
      setFocus: false
    };

    this.renderSelect = this.renderSelect.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSetFocus = this.handleSetFocus.bind(this);
  }

  handleSetFocus(setFocus) {
    this.setState({ setFocus });
  }
  componentDidMount() {
    let startTimeLookup = generateTimes(360, 1410);
    let endTimeLookup = generateTimes(360, 360);

    this.setState({
      startTimeLookup,
      endTimeLookup,
    });
  }

  renderSelect({ input, label, options, index }) {
    const { lookupIsLoading, lookupIndex } = this.props;
    const colourStyles = {
      option: (styles, { data, isDisabled, isSelected }) => {
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
      <div>
        <Select
          {...input}
          options={options}
          components={{ SingleValue }}
          autoBlur
          onBlur={null}
          placeholder={label}
          className={'time-select'}
          label={'Single select'}
          maxMenuHeight={150}
          isSearchable={false}
          styles={colourStyles}
          isDisabled={lookupIsLoading && lookupIndex === index}
          isLoading={lookupIsLoading && lookupIndex === index}
          isOptionDisabled={(option) =>
            option.disabled === true || option.isAvailable !== true
          }
          classNamePrefix={'time-select-list'}
        />
      </div>
    );
  }


  renderDate = ({ input, meta: { touched, error }, index }) => {
    const { formatMessage } = this.props.intl;
    const { blockedDates, maxDaysNotice, listId, activityType, bookedDate, blockedDays } = this.props;
    return (
        <div className={cx(s.starSize, 'calendarBorderBottom', 'calendarNoPaddingRight', 'calendarNoPaddingLeft', 'calendarSection')}>
            {touched && error && (
                <span className={s.errorMessage}>{formatMessage(error)}</span>
            )}
                <SingleDate
                    listId={listId}
                    formName={'BookingForm'}
                    name={input.name}
                    maxDaysNotice={maxDaysNotice}
                    index={index}
                    blockedDates={blockedDates}
                    activityType={activityType}
                    placeholder={formatMessage(messages.when)}
                    blockedDays={blockedDays}
                />
        </div>
    );
};

  renderTimeRange = ({ fields, setFocus }) => {
    const { formatMessage } = this.props.intl;
    const { change, bookedDate } = this.props;
    return (
      <div>
        {fields.map((extendDay, index) => {
          return (
            <div key={index}>
              <FormGroup className={s.noMargin}>
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div>
                        <Field
                          name={`${extendDay}.date`}
                          index={index}
                          setFocus={setFocus}
                          component={this.renderDate}
                          bookedDate={bookedDate}
                          // className={cx(
                          //   'viewListingDate',
                          //   s.formControlInput,
                          //   s.jumboSelect,
                          //   s.formControlInputMaxWidth,
                          // )}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup
                  className={cx(s.noMargin, s.timeZoneNoTopBottomPadding)}
                >
                  <Row>
                    <Col
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      className={cx(s.startPaddingRight)}
                    >
                      <div>
                        <div
                          className={cx(
                            'inputFocusColor',
                            'viewListingTimeZone',
                          )}
                        >
                          <Field
                            name={`${extendDay}.startTimeObj`}
                            component={this.renderSelect}
                            options={fields.get(index).startLookup}
                            index={index}
                            label={formatMessage(messages.startTime)}
                            className={cx(s.noMargin, s.calenderArrowPosition)}
                            onChange={(e) => {
                              change(
                                'BookingForm',
                                `${extendDay}.startTime`,
                                e.value,
                              );
                              this.handleTimeChange(
                                fields.get(index).date,
                                e.value,
                                fields.get(index).endLookup,
                                index,
                              );
                            }}
                          ></Field>
                        </div>
                      </div>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      className={cx(s.startPaddingLeft)}
                    >
                      <div>
                        <div
                          className={cx(
                            'inputFocusColor',
                            'endTimeNoBorder',
                            'viewListingTimeZone',
                          )}
                        >
                          <Field
                            name={`${extendDay}.endTimeObj`}
                            label={formatMessage(messages.endTime)}
                            component={this.renderSelect}
                            options={fields.get(index).endLookup}
                            index={index}
                            className={cx(
                              s.formControlSelect,
                              s.jumboSelect,
                              s.noMargin,
                              s.calenderArrowPosition,
                            )}
                            onChange={(e) => {
                              change(
                                'BookingForm',
                                `${extendDay}.endTime`,
                                e.value,
                              );
                            }}
                          ></Field>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </FormGroup>
            </div>
          );
        })}
      </div>
    );
  };

  async handleTimeChange(date, startTime, endLookup, index) {
    const { getEndTimesLookup, listId } = this.props;
    if (date) {
      await getEndTimesLookup(listId, date, startTime, endLookup, index);
    }
  }

  render() {
    const { setFocus } = this.state;
    return (
      <div>
        <FieldArray name="extendDay" setFocus={setFocus} component={this.renderTimeRange} />
      </div>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('BookingForm'); // <-- same as form name

const mapState = (state) => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  extendDay: selector(state, 'extendDay'),
  account: state.account.data,
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
  bookingLoading: state.book.bookingLoading,
  lookupIsLoading: state.viewListing.lookupIsLoading,
  lookupIndex: state.viewListing.lookupIndex,
});

const mapDispatch = {
  change,
  getTimesLookup,
  getEndTimesLookup,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ExtendDaysField)),
);