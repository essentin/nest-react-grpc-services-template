import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';
import { change, reset, initialize } from 'redux-form';

// Compose
import { graphql, gql, compose } from 'react-apollo';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Toastr
import { toastr } from 'react-redux-toastr';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';


// External Component
import { DateUtils } from 'react-day-picker';

import {
  Button,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';

// Loader
import Loader from '../Loader';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./DayDragCalendar.css';
import c from './SaveCalendar.css';

// Locale
import messages from '../../locale/messages';

import AvailableDates from './AvailableDates';
import DateRange from './DateRange';

import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { getListBlockedDates } from '../../actions/Listing/getListBlockedDates';
import { manageListingSteps } from '../../actions/manageListingSteps';

//Images 
import CloseIcon from '../../../public/SiteIcons/x-1.png';
class SaveCalendar extends Component {

  static propTypes = {
    change: PropTypes.func,
    formName: PropTypes.string,
    selectedDays: PropTypes.array,
    start: PropTypes.any,
    end: PropTypes.any
  };

  static defaultProps = {
    selectedDays: [],
    start: undefined,
    end: undefined,
    formName: 'ListPlaceStep3',
    formNameValue: 'CalendarPrice',
    isCurrentStatus: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateRange: [],
      isLoading: false
    };
    this.chooseDates = this.chooseDates.bind(this);
  }

  componentDidMount() {
    this.setState({ isCurrentStatus: 2 });
  }

  componentWillReceiveProps(nextProps) {
    const { start, end, isStartDate, isEndDate } = nextProps;



    let dateRange = [], rangeStart, rangeEnd;

    if (start && !end) {
      rangeStart = new Date(start);
      dateRange.push(rangeStart);
    } else if (start && end) {
      rangeStart = new Date(start);
      rangeEnd = new Date(end);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRange.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < end) {

          dateRange.push(rangeStart);
          var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      }
    }
    this.setState({ dateRange });
  }



  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          placeholder={label}
          type={type}
          className={className}
          maxLength={3}
        />
      </div>
    )
  }

  renderDateRange = ({ input, label, meta: { touched, error }, formName, numberOfMonths, startDateName, endDateName, index, defaultStartDate, defaultEndDate, isCurrentStatus, resetCalendar }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;

    return (
      <div className={'saveCalenderDate'}>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <DateRange
          {...input}
          displayFormat={"YYYY-MM-DD"}
          minimumNights={0}
          formName={formName}
          numberOfMonths={numberOfMonths}
          index={index}
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          isCurrentStatus={isCurrentStatus}
          resetCalendar={resetCalendar}
        />
      </div>
    )
  }

  async handleSave() {
    const { change, formName, start, end, selectedDays } = this.props;
    const { resetCalendar, mutate, listId, getListingDataStep3, getListBlockedDates } = this.props;
    const { formatMessage } = this.props.intl;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, spaceAvailability } = this.props;
    const { currency, isStartDate, isEndDate, manageListingSteps } = this.props;
    const { dateRange } = this.state;

    let isCancel = cancellationPolicy ? cancellationPolicy : '1';
    let isMaxDays = maxDaysNotice ? maxDaysNotice : 'available';
    let isBooking = bookingNoticeTime ? bookingNoticeTime : 58;

    let updatedSelectedDays = selectedDays;

    let successMsg = formatMessage(messages.selectedDatesSuccess);
    let errorMsg = formatMessage(messages.selectedDatesError);

    let dateRangeNew = [], rangeStart, rangeEnd;
    if (isStartDate && (!isEndDate || DateUtils.isSameDay(new Date(isStartDate), new Date(isEndDate)))) {
      rangeStart = new Date(isStartDate);
      dateRangeNew.push(rangeStart);
    } else if (isStartDate && isEndDate) {
      rangeStart = new Date(isStartDate);
      rangeEnd = new Date(isEndDate);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRangeNew.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < isEndDate) {

          dateRangeNew.push(rangeStart);
          var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      }
    }


    this.setState({ isLoading: true });
    if (dateRangeNew && dateRangeNew.length > 0) {
      dateRangeNew.forEach(async (item, index) => {
        let selectedIndex = updatedSelectedDays.findIndex(selectedDay =>
          DateUtils.isSameDay(selectedDay, item)
        );

        if (selectedIndex < 0) {
          updatedSelectedDays.push(item);
        }
      });

      const { data } = await mutate({
        variables: {
          listId,
          blockedDates: updatedSelectedDays,
          calendarStatus: 'blocked'
        }
      })

      this.setState({ isLoading: false });

      if (data && data.UpdateBlockedDates && data.UpdateBlockedDates.status == '200') {
        await change("blockedDates", updatedSelectedDays);
        await getListingDataStep3(listId);
        await getListBlockedDates(
          listId,
          isCancel,
          isMaxDays,
          isBooking,
          currency,
          spaceAvailability
        );
        await getListingDataStep3(listId);
        await manageListingSteps(listId, 3);
        await resetCalendar();

      } else {
        toastr.error("Error!", errorMsg);
      }

    }
  }

  chooseDates(e) {
    this.setState({ isCurrentStatus: e });
  }


  render() {
    const { selectedDays, start, end, formName, resetCalendar, listId, resetDatePickerChange } = this.props;
    const { error, handleSubmit, pristine, submitting, dispatch } = this.props;
    const { initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, isStartDate, isEndDate, spaceAvailability } = this.props;
    const { currency } = this.props;
    const { isCurrentStatus } = this.state;

    const { dateRange, isLoading } = this.state;
    let convertStart = start ? moment(start).format('YYYY-MM-DD') : null;
    let convertEnd = end ? moment(end).format('YYYY-MM-DD') : null;
    let isBlock = 1, isAvailable = 2;

    return (
      <div>
        {
          (start || isStartDate) && <Col lg={12} md={12} sm={12} xs={12} className={cx(c.saveCalendarContainer, c.CalendarPopup)}>
            <div className={c.innerCPopup}>
              <FormGroup className={cx(c.formGroup, c.textLeft)}>
                <Button bsStyle="link"
                  className={cx(c.closeIcon)}
                  onClick={() => { resetCalendar() }}>
                  <img src={CloseIcon} alt="Close" />
                </Button>
              </FormGroup>
              <div className={cx(c.aBlockWrap, c.spaceTop5)}>
                <div className={c.aBWLeft}>
                  <Button
                    className={cx(c.btnBg, { [c.active]: isCurrentStatus == 2 })}
                    onClick={() => this.chooseDates(isAvailable)}
                  >
                    <FormattedMessage {...messages.availableLabel} />
                  </Button>
                </div>
                <div className={c.aBWRight}>
                  <Button
                    className={cx(c.btnBg, { [c.active]: isCurrentStatus == 1 })}
                    onClick={() => this.chooseDates(isBlock)}
                  >
                    <FormattedMessage {...messages.blockLabel} />
                  </Button>
                </div>
              </div>
              <FormGroup className={cx(c.formGroup, c.sDateWrap)}>
                <label className={c.fontWeight}>
                  <FormattedMessage {...messages.selectedDates} />
                </label>
              </FormGroup>
              <FormGroup className={c.space4}>
                <Field
                  name="blockedDates"
                  component={this.renderDateRange}
                  defaultStartDate={start}
                  defaultEndDate={end}
                  formName={formName}
                  isCurrentStatus={isCurrentStatus}
                  resetCalendar={resetDatePickerChange}
                />
              </FormGroup>
              {
                isCurrentStatus == 2 && <AvailableDates
                  start={start}
                  end={end}
                  listId={listId}
                  selectedDays={selectedDays}
                  resetCalendar={resetCalendar}
                  dateRange={dateRange}
                  cancellationPolicy={cancellationPolicy}
                  maxDaysNotice={maxDaysNotice}
                  bookingNoticeTime={bookingNoticeTime}
                  isStartDate={isStartDate}
                  isEndDate={isEndDate}
                  spaceAvailability={spaceAvailability}
                />
              }

              {
                isCurrentStatus == 1 && <FormGroup className={cx(c.formGroup, c.buttonLeft)}>
                  <Loader
                    type={"button"}
                    buttonType={"button"}
                    show={isLoading}
                    className={cx(c.btnPrimary, c.btnlarge)}
                    disabled={isLoading}
                    label={formatMessage(messages.blockDates)}
                    handleClick={() => { this.handleSave() }}
                    containerClass={c.loaderContainer}
                  />
                </FormGroup>
              }

              <Button
                className={cx(c.btnPrimaryBorder, c.btnlarge, c.buttonRight)}
                onClick={() => { resetCalendar() }}
              >
                <FormattedMessage {...messages.deSelect} />
              </Button>
            </div>
          </Col>

        }
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  change,
  getListingDataStep3,
  getListBlockedDates,
  manageListingSteps
};

export default compose(
  injectIntl,
  withStyles(s, c),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation (
      $listId: Int!, 
      $blockedDates: [String],
      $calendarStatus: String
    ) {
          UpdateBlockedDates (
            listId: $listId, 
            blockedDates: $blockedDates,
            calendarStatus: $calendarStatus
        ) {
          status
        }
        }
  `)
)(SaveCalendar);

