import React from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';

class ApplyForBeta extends React.Component {
    static propTypes = {
        content: PropTypes.shape({
            email: PropTypes.string.isRequired,
            userName: PropTypes.string
        }).isRequired,
    };

    render() {
        const textStyle = {
            color: '#222d3a',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial',
            fontSize: '16px',
            padding: '35px',
            textAlign: 'left',
        };

        const bookingTitle = {
            textAlign: 'left',
        };

        const { content } = this.props;

        const { email, logo, firstName, lastName, siteSettings } = content;

        return (
            <Layout>
                <Header color="#fff" backgroundColor="#222d3a" logo={logo} />
                <div>
                    <Table width="100%">
                        <TBody>
                            <TR>
                                <TD style={textStyle}>
                                    <div style={{ textAlign: 'left', fontWeight: '800' }}>Hi Flowpass team,</div>
                                    <EmptySpace height={20} />
                                    <div style={bookingTitle}>
                                        A user is interested to become a member of Flowpass.
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>User first name: {firstName}</div>
                                    <div>User last name: {lastName}</div>
                                    <div>Email: {email}</div>
                                    <EmptySpace height={20} />
                                    <div>Add them to the list!</div>
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

export default ApplyForBeta;