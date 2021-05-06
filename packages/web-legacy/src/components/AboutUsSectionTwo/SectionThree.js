import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col,
    Button
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

//Images
import bannertwo from '../../../public/SiteImages/dummyImage.jpg';
import { link } from 'fs';

class SectionThree extends React.Component {

    render() {
        const { title, buttonText, link } = this.props;

        return (
            <div className={cx(s.fourBg, s.bgParentColor)}>
                <div className={s.threeBgImage} style={{ backgroundImage: `url(${bannertwo})` }} />
                <Grid fluid className={cx(s.Maincontainer, s.paddingTop, s.threeSection)}>
                    <div>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div className={s.twofooterSection}>
                                    <h2 className={cx(s.oneTitleText, s.space4, s.siteColor)}>
                                       {title} 
                                    </h2>
                                </div>
                                <div className={'aboutBtnCenter'}>
                                    <a href={link} target="_blank" className={cx(s.btnPrimary, 'aboutBtnScetion')}>
                                        {buttonText}
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(SectionThree);