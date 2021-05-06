import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename, url } from '../../../config';

class BookingRequestGuest extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      confirmationCode: PropTypes.number.isRequired,
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired
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

    const {
      content: {
        guestName,
        listTitle,
        hostName,
        checkIn,
        confirmationCode,
        logo,
        siteSettings
      },
    } = this.props;
    let checkInDate = checkIn
      ? moment(new Date(checkIn)).format('MMM Do, YYYY')
      : '';
    let messageURL = url + '/bookings';

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
                    Your booking request({confirmationCode}) at {listTitle}{' '}
                    starting on {checkInDate} sent to your host {hostName}. You
                    will hear from them within 24 hours.
                  </div>
                  <EmptySpace height={40} />
                  <div style={btnCenter}>
                    <a href={messageURL} style={buttonStyle}>
                      Message {hostName}
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

export default BookingRequestGuest;
