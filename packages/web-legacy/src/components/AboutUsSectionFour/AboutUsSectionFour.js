import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsSectionFour.css';
import a from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

import SectionOne from './SectionOne';

import SiteIcon from '../../../public/SiteImages/group.svg';

class AboutUsSectionFour extends React.Component {
    render() {

        return (
            <div>
                <div>
                    <Grid fluid>
                        <div>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
                                    <div className={s.titleBg}>
                                        <h1 className={s.titleText}>
                                            <FormattedMessage {...messages.aboutTheInitiative} />
                                        </h1>
                                    </div>
                                    <div className={s.bgImg} style={{ backgroundImage: `url(${'/../../../images/home/curve.svg'})` }} />
                                </Col>
                            </Row>
                        </div>
                    </Grid>
                </div>
                <SectionOne />
            </div>
        );
    }
}

export default withStyles(s)(AboutUsSectionFour);