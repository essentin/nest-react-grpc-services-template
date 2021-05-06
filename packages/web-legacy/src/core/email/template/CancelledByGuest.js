import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import SubFooter from '../modules/SubFooter';
import EmptySpace from '../modules/EmptySpace';

class CancelledByGuest extends Component {
  static propTypes = {
    content: PropTypes.shape({
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
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
      content: {
        guestName,
        hostName,
        confirmationCode,
        checkIn,
        listTitle,
        currency,
        logo,
        siteSettings
      },
    } = this.props;
    let checkInDate =
      checkIn != null ? moment(checkIn).format('YYYY-MM-DD') : '';
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
                  <div>Hej {hostName},</div>
                  <EmptySpace height={20} />
                  <div>
                    Tyvärr har {guestName} avbokat {confirmationCode} hos {listTitle}{' '} som var avsedd för {checkInDate}.
                    <EmptySpace height={10} />
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

export default CancelledByGuest;
