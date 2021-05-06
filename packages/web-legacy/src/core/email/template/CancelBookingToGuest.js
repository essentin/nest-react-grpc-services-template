import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';
import { sitename } from '../../../config';

class CancelBookingToGuest extends Component {
    static propTypes = {
        content: PropTypes.shape({
            guestName: PropTypes.string.isRequired,
            listTitle: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired,
            siteSettings: PropTypes.object.isRequired,
            cancelledOn: PropTypes.string.isRequired
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

        const { content: { guestName, listTitle, logo, siteSettings, cancelledOn } } = this.props;

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
                                    <div> Your booking request for {listTitle} has been cancelled on {cancelledOn}. </div>
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

export default CancelBookingToGuest;