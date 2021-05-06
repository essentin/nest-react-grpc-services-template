import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename } from '../../../config';

class BanStatusServiceStatusBanned extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      userMail: PropTypes.string.isRequired,
    }).isRequired,
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

    const linkText = {
      color: '#f56e9f',
      fontSize: '16px',
      textDecoration: 'none',
      cursor: 'pointer',
    };

    const textStyle = {
      color: '#222d3a',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px',
    };
    const {
      content: { userName, userMail, adminMail, logo, siteSettings },
    } = this.props;
    let mailTo = 'mailto:' + adminMail;

    return (
      <Layout>
        <Header color="#fff" backgroundColor="#222d3a" logo={logo} />
        <Body textStyle={textStyle}>
          <div>Dear {userName},</div>
          <EmptySpace height={20} />
          <div>You are banned.</div>
          <EmptySpace height={20} />
          <div>
            Please get in touch with <a href={mailTo}>{adminMail}</a> if you
            have any questions.
          </div>
          <EmptySpace height={40} />
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

export default BanStatusServiceStatusBanned;
