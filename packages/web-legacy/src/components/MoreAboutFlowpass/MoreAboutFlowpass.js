import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MoreAboutFlowpass.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

//Images
import bannertwo from '../../../public/SiteImages/magnetMe.png';

class MoreAboutFlowpass extends React.Component {
    render() {
        return (
            <div className={cx(s.bgParent, s.bgParentColor)}>
                <div className={s.spaceBg} style={{ backgroundImage: `url(${bannertwo})` }} />
                <Grid fluid className={s.zIntexBannerTitleSection}>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <h1 className={s.titleText}>
                                        Uttråkad där hemma?
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(MoreAboutFlowpass);