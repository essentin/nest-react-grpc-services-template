import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { isInclusivelyAfterDay, SingleDatePicker } from 'react-dates';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import './SingleDate.css';

import { checkAvailability } from '../../../actions/checkAvailability';
import { getTimesLookup } from '../../../actions/Listing/getTimesLookup';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';

class SingleDate extends React.Component {
  static propTypes = {
    minimumNights: PropTypes.number,
    maximumNights: PropTypes.number,
    checkAvailability: PropTypes.func.isRequired,
    blockedDates: PropTypes.array.isRequired,
    listId: PropTypes.number.isRequired,
    formName: PropTypes.string.isRequired,
    maxDaysNotice: PropTypes.string.isRequired,
    listId: PropTypes.number
  };

  static defaultProps = {
    blockedDates: [],
    maxDaysNotice: 'available',
    listId: null
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      blockedDates: [],
      blockedDatesValues: [],
      data: null,
      focused: false,
      verySmallDevice: false
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);

  }

  async componentDidMount() {
    const { listId, formName, extendDay, index, blockedDates } = this.props;
    const { activityType, startDate, getTimesLookup, change, locale } = this.props;

    let isBrowser = typeof window !== 'undefined';
    const blockedDatesSet = new Set();
    moment.locale(locale);
    blockedDates.forEach(day => {
      if (day.calendarStatus != 'available') {
        blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
      }
    });

    this.setState({ blockedDatesSet });
    this.setState({ blockedDatesValues: blockedDates });

    if (formName == 'BookingForm') {
      if (activityType == '3') {
        if (extendDay[index] && extendDay[index].date) {
          this.setState({
            startDate: moment(extendDay[index].date),
            endDate: moment(extendDay[index].date),
            date: moment(extendDay[index].date)
          });
          await change(formName, 'bookedDate', extendDay[0].date);
        }
      } else {
        this.setState({
          date: startDate
        });
        if (startDate) {
          await change(formName, 'bookedDate', startDate);
          await change(formName, 'extendDay', [])
          await getTimesLookup(Number(listId), 0, startDate, formName);
        }
      }

      if (isBrowser) {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
      }

    }
  }

  async componentWillReceiveProps(nextProps) {
    const { listId, formName, name, extendDay, index, blockedDates } = nextProps;
    const { activityType, startDate, getTimesLookup } = nextProps;
    const { blockedDatesSet } = this.state;
    blockedDates.forEach(day => {
      if (day.calendarStatus != 'available') {
        blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
      }
    });

    this.setState({ blockedDatesSet });
    this.setState({ blockedDatesValues: blockedDates });

    if (formName == 'BookingForm') {
      if (activityType == '3') {
        if (extendDay[index] && extendDay[index].date) {
          this.setState({
            startDate: moment(extendDay[index].date),
            endDate: moment(extendDay[index].date),
            date: moment(extendDay[index].date)
          });
          await change(formName, 'bookedDate', extendDay[0].date);
        }
      } else {
        this.setState({
          date: startDate
        });

        if (startDate) {
          await change(formName, 'bookedDate', startDate);
          await change(formName, 'extendDay', [])
          await getTimesLookup(Number(listId), 0, startDate, formName);
        }

      }

    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(e) {
    let isBrowser = typeof window !== 'undefined';
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 360px)').matches : false;

    this.setState({ verySmallDevice });
  }

  async onDateChange(date) {
    const { listId, formName, name, checkTimeAvailability, change, maximumNights, convertStartTime, convertEndTime } = this.props;
    const { startDate, endDate, startTime, endTime, checkAvailability } = this.props;
    const { extendDay, index, getTimesLookup, activityType, closeToastar } = this.props;
    this.setState({ date });
    await change(formName, 'startDate', date);
    await change(formName, 'endDate', date);
    await change(formName, name, date);
    closeToastar('date');
    if (activityType == '3') {
      if (extendDay && extendDay.length > 0 && extendDay[index] && date) {
        await getTimesLookup(Number(listId), index, date, formName);

        if (index == '0') {
          await change(formName, 'bookedDate', date);
        }

      }
      await change(formName, 'singleDay', false);

    } else {
      await change(formName, 'singleDay', true);
      await change(formName, 'bookedDate', date);
    }
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  isDayBlocked(day) {
    const { blockedDatesSet } = this.state;
    const { blockedDays, locale } = this.props;
    if (blockedDatesSet && !(blockedDays && blockedDays.length > 0)) {
      return blockedDatesSet.has(moment(day).format('YYYY-MM-DD'));
    } else if (blockedDays && blockedDays.length > 0 && !blockedDatesSet) {
      return blockedDays.some(blockDay => (moment(day).locale('en-US').format('dddd') === blockDay.day) && !blockDay.isOpen);
    } else if (blockedDatesSet && (blockedDays && blockedDays.length > 0)) {
      return blockedDatesSet.has(moment(day).format('YYYY-MM-DD')) || blockedDays.some(blockDay => (moment(day).locale('en-US').format('dddd') === blockDay.day) && !blockDay.isOpen);
    } else {
      return null;
    }
  }

  render() {
    const { date, focused } = this.state;
    const { verySmallDevice } = this.state;
    const { placeholder } = this.props;
    let daySize = (verySmallDevice) ? 30 : undefined;

    let condition;
    const today = moment();
    let breakPoint;

    condition = day =>
      !isInclusivelyAfterDay(day, today) ||
      isInclusivelyAfterDay(day, breakPoint)

    return (
      <div>
        <SingleDatePicker
          numberOfMonths={1}
          displayFormat={"DD/MM/YYYY"}
          isOutsideRange={condition}
          hideKeyboardShortcutsPanel
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          placeholder={placeholder}
          showDefaultInputIcon={true}
          daySize={daySize}
          readOnly
          isDayBlocked={day => this.isDayBlocked(day)}
        />
      </div>
    );
  }
}

const selector = formValueSelector('BookingForm');


const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  locale: state.intl.locale,
  extendDay: selector(state, 'extendDay'),
  singleDay: selector(state, 'singleDay'),
  bookedDate: selector(state, 'bookedDate'),
  startDate: selector(state, 'startDate')
});

const mapDispatch = {
  change,
  checkAvailability,
  getTimesLookup
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SingleDate)));