import React from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';

class InvitationDetailsToAdmin extends React.Component {
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

        const alignLeft = {
            textAlign: 'left',
        };

        const { content: { userName, invitedList, logo, siteSettings } } = this.props;

        return (
            <Layout>
                <Header color="#fff" backgroundColor="#222d3a" logo={logo} />
                <div>
                    <Table width="100%">
                        <TBody>
                            <TR>
                                <TD style={textStyle}>
                                    <div style={{ textAlign: 'left', fontWeight: '800' }}>Hi Admin,</div>
                                    <EmptySpace height={20} />
                                    <div style={alignLeft}> {userName} has invited {invitedList && invitedList.toString()} to join FlowPass </div>
                                    <EmptySpace height={20} />
                                    <div style={alignLeft}>Thanks, </div>
                                    <EmptySpace height={20} />
                                    <div style={alignLeft}>FlowPass Team </div>
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

export default InvitationDetailsToAdmin;