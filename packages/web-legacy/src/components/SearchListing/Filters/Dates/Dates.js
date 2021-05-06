import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dates.css';
import { Button, Col, Row, FormControl } from 'react-bootstrap';
import cx from 'classnames';
import moment from 'moment';
import MdClear from 'react-icons/lib/md/clear';
import Select, { components } from 'react-select';

// Redux
import { connect } from 'react-redux';

// Redux form
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from 'redux-form';

// Locale
import messages from '../../../../locale/messages';

// Components
// import DateRange from '../../DateRange';
import SingleDateRange from '../../SingleDateRange';

// Submit Action
import submit from '../../SearchForm/submit';

import { setPersonalizedValues } from '../../../../actions/personalized';
import { generateTimes } from '../../../../helpers/timeHelper';

//Images
import DateIcon from '../../../../../public/NewIcon/calendar.svg';
import CrossIcon from '../../../../../public/NewIcon/cross.svg';
class Dates extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    smallDevice: false,
    verySmallDevice: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { locale } = this.props.intl;
    document.addEventListener('mousedown', this.handleClickOutside);
    moment.locale(locale);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      change,
      submitForm,
      personalized,
      setPersonalizedValues,
      dates,
    } = this.props;

    let endDate;
    if (personalized && personalized.startDate) {
      endDate = moment(personalized.startDate).add('days', 1).format("YYYY-MM-DD");
      setPersonalizedValues({ name: 'endDate', value: endDate });
      setPersonalizedValues({ name: 'singleDate', value: true });
      setPersonalizedValues({ name: 'showClearFilter', value: true });
      change('SearchForm', 'singleDate', true);
      change('dates', `'${moment(personalized.startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`)
    }
    // else {
    //   setPersonalizedValues({ name: 'singleDate', value: false });
    //   change('SearchForm', 'singleDate', false);
    // }

    await change('currentPage', 1);
    submitForm('SearchForm');
    handleTabToggle('dates', !isExpand);
  }

  handleReset() {
    const { change, setPersonalizedValues } = this.props;
    change('dates', null);
    setPersonalizedValues({ name: 'startDate', value: null });
    setPersonalizedValues({ name: 'endDate', value: null });
    setPersonalizedValues({ name: 'singleDate', value: null });
    change('SearchForm', 'singleDate', null);

    // setPersonalizedValues({ name: 'singleDate', value: false });
    // change('SearchForm', 'singleDate', false);

  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      change,
      submitForm,
      personalized,
      setPersonalizedValues,
    } = this.props;
    let endDate;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (personalized && personalized.startDate) {
        endDate = moment(personalized.startDate)
          .add('days', 1)
          .format('YYYY-MM-DD');
        setPersonalizedValues({ name: 'endDate', value: endDate });
        setPersonalizedValues({ name: 'singleDate', value: true });
        change('SearchForm', 'singleDate', true);
        change(
          'dates',
          `'${moment(personalized.startDate).format(
            'YYYY-MM-DD',
          )}' AND '${moment(endDate).format('YYYY-MM-DD')}'`,
        );
      }

      change('currentPage', 1);
      submitForm('SearchForm');
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('dates', !isExpand);
      }
    }
  }

  renderDateRange = ({
    input,
    label,
    meta: { touched, error },
    className,
    formName,
  }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change, smallDevice, verySmallDevice } = this.props;

    return (
      <div
        className={cx('searchFilter', s.space4, {
          [s.spaceTop4]: smallDevice == true,
        })}
      >
        <SingleDateRange
          {...input}
          formName={formName}
          smallDevice={smallDevice}
          verySmallDevice={verySmallDevice}
        />
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
            //color = '#22CE6E'; // Green
            if (isSelected) {
              color = '#FFF';
              backgroundColor = '#f56e9f';
            }
          } else {
            // color = '#EC5252'; // Red
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
          label={'Single select'}
          isSearchable={false}
          maxMenuHeight={150}
          styles={colourStyles}
          className={'time-select'}
          classNamePrefix={'time-select-list'}
        />
      </div>
    );
  }

  render() {
    const {
      className,
      handleTabToggle,
      isExpand,
      personalized,
      smallDevice,
      dates,
      startTime,
      endTime,
      change,
      singleDate
    } = this.props;
    const { formatMessage } = this.props.intl;
    // let startTimeLookup = generateTimes(360, 1410);
    // let endTimeLookup = generateTimes(390, 360);

    let buttonLabel = isExpand ? formatMessage(messages.checkIn) : formatMessage(messages.dates);
    let isActive = false;

    if (personalized) {
      if (personalized.startDate) {
        buttonLabel = moment(personalized.startDate).format('MMM D');
        isActive = true;
      }
    }

    if (false) {
      if (personalized.startDate && !personalized.endDate) {
        buttonLabel = moment(personalized.startDate).format('MMM D') + ' - ' + formatMessage(messages.checkOut);
        isActive = true;
        if (personalized.singleDate) {
          buttonLabel = moment(personalized.startDate).format('MMM D');
        }
      } else if (!personalized.startDate && personalized.endDate) {
        buttonLabel = formatMessage(messages.checkIn) + ' - ' + moment(personalized.endDate).format('MMM D');
        isActive = true;
      } else if (personalized.startDate && personalized.endDate) {
        if (personalized.startDate == personalized.endDate) {
          buttonLabel = moment(personalized.startDate).format('MMM D');
        } else if (personalized.singleDate) {
          buttonLabel = moment(personalized.startDate).format('MMM D');
        } else {
          buttonLabel = moment(personalized.startDate).format('MMM D') + ' - ' + moment(personalized.endDate).format('MMM D');
        }
        isActive = true;
      }
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              { [s.btnSecondary]: isExpand === true || dates },
              s.btn,
              s.btnFontsize,
              s.responsiveFontsize,
              s.searchBtn,
              s.btnDate,
              s.btnWidthMobile,
              s.searchBtnHome
            )}
            onClick={() => handleTabToggle('dates', !isExpand)}
          >
            {
              !isExpand &&
              <img src={DateIcon} />
            }
            {
              isExpand &&
              <img src={CrossIcon} />
            }
          </Button>
        </div>
        {isExpand && (
          <div
            className={cx(s.searchFilterPopover, {
              [s.searchFilterPopoverFull]: smallDevice == true,
            })}
            ref={this.setWrapperRef}
          >
            <div
              className={cx(
                s.searchFilterPopoverContent,
                s.searchFilterPopoverContentDate,'searchDateNewDesign',
              )}
            >
              <div
                className={cx(
                  'visible-xs visible-sm',
                  s.searchFilterPopoverHeader,
                )}
              >
                <div className={cx(s.displayTable)}>
                  <div
                    className={cx(
                      'text-left',
                      s.displayTableCell,
                      s.searchFilterCloseIcon,
                    )}
                  >
                    <span onClick={this.handleSubmit}>
                      <MdClear />
                    </span>
                  </div>
                  <div className={cx('text-right', s.displayTableCell)}>
                    {personalized && personalized.startDate && (
                      <Button
                        bsStyle="link"
                        className={cx(s.btnLink)}
                        onClick={this.handleReset}
                      >
                        <FormattedMessage {...messages.clear} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className={s.dateSection}>
                <Field
                  name="dates"
                  component={this.renderDateRange}
                  formName={'SearchForm'}
                  smallDevice={smallDevice}
                />
              </div>
              <div className={s.timeSection}>
                <div className={cx(s.space2, s.textAignCenter)}>
                  <span className={cx(s.fontWeight, s.dateText, 'dateTextCaps')}>
                    {personalized && personalized.startDate && moment(personalized.startDate).format('dddd, MMM DD')}
                  </span>
                </div>
                {/* <Row>
                  <Col lg={6} md={6} sm={6} xs={6} className={s.space4}>
                    <div>
                      <p className={s.fontWeight}>
                        <FormattedMessage {...messages.startTime} />:
                      </p>
                      <div>
                        <div className={'inputFocusColor'}>
                          <Field
                            name={`startTime`}
                            component={this.renderSelect}
                            className={cx(s.noMargin, s.calenderArrowPosition)}
                            onChange={(e) => {
                              if (e.value >= endTime.value) {
                                let endValue = endTimeLookup.find(
                                  (o) =>
                                    o.value ==
                                    (e.value < 23.5 ? e.value + 0.5 : 0),
                                );
                                change('endTime', endValue);
                              }
                            }}
                            options={startTimeLookup}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6} className={s.space4}>
                    <div>
                      <p className={s.fontWeight}>
                        <FormattedMessage {...messages.endTime} />:
                      </p>
                      <div>
                        <div className={'inputFocusColor'}>
                          <Field
                            name={`endTime`}
                            component={this.renderSelect}
                            className={cx(s.noMargin, s.calenderArrowPosition)}
                            options={endTimeLookup.filter(
                              (o) =>
                                o.isNextDay === true ||
                                o.value > startTime.value,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row> */}
                <div
                  className={cx(s.searchFilterPopoverFooter, s.displayTable)}
                >
                  <div
                    className={cx('hidden-xs hidden-sm', s.displayTableCell)}
                  >
                    {personalized && personalized.startDate && (
                      <Button
                        bsStyle="link"
                        className={cx(s.btnLink)}
                        onClick={this.handleReset}
                      >
                        <FormattedMessage {...messages.clear} />
                      </Button>
                    )}
                  </div>
                  <div className={cx(s.displayTableCell, s.applyBtnDesktop)}>
                    <Button
                      bsStyle="link"
                      className={cx(s.btnLink, s.applyBtn, 'hidden-xs')}
                      onClick={this.handleSubmit}
                    >
                      <FormattedMessage {...messages.apply} />
                    </Button>
                    <Col xs={12} className={cx(s.noPadding, 'visible-xs')}>
                      <Button
                        className={cx(s.btn, s.applyBtn)}
                        onClick={this.handleSubmit}
                      >
                        <FormattedMessage {...messages.apply} />
                      </Button>
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Dates = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Dates);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  personalized: state.personalized,
  dates: selector(state, 'dates'),
  singleDate: selector(state, 'singleDate'),
  startTime: selector(state, 'startTime'),
  endTime: selector(state, 'endTime'),
});

const mapDispatch = {
  change,
  setPersonalizedValues,
  submitForm,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dates)));