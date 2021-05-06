import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';

class BookingConfirmationHost extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      guestName: PropTypes.string.isRequired,
      guestLastName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      activityName: PropTypes.string.isRequired,
      guestEmail: PropTypes.string.isRequired
    }).isRequired,
  };

  render() {
    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '0px 30px 0px',
      textAlign: 'left',
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

    const bookingTitle = {
      paddingBottom: '25px',
      fontWeight: 'bold',
      fontSize: '25px',
      lineHeight: '44px',
      margin: '0',
      padding: '0',
      textAlign: 'left',
    };

    const profilePic = {
      borderRadius: '999px',
      margin: '0',
      padding: '0',
      lineHeight: '150%',
      borderSpacing: '0',
      width: '125px',
    };

    const userName = {
      color: '#ffffff',
      fontSize: '26px',
      fontWeight: 'bold',
      paddingBottom: '5px',
    };

    const subTitle = {
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingBottom: '5px',
    };

    const subTitleDate = {
      color: '#222d3a',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingBottom: '5px',
      display: 'inline-block',
      paddingRight: '15px',
      width: '75px'
    };

    const subDate = {
      display: 'inline-block',
    };

    const linkText = {
      color: '#f56e9f',
      fontSize: '18px',
      textDecoration: 'none',
      cursor: 'pointer',
    };

    const space = {
      paddingBottom: '20px',
    };

    const guestWidth = {
      width: '50%',
    };

    const {
      content: {
        logo,
        guestName,
        guestLastName,
        checkIn,
        activityName,
        guestEmail,
        locale,
        siteSettings
      },
    } = this.props;

    let checkInDate = moment(checkIn).format('YYYY-MM-DD');

    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <div>
          <Table width="100%">
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <EmptySpace height={40} />
                  <h1 style={bookingTitle}>
                    Ny bokning via Flowpass
                  </h1>
                  <EmptySpace height={20} />
                </TD>
              </TR>
            </TBody>
          </Table>
          <Table width="100%">
            <TBody>
              <TR >
                <TD style={textStyle}>
                  <div style={subTitleDate}>Namn:</div>
                  <div style={subDate}>{guestName} {guestLastName}</div>
                </TD>
              </TR>
              <TR >
                <TD style={textStyle}>
                  <div style={subTitleDate}>E-post:</div>
                  <div style={subDate}>{guestEmail}</div>
                </TD>
              </TR>
              <TR >
                <TD style={textStyle}>
                  <div style={subTitleDate}>Datum:</div>
                  <div style={subDate}>{checkInDate}</div>
                </TD>
              </TR>
              <TR >
                <TD style={textStyle}>
                  <div style={subTitleDate}>Produkt:</div>
                  <div style={subDate}>{activityName}</div>
                </TD>
              </TR>
            </TBody>
          </Table>
          <EmptySpace height={50} />
        </div>
        <Footer siteSettings={siteSettings} />
        <SubFooter />
      </Layout>
    );
  }
}

export default BookingConfirmationHost;