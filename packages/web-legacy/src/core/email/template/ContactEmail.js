import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename } from '../../../config';

class ContactEmail extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      ContactMessage: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.any.isRequired,
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
      content: { ContactMessage, email, name, phoneNumber, logo, siteSettings },
    } = this.props;

    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <Body textStyle={textStyle}>
          <div>Hi Admin,</div>
          <EmptySpace height={20} />
          <div>
            A visitor/user wants to contact. Below are their contact
            information,
          </div>
          <EmptySpace height={20} />
          <div>
            Name: {name}
            <br />
            <br />
            Email: {email}
            <br />
            <br />
            Contact Number: {phoneNumber}
            <br />
            <br />
            Message: {ContactMessage}
            <br />
          </div>
          <EmptySpace height={30} />
          <div>
            Thanks, <br />
            {sitename} Team
          </div>
        </Body>
        <Footer siteSettings={siteSettings} />
        <SubFooter />
      </Layout>
    );
  }
}

export default ContactEmail;
