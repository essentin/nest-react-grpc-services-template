import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

class SectionOne extends React.Component {

    render() {
        const { title, subTitle } = this.props;

        return (
            <div>
                <Grid fluid className={s.sectionOneContainer}>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <h1 className={s.titleText}>
                                        {title}
                                    </h1>
                                    <h3 className={s.titleSubText}>
                                        {subTitle}
                                    </h3>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(SectionOne);