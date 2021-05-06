import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename } from '../../../config';

class FeatureAlert extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      email: PropTypes.string.isRequired,
      feature: PropTypes.string.isRequired,
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

    const textBold = {
      fontWeight: 'bold',
    };

    const {
      content: { email, feature, siteSettings },
    } = this.props;
    let today = moment().format('ddd, Do MMM, YYYY');
    return (
      <Layout>
        <Header color="#f56e9f" backgroundColor="#222d3a" />
        <Body textStyle={textStyle}>
          <div>Hi Admin,</div>
          <EmptySpace height={20} />
          <div>
            {email} subscribed to get notification on{' '}
            <span style={textBold}>{feature}</span> at {today}
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

export default FeatureAlert;
