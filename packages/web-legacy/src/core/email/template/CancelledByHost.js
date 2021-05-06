import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';

class CancelledByHost extends Component {
  static propTypes = {
    content: PropTypes.shape({
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      refundToGuest: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    content: {
      refundToGuest: 0,
    },
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
      content: {
        guestName,
        hostName,
        confirmationCode,
        checkIn,
        listTitle,
        refundToGuest,
        currency,
        logo,
        siteSettings
      },
    } = this.props;
    let checkInDate =
      checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
    let momentStartDate = moment(checkIn).startOf('day');
    let today = moment();
    let interval = momentStartDate.diff(today, 'days');
    let isPastDay = false;
    if (interval < 0) {
      isPastDay = true;
    }
    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <div>
          <Table width="100%">
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <EmptySpace height={20} />
                  <div>Hej {guestName},</div>
                  <EmptySpace height={20} />
                  <div>
                    Tyvärr har {listTitle} avbokat {confirmationCode} på on {checkInDate}. Eventuell betalning har avbrutits.
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

export default CancelledByHost;
