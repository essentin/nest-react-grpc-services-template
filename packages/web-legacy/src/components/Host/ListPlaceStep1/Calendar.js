// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Internal Component
import DayDragCalendar from '../../DayDragCalendar/DayDragCalendar';
import defaultPic from './large_no_image.jpeg';

import updateStep3 from './updateStep3';
import SyncCalendar from './SyncCalendar/SyncCalendar';

class Calendar extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  static defaultProps = {
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
    disabledDates: [],
    blockedDates: [],
    availableDatesPrices: [],
    availableDates: []
  };

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
    };
  }


  componentDidMount() {
    const { listBlockedPrice } = this.props;
    let sources = [];
    let sourceObject = {};

    listBlockedPrice && listBlockedPrice.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.blockedDates;
      sources.push(sourceObject);
    });
    this.setState({ sources });

  }

  componentWillReceiveProps(nextProps) {
    const { listBlockedPrice } = nextProps;
    let sources = [];
    let sourceObject = {};

    listBlockedPrice && listBlockedPrice.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.blockedDates;
      sources.push(sourceObject);
    });
    this.setState({ sources });

  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { disabledDates, blockedDates, listId } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, spaceAvailability } = this.props;
    const { availableDates, availableDatesPrices, baseCurrency, currency, availableCurrencies } = this.props;
    const { stepTwoDetails, listingSteps } = this.props;

    const { sources } = this.state;

    let isAdminCurrency;
    isAdminCurrency = availableCurrencies && availableCurrencies.find(o => o.isBaseCurrency == true)
    let title = stepTwoDetails && stepTwoDetails.title;
    let description = stepTwoDetails && stepTwoDetails.description;
    let coverPhoto = stepTwoDetails && stepTwoDetails.coverPhoto;
    let coverImage = stepTwoDetails && stepTwoDetails.listPhotos.find(o => o.id == coverPhoto);
    let path = '/images/upload/x_medium_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && stepTwoDetails && stepTwoDetails.listPhotos && stepTwoDetails.listPhotos.length > 0) {
      showImage = path + (stepTwoDetails && stepTwoDetails.listPhotos && stepTwoDetails.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }

    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, s.fullWidthCalendar)}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.calendar} /></h3>
              <div className={cx(s.lableWeight, s.paddingTop3)}>
                <p className={cx(s.bookedWidth)}><span className={s.notAvailableColor}></span><FormattedMessage {...messages.booked} /></p>
                <p className={s.calenderColorText}><span className={s.bookedColor}></span><FormattedMessage {...messages.notAvailable} /></p>
                <p className={s.calenderColorText}><span className={s.availableColor}></span><FormattedMessage {...messages.calendarAvailable} /></p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={cx(s.formGroup, s.posRelative, s.space4)}>
                    <DayDragCalendar
                      formName={"ListPlaceStep3"}
                      disabledDates={disabledDates}
                      blockedDates={blockedDates}
                      listId={listId}
                      availableDates={availableDates}
                      availableDatesPrices={availableDatesPrices}
                      sources={sources}
                      cancellationPolicy={cancellationPolicy}
                      maxDaysNotice={maxDaysNotice}
                      bookingNoticeTime={bookingNoticeTime}
                      baseCurrency={baseCurrency}
                      currency={currency}
                      isAdminCurrency={isAdminCurrency}
                      spaceAvailability={spaceAvailability}
                    />
                  </FormGroup>
                </div>

                {
                  listingSteps && listingSteps.step3 === "completed"
                  && listingSteps.listing && listingSteps.listing.isPublished && <div className={s.spaceTop4}>
                    <h3 className={cx(s.landingContentTitle)}><FormattedMessage {...messages.syncCalendars} /></h3>
                    <SyncCalendar listId={listId} />
                  </div>
                }

                <div className={s.nextPosition}>
                  <div className={s.nextBackButtonCalendar}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button
                          className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)}
                          onClick={() => previousPage("availability")}
                        >
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button
                          className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)}
                          onClick={() => nextPage("activities")}
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

Calendar = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Calendar);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  disabledDates: selector(state, 'disabledDates'),
  blockedDates: selector(state, 'blockedDates'),
  listBlockedPrice: selector(state, 'listBlockedPrice'),
  bookingNoticeTime: selector(state, 'bookingNoticeTime'),
  maxDaysNotice: selector(state, 'maxDaysNotice'),
  cancellationPolicy: selector(state, 'cancellationPolicy'),
  availableDates: selector(state, 'availableDates'),
  availableDatesPrices: selector(state, 'availableDatesPrices'),
  spaceAvailability: selector(state, 'spaceAvailability'),
  currency: selector(state, 'currency'),
  availableCurrencies: state.currency.availableCurrencies,
  stepTwoDetails: state.calendar.stepTwoDetails,
  listingSteps: state.location.listingSteps,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Calendar)));
