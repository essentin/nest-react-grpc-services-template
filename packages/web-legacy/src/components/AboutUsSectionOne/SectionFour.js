import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col,
    Table
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

class SectionFour extends React.Component {

    render() {
        return (
            <div className={s.sectionFourContainer}>
                <Grid fluid>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <h2 className={cx(s.titleSubText, s.normalTextColor, s.fontBold)}>
                                    <FormattedMessage {...messages.whatItCostLabel} />
                                </h2>
                                <div>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th className={cx(s.tableTitle, s.fontBold, s.noBorder)}>
                                                    <FormattedMessage {...messages.tabPricing} />
                                                </th>
                                            </tr>
                                            <tr className={cx(s.tableBorder, s.tableTopBorder)}>
                                                <td className={cx(s.tableTitle, s.fontBold, s.noBorder)}>
                                                    <FormattedMessage {...messages.planLabel} /> 1
                                                </td>
                                                <td className={cx(s.tableTitle, s.noBorder)}>
                                                    Lorem ipsum dolor sit amet signa tellus guis pretium
                                                </td>
                                                <td className={cx(s.tablePriceText, s.noBorder)}>
                                                    XXXX SEK
                                                </td>
                                            </tr>
                                            <tr className={s.tableBorder}>
                                                <td className={cx(s.tableTitle, s.fontBold)}>
                                                    <FormattedMessage {...messages.planLabel} /> 2
                                                </td>
                                                <td className={cx(s.tableTitle)}>
                                                    Lorem ipsum dolor sit amet signa tellus guis pretium
                                                </td>
                                                <td className={s.tablePriceText}>
                                                    XXXX SEK
                                                </td>
                                            </tr>
                                            <tr className={s.tableBorder}>
                                                <td className={cx(s.tableTitle, s.fontBold)}>
                                                    <FormattedMessage {...messages.planLabel} /> 3
                                                </td>
                                                <td className={cx(s.tableTitle)}>
                                                    Lorem ipsum dolor sit amet signa tellus guis pretium
                                                </td>
                                                <td className={s.tablePriceText}>
                                                    XXXX SEK
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <h4 className={cx(s.tableTitle, s.spaceTop2)}>
                                        Nullam dui dolor, commodo vel tellus quis, blandit pretium quam. Vivamus tristique sit amet ipsum eu sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum commodo, tortor non fermentum interdum, erat mi consequat dolor, ac dictum leo purus a risus.
                                    </h4>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(SectionFour);