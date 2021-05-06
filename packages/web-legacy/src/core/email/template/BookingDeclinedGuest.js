import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename } from '../../../config';

class BookingDeclinedGuest extends Component {
  static propTypes = {
    content: PropTypes.shape({
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px',
    };

    const {
      content: { guestName, hostName, confirmationCode, checkIn, logo, siteSettings },
    } = this.props;
    let checkInDate =
      checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <div>
          <Table width="100%">
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <EmptySpace height={20} />
                  <div>Hi {guestName},</div>
                  <EmptySpace height={20} />
                  <div>
                    We regret to inform you that your host {hostName} declined
                    your request {confirmationCode} starting on {checkInDate}.
                    As per the cancellation policy you will be refunded and
                    notified.
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

export default BookingDeclinedGuest;
