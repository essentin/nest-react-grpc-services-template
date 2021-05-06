import React from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename, url } from '../../../config';

class SendInvite extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px',
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
      height: '50px',
      padding: '10px 68px 10px 67px',
    };

    const bookingTitle = {
      textAlign: 'left',
    };

    const { content: { firstName, email, logo, inviteCode, siteSettings } } = this.props;

    let messageURL = url + '/register/step-one?email=' + email;
    if (inviteCode) messageURL = messageURL + '&inviteCode=' + inviteCode;

    return (
      <Layout>
        <Header color="#fff" backgroundColor="#222d3a" logo={logo} />
        <div>
          <Table width="100%">
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <div style={{ textAlign: 'left', fontWeight: '800' }}>Hej {firstName},</div>
                  <EmptySpace height={20} />
                  <div style={bookingTitle}>
                    Här kommer din exklusiva inbjudan att gå med i Flowpass innan vi lanserat fullt ut. Du blir en av de första att prova Flowpass. Vad sägs om det?
                  </div>
                  <EmptySpace height={20} />
                  <div style={bookingTitle}>
                    För att skapa ditt konto klickar du på länken nedan.
                  </div>
                  <EmptySpace height={50} />
                  <div>
                    <a href={messageURL} style={buttonStyle}>
                      Registrera konto
                    </a>
                  </div>
                  <EmptySpace height={40} />
                </TD>
              </TR>
            </TBody>
          </Table>
        </div>
        <Footer siteSettings={siteSettings} />
        <SubFooter />
      </Layout>
    );
  }
}

export default SendInvite;
