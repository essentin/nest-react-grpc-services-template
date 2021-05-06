import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename, url } from '../../../config';

class BookingConfirmationGuest extends Component {
  static propTypes = {
    content: PropTypes.shape({
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired,
      listCity: PropTypes.string.isRequired
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

    const linkText = {
      color: '#f56e9f',
      fontSize: '16px',
      textDecoration: 'none',
      cursor: 'pointer',
    };

    const {
      content: { guestName, hostName, listTitle, listCity, logo, siteSettings },
    } = this.props;

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
                    Detta är en bekräftelse att du har bokat {listTitle}.
                  </div>
                  <EmptySpace height={20} />
                  <div>
                    Tack, <br />
                    {sitename}
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

export default BookingConfirmationGuest;
