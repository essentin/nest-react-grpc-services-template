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


import updateStep3 from './updateStep3';

class Booking extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;

    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, 'customRatioButton')}>
          <Col xs={12} sm={12} md={12} lg={7} className={s.landingContent}>
            <h3 className={s.landingContentTitle}><FormattedMessage {...messages.instantBookingTitle} /></h3>
            <form onSubmit={handleSubmit}>
              <div className={cx(s.space4, s.spaceTop4)}>
                <span className={cx(s.subContent, s.space2)}>
                  <FormattedMessage {...messages.instantBookingInfo} />
                </span>
              </div>
              <div className={s.spaceTop3}>
                <p className={cx(s.landingSaftyTitle, s.fontWeight)}>
                  <FormattedMessage {...messages.whoCanBook} />
                </p>
                <span className={cx(s.subContent, s.space2)}>
                  <FormattedMessage {...messages.whoCanBookInfo} />
                </span>
              </div>
              <div className={s.spaceTop3}>
                <div className={s.displayTable}>
                  <label className={s.displayInlineblock}>
                    <span className={s.displayTableRow}>
                      <span className={cx(s.bookingRadioBtn, s.displayTableCellTop)}>
                        <Field name="bookingType" component="input" type="radio" value="instant" className={s.BookingradioInput} />
                      </span>
                      <span className={s.displayTableCell}>
                        <span className={s.bookText}><FormattedMessage {...messages.whoCanBookInfo1} /></span>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className={cx(s.space6, s.spaceTop3)}>
                <div className={s.displayTable}>
                  <label className={s.displayInlineblock}>
                    <span className={s.displayTableRow}>
                      <span className={cx(s.bookingRadioBtn, s.displayTableCellTop)}>
                        <Field name="bookingType" component="input" type="radio" value="request" className={s.BookingradioInput} />
                      </span>
                      <span className={s.displayTableCell}>
                        <span className={s.bookText}><FormattedMessage {...messages.whoCanBookInfo3} /></span>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className={s.nextPosition}>
                <div className={s.nextBackButton}>
                  <hr className={s.horizontalLineThrough} />
                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                      <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("activities")}>
                        <FormattedMessage {...messages.back} />
                      </Button>
                      <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("local-laws")}>
                        <FormattedMessage {...messages.next} />
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Booking = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Booking);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Booking)));
