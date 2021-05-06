import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import CurrencyView from '../modules/CurrencyView';
import SubFooter from '../modules/SubFooter';
import { formatTime } from '../../../helpers/formatTimes';

import { sitename, url } from '../../../config';

class BookingRequestHost extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.renderTimeSlot = this.renderTimeSlot.bind(this);
  }

  renderTimeSlot(data, key, subDate, dateArrow) {
    let formattedLabel,
      formattedTimeLabel,
      isNextDay = false;
    if (data) {
      formattedLabel = moment(moment(data.date)).format('Do MMMM, YYYY');
      formattedTimeLabel =
        formatTime(data.startTime) + ' - ' + formatTime(data.endTime);
      isNextDay = data.endTimeObj && data.endTimeObj.isNextDay ? true : false;

      return (
        <div key={key}>
          <div style={subDate}>{formattedLabel}</div>
          <div style={dateArrow}>-</div>
          <div style={subDate}>
            {formattedTimeLabel}
            {isNextDay === true && <span>*</span>}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px',
    };

    const btnCenter = {
      textAlign: 'center',
    };

    const buttonStyle = {
      margin: 0,
      fontFamily: 'Arial',
      padding: '10px 16px',
      textDecoration: 'none',
      borderRadius: '25px',
      border: '1px solid',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: '#f56e9f',
      backgroundColor: '#f56e9f',
      color: '#ffffff',
      borderTopWidth: '1px',
    };
    const subTitleDate = {
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingBottom: '8px',
      paddingTop: '12px',
    };

    const subDate = {
      display: 'inline-block',
    };

    const dateArrow = {
      paddingRight: '5px',
      display: 'inline-block',
      paddingLeft: '5px',
    };

    const {
      content: {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        checkIn,
        checkOut,
        logo,
      },
    } = this.props;
    const {
      content: {
        listTitle,
        reservationDates,
        basePrice,
        total,
        hostServiceFee,
        currency,
        siteSettings
      },
    } = this.props;

    let checkInDate =
      checkIn != null ? moment(checkIn).format('Do MMMM, YYYY') : '';
    let checkOutDate =
      checkOut != null ? moment(checkOut).format('ddd, Do MMM, YYYY') : '';

    let actionURL = url + '/reservation/current';
    let subtotal = total - hostServiceFee;

    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <div>
          <Table width="100%">
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <EmptySpace height={20} />
                  <div>Hi {hostName},</div>
                  <EmptySpace height={20} />
                  <div>
                    Great News! You have a new reservation({confirmationCode})
                    from {guestName}
                  </div>
                  <EmptySpace height={10} />
                  <div>
                    {guestName} has planned to occupy the space {listTitle} on,
                    <div style={subTitleDate}>
                      {reservationDates && reservationDates.length > 0
                        ?
                        <span>Date & Time</span>
                        :
                        <span>Date</span>
                      }
                    </div>
                    {reservationDates &&
                      reservationDates.length > 0
                      ?
                      reservationDates.map((item, key) => {
                        return this.renderTimeSlot(
                          item,
                          key,
                          subDate,
                          dateArrow,
                        );
                      })
                      :
                      <span>{checkInDate}</span>
                    }
                  </div>
                  <EmptySpace height={10} />
                  <div>
                    Based on price of{' '}
                    <CurrencyView amount={basePrice} currency={currency} /> per
                    hour with the associated cost, your estimated payment for
                    this booking is{' '}
                    <CurrencyView amount={subtotal} currency={currency} />
                  </div>
                  <EmptySpace height={40} />
                  <div style={btnCenter}>
                    <a href={actionURL} style={buttonStyle}>
                      Accept or Decline
                    </a>
                  </div>
                  <EmptySpace height={40} />
                  <div>
                    Thanks, <br />
                    {sitename} Team
                  </div>
                </TD>
              </TR>
            </TBody>
          </Table>
          <EmptySpace height={40} />
        </div>
        <Footer siteSettings={siteSettings} />
        <SubFooter />
      </Layout>
    );
  }
}

export default injectIntl(BookingRequestHost);
