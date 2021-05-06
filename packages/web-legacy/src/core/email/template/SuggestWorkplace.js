import React from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import SubFooter from '../modules/SubFooter';

class SuggestWorkplace extends React.Component {
    static propTypes = {
        content: PropTypes.shape({
            workplaceName: PropTypes.string.isRequired,
            userName: PropTypes.string,
            city: PropTypes.string
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

        const bookingTitle = {
            textAlign: 'left',
        };

        const { content } = this.props;

        const { workplaceName, logo, userName, city, siteSettings } = content;
        const user = userName ? userName : "Someone";

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
                                    <div style={bookingTitle}>
                                        {user} has suggested a Workspace {workplaceName} {city && `in ${city}`}.
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

export default SuggestWorkplace;