import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { sitename, url } from '../../../config';
import SubFooter from '../modules/SubFooter';

class ForgotPasswordEmail extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      token: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  render() {
    const buttonStyle = {
      margin: 0,
      fontFamily: 'Arial',
      padding: '10px 16px',
      textDecoration: 'none',
      borderRadius: '25px',
      border: '1px solid',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'normal',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: '#f56e9f',
      backgroundColor: '#f56e9f',
      color: '#ffffff',
      borderTopWidth: '1px',
    };

    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px',
    };
    const {
      content: { token, email, name, logo, siteSettings },
    } = this.props;
    let verificationURL =
      url + `/password/verification?token=${token}&email=${email}`;

    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <Body textStyle={textStyle}>
          <div>Hej {name},</div>
          <EmptySpace height={20} />
          <div>Du har begärt att återställa ditt lösenord.</div>
          <EmptySpace height={20} />
          <div>
            Om det inte var du som begärde detta, så kan du ignorera detta meddelande.
            Annars återställ ditt lösenord genom att klicka nedan länk:
          </div>
          <EmptySpace height={40} />
          <div>
            <a style={buttonStyle} href={verificationURL}>
              Klicka här för att återställa ditt lösenord
            </a>
          </div>
        </Body>
        <Footer siteSettings={siteSettings} />
        <SubFooter />
      </Layout>
    );
  }
}

export default ForgotPasswordEmail;
