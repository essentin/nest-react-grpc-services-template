import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename } from '../../../config';

class ContactSupport extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      ContactMessage: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      userType: PropTypes.string.isRequired,
      listId: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
    }),
  };

  render() {
    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px',
    };
    let textBold = {
      fontWeight: 'bold',
    };
    const {
      content: {
        ContactMessage,
        email,
        name,
        confirmationCode,
        userType,
        listId,
        logo,
        siteSettings
      },
    } = this.props;

    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" logo={logo} />
        <Body textStyle={textStyle}>
          <div>Hi Admin,</div>
          <EmptySpace height={20} />
          <div>
            A {userType} wanted to contact you for the support, regarding
            resevation #{confirmationCode} on the property ID {listId}.
          </div>
          <EmptySpace height={20} />
          <div>
            <span style={textBold}>Contacter Name:</span> {name}
            <br />
            <span style={textBold}>Contacter Email:</span> {email}
            <br />
            <span style={textBold}>Message:</span> {ContactMessage}
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

export default ContactSupport;
