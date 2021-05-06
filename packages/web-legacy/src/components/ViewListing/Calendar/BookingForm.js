import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import s from './Calendar.css';

// Components
import BillDetails from './BillDetails';
import BookingButton from './BookingButton';
import ExtendDaysField from './ExtendDaysField';
import ExtendDaysDateField from './ExtendDaysDateField';
import Link from '../../Link';

// Actions
import { bookingProcess } from '../../../actions/booking/bookingProcess';
import { closeHomeBookingModal } from '../../../actions/modalActions'
import { setSelectedActivityType } from '../../../actions/Activities/handleActivies';
import { setPersonalizedValues } from '../../../actions/personalized';

// Icons
import bulb from './bulb.svg';
import closeIcon from '../../../../public/NewIcon/cross.svg';
import visa from '../../../../public/NewIcon/visa.png';
import master from '../../../../public/NewIcon/master.png';
import amex from '../../../../public/NewIcon/amex.png';
import CardIcon from '../../../../public/NewIcon/card.svg';

import RightArrow from '../../../../public/NewIcon/down-arrow.svg';
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

class BookingForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    availability: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    blockedDates: PropTypes.array,
    isHost: PropTypes.bool.isRequired,
    guests: PropTypes.number,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    bookingLoading: PropTypes.bool,
    formatMessage: PropTypes.func,
    extendDay: PropTypes.array,
  };

  static defaultProps = {
    blockedDates: [],
    availability: true,
    maximumStay: false,
    startDate: null,
    endDate: null,
    guests: 1,
    extendDay: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      searchFormStartDate: '',
      space: false,
      time: false,
      date: false,
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleToolTips = this.handleToolTips.bind(this);
    this.closeToastar = this.closeToastar.bind(this);
  }

  componentDidMount() {
    const { dates, bookingFormDate, setPersonalizedValues } = this.props;
    let startDate;
    if (bookingFormDate) {
      startDate = moment(startDate);
      this.setFormValue(startDate);
      this.setState({ searchFormStartDate: startDate });
      setPersonalizedValues({ name: "bookingFormDate", value: null })
    } else if (dates) {
      const dateSplit = dates && dates.split("'");
      startDate = dateSplit && dateSplit.length > 0 && moment(dateSplit[1]);
      this.setFormValue(startDate);
      this.setState({ searchFormStartDate: startDate });
    }
  }

  async setFormValue(choosedDate) {
    const { change } = this.props;
    if (choosedDate) {
      await change('singleDay', true);
    }
    await change('startDate', choosedDate);
    await change('endDate', choosedDate);
    await change('date', choosedDate);
    await change('bookedDate', choosedDate);
  }

  handleToolTips(data) {
    this.setState({
      ...data
    })
  }

  handleDropDown(e) {
    const { setSelectedActivityType, change } = this.props;
    if (e.target.value == '3') {
      change('singleDay', false)
    } else {
      change('singleDay', true)
    }
    setSelectedActivityType(e.target.value)
  }


  validateForm() {
    const { extendDay, lookupIsLoading, change, activityType, singleDay } = this.props;
    const { activityData } = this.props;

    let isDateChosen = true,
      isInvalidTime = false,
      isAlreadyExist = false,
      isValidWorkHours = true,
      isInvalidMinHours = false;
    let existArray = [];
    let slots = 0,
      hours = 0,
      price = 0,
      totalHours = 0,
      totalPrice = 0;
    let isNextDayAvilable = false,
      findNextDayAvailable;
    let minHour = activityData && activityData.minHour || 0;

    if (!singleDay && extendDay && extendDay.length > 0 && activityType && activityType == '3') {
      extendDay.map((item, key) => {
        if (item && item.date && item.startTime && item.endTime) {
          // Capture exist same time slots
          existArray = extendDay.filter(o => moment(o.date).format('YYYY-DD-MM') == moment(item.date).format('YYYY-DD-MM')
            && ((Number(o.startTime) <= Number(item.startTime) && Number(o.endTime) > Number(item.startTime))
              || (Number(o.startTime) < Number(item.startTime) && Number(o.endTime) > Number(item.startTime))
              || (Number(o.startTime) == Number(item.startTime) && Number(o.endTime) == Number(item.endTime))));

          if (existArray && existArray.length == 1) {
            findNextDayAvailable = item.startLookup.find(o => o.isNextDay === true);
            if (!findNextDayAvailable) {
              findNextDayAvailable = item.endLookup.find(o => o.isNextDay === true);
            }
            if (findNextDayAvailable) {
              isNextDayAvilable = true;
            }

            if (Number(item.startTime) >= Number(item.endTime)
              && item.startTimeObj
              && !isNextDayAvilable) {
              if (!isInvalidTime) { // Start time greater than end time
                isInvalidTime = true;
              }
            } else {
              // Validate If within available times
              if (item.startTimeObj && item.endTimeObj) {
                let findNotAvailability,
                  findStartNotAvailability,
                  findEndNotAvailability;

                if (Number(item.startTime) < Number(item.endTime)) {
                  findNotAvailability = item.startLookup.find(o => item.startTime <= o.value && o.value <= item.endTime && o.isAvailable === false);
                } else {
                  findStartNotAvailability = item.startLookup.find(o => item.startTime <= o.value && o.value <= 23.5 && o.isAvailable === false);
                  findEndNotAvailability = item.endLookup.find(o => o.value >= 0 && o.value <= item.endTime && o.isAvailable === false);
                  findNotAvailability = findStartNotAvailability || findEndNotAvailability;
                }

                if (findNotAvailability) { // Not available work times
                  if (isValidWorkHours) {
                    isValidWorkHours = false;
                  }
                } else {
                  // Valid Work Hours
                  if (isValidWorkHours) {
                    if (Number(item.endTime) > Number(item.startTime)) {
                      hours = Number(item.endTime) - Number(item.startTime);
                    } else {
                      hours = (24 - Number(item.startTime)) + Number(item.endTime);
                    }

                    totalHours += hours;
                  }
                }
              }
            }
          } else if (!isAlreadyExist) { // Already Exist
            isAlreadyExist = true;
          }
        } else if (isDateChosen) { // Required
          isDateChosen = false;
        }
      });

      change('totalHours', totalHours)

      if (Number(minHour) > 0 && Number(totalHours) < Number(minHour)) {
        isInvalidMinHours = true;
      }

    } else if (singleDay) {
      isDateChosen = true;
      isAlreadyExist = false;
      isInvalidTime = false;
      isValidWorkHours = true;
      isInvalidMinHours = false;
    } else {
      isDateChosen = false;
    }

    return {
      isDateChosen,
      isAlreadyExist,
      isInvalidTime,
      isValidWorkHours,
      isInvalidMinHours,
      totalHours,
    };
  }

  closeToastar(data) {
    this.setState({
      [data]: false
    })
  }

  render() {

    const { formatMessage } = this.props.intl;
    const { id, isHost, bookingType, show, closeHomeBookingModal, blockedDays } = this.props;
    const { activityData: { minHour, currency, basePrice, discount, maxGuest, cleaningFee, isCleaningIncluded } } = this.props;
    const { isLoading, availability } = this.props;
    const { bookingProcess, serviceFees, base, rates, bookingLoading, activityId, activityType } = this.props;
    const { extendDay, blockedDates, paymentLoading, cardDetails, singleDay, bookedDate } = this.props;
    const { listActivities, selectedActivity, title, dates } = this.props;
    const { space, date, time, searchFormStartDate } = this.state;

    // Validate & Capturing Errors
    const {
      isDateChosen,
      isAlreadyExist,
      isInvalidTime,
      isValidWorkHours,
      isInvalidMinHours,
      totalHours,
    } = this.validateForm();

    let isDisabled = false;
    if (!singleDay) {
      if (!isDateChosen) {
        isDisabled = true; // Date & times doesn't choose
      } else if (isDateChosen && isInvalidMinHours) {
        isDisabled = true; // Invalid Minimum hours
      } else if (isDateChosen && !isValidWorkHours) {
        isDisabled = true; // Invalid available hours
      } else if (isDateChosen && isInvalidTime) {
        isDisabled = true; // Invalid start & end time
      } else if (isDateChosen && !isLoading && !availability) {
        isDisabled = true; // Invalid availability from list blocked table
      } else if (isDateChosen && isAlreadyExist) {
        isDisabled = true;
      }
    } else {
      if (!isDateChosen || !bookedDate) {
        isDisabled = true; // Date & times doesn't choose
      }
    }

    let cardType = cardDetails && cardDetails.cardType || '';
    let cardTypeImages = { 'mastercard': master, visa, amex };

    let location = history && history.location && history.location.pathname;

    return (
      <Form>
        <div>
          <h1 className={s.calendarBookingTitle}><FormattedMessage {...messages.makeBookingTitle} />
            {show && <div className={s.closeHomePage} onClick={() => closeHomeBookingModal()}>
              <img src={closeIcon} />
            </div>}</h1>
        </div>
        <div className={cx('calendarBorderBottom', s.bookPanelPadding)}>
          <p className={s.bookListTitle}>{title ? title : 'title'}</p>
        </div>
        <div className={cx('selectRightBorder', 'calendarBorderBottom', 'calendarNoPaddingRight', 'calendarNoPaddingLeft')}>
          <FormGroup className={s.noMargin}>
            <FormControl componentClass="select" value={selectedActivity && selectedActivity.activityType} onChange={this.handleDropDown} className={cx('commonInbutSelectSection', s.selectText, s.selectPaddingLeft, 'selectPositionMob')}>
              {
                listActivities.map((activity, key) => {
                  return <option key={key} value={activity.activityType}>{activity.activityName}</option>
                })
              }
            </FormControl>
          </FormGroup>
        </div>
        {space && <div className={s.descriptionMainSection}>
          <div className={s.descriptionSection}>
            <span className={s.descriptionText}><FormattedMessage {...messages.chooseSpace} /></span>
            <span onClick={() => this.closeToastar('space')} ><img src={closeIcon} className={s.descriptionImg} /></span>
          </div>
        </div>}
        <div>
          <div>
            {activityType != '3' && <ExtendDaysDateField
              id={id}
              listId={id}
              blockedDates={blockedDates}
              activityType={activityType}
              bookedDate={bookedDate ? bookedDate : searchFormStartDate}
              closeToastar={this.closeToastar}
              blockedDays={blockedDays}
            />}
          </div>
          {date && <div className={cx(s.descriptionMainSection, s.dateSectionTop)}>
            <div className={s.descriptionSection}>
              <span className={s.descriptionText}><FormattedMessage {...messages.chooseDate} /></span>
              <span onClick={() => this.closeToastar('date')} ><img src={closeIcon} className={s.descriptionImg} /></span>
            </div>
          </div>}
          <div>
            {activityType == '3' && <ExtendDaysField
              id={id}
              listId={id}
              blockedDates={blockedDates}
              activityType={activityType}
              bookedDate={bookedDate ? bookedDate : searchFormStartDate}
              blockedDays={blockedDays}
            />}
            {activityType == '3' && time && <div className={cx(s.descriptionMainSection, s.dateTimeSectionTop)}>
              <div className={s.descriptionSection}>
                <span className={s.descriptionText}><FormattedMessage {...messages.chooseTime} /></span>
                <span onClick={() => this.setState({ time: false })} ><img src={closeIcon} className={s.descriptionImg} /></span>
              </div>
            </div>}
            <FormGroup className={s.noMargin}>
              {isDateChosen && (
                isAlreadyExist
                || isInvalidTime
                || !isValidWorkHours
                || (!isInvalidTime && !isAlreadyExist && isValidWorkHours && isInvalidMinHours)
              ) && <div className={cx('calendarBorderBottom', s.bookPanelPadding, s.bookItMessage)}>
                  {
                    isDateChosen && isAlreadyExist && <p className={cx(s.noMargin, s.textCenter, s.textError, s.errorPadding)}>
                      <img className={s.bulb} height="25" src={bulb} alt="bulb icon" />&nbsp;<FormattedMessage {...messages.bookingAlreadyExistError} />
                    </p>
                  }
                  {
                    isDateChosen && isInvalidTime && <p className={cx(s.noMargin, s.textCenter, s.textError, s.errorPadding)}>
                      <img className={s.bulb} height="25" src={bulb} alt="bulb icon" />&nbsp;<FormattedMessage {...messages.bookingInvalidTimeError} />
                    </p>
                  }
                  {
                    isDateChosen && !isValidWorkHours && <p className={cx(s.noMargin, s.textCenter, s.textError, s.errorPadding)}>
                      <img className={s.bulb} height="25" src={bulb} alt="bulb icon" />&nbsp;<FormattedMessage {...messages.bookingNotAvailableTimeError} />
                    </p>
                  }
                  {
                    isDateChosen && !isInvalidTime && !isAlreadyExist && isValidWorkHours && isInvalidMinHours && <p className={cx(s.noMargin, s.textCenter, s.textError, s.errorPadding)}>
                      <img className={s.bulb} height="25" src={bulb} alt="bulb icon" />&nbsp;<FormattedMessage {...messages.bookingMinHoursError1} />{` ${minHour} `}<FormattedMessage {...messages.bookingMinHoursError2} />
                    </p>
                  }
                </div>}
            </FormGroup>
          </div>
        </div>
        {
          !isDisabled && <div className={cx('calendarBorderBottom', s.bookPanelPadding)}><BillDetails
            basePrice={basePrice}
            minHour={minHour}
            discount={discount}
            totalHours={totalHours}
            extendDay={extendDay}
            currency={currency}
            serviceFees={serviceFees}
            base={base}
            rates={rates}
            isCleaningIncluded={isCleaningIncluded}
            cleaningFee={cleaningFee}
            singleDay={singleDay}
            activityType={activityType}
          />
          </div>
        }
        {cardDetails && cardDetails.last4Digits && <div className={cx('calendarBorderBottom', s.paymentTopPadding)}>
          <div className={s.space2}>
            <p className={s.paymentCardTitle}><FormattedMessage {...messages.payment} /></p>
          </div>
          <div className={s.paymentTextSection}>
            {
              cardTypeImages[cardType] && <span><img alt={'card'} src={cardTypeImages[cardType]} /></span>
            }
            {
              !cardTypeImages[cardType] && <span><img alt={'card'} src={CardIcon} /></span>
            }
            <span className={cx(s.paymentCardTitle, s.paymentPaddingLeft)}>{cardDetails.last4Digits},</span>{' '}
            <span className={s.paymentCardTitle}>{formatMessage(messages.cardExpires)}: {cardDetails.expiryDate}</span>
          </div>
          <div className={s.paymentManageSection}>
            {
              location !== '/user/cards' && <Link to={"/user/cards"} className={s.paymentCardTitle}>
                <FormattedMessage {...messages.manage} />
                <span><img src={RightArrow} className={s.downArrowPayment} /></span>
              </Link>
            }
            {
              location === '/user/cards' && <Link onClick={() => closeHomeBookingModal()} className={s.paymentCardTitle}>
                <FormattedMessage {...messages.manage} />
                <span><img src={RightArrow} className={s.downArrowPayment} /></span>
              </Link>
            }
          </div>
        </div>}
        <Elements>
          <div className={s.bookPanelPadding}>
            <BookingButton
              listId={id}
              basePrice={basePrice}
              minHour={minHour}
              discount={discount}
              bookingProcess={bookingProcess}
              availability={availability}
              isDateChosen={isDateChosen}
              isHost={isHost}
              bookingType={bookingType}
              bookingLoading={bookingLoading || paymentLoading}
              isDisabled={isDisabled}
              extendDay={extendDay}
              totalHours={totalHours}
              activityId={activityId}
              maxGuest={maxGuest}
              activityType={activityType}
              isCleaningIncluded={isCleaningIncluded}
              cleaningFee={cleaningFee}
              singleDay={singleDay}
              selectedActivity={selectedActivity}
              bookedDate={bookedDate}
              handleToolTips={this.handleToolTips}
            />
          </div>
        </Elements>
      </Form>
    );
  }
}

BookingForm = reduxForm({
  form: 'BookingForm',
  destroyOnUnmount: false,
})(BookingForm);

const selector = formValueSelector('BookingForm');
const searchFormSelector = formValueSelector('SearchForm');

const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  extendDay: selector(state, 'extendDay'),
  singleDay: selector(state, 'singleDay'),
  bookedDate: selector(state, 'bookedDate'),
  account: state.account.data,
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
  bookingLoading: state.book.bookingLoading,
  paymentLoading: state.book.paymentLoading,
  lookupIsLoading: state.viewListing.lookupIsLoading,
  cardDetails: state.book.defaultCardDetails,
  listActivities: state.activityType.listActivities,
  selectedActivity: state.activityType.selectedActivity,
  dates: searchFormSelector(state, 'dates'),
  bookingFormDate: state.personalized.bookingFormDate
});

const mapDispatch = {
  bookingProcess,
  change,
  closeHomeBookingModal,
  setSelectedActivityType,
  setPersonalizedValues
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BookingForm)));