import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MoreAboutFlowpass.css';
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
import bannertwo from '../../../public/SiteImages/rectangle.svg';
import PhoneImg from '../../../public/SiteImages/phone.png'

class MoreAboutSection extends React.Component {
    render() {
        return (
            <div className={s.bgParent}>
                <div className={s.spaceBg} style={{ backgroundImage: `url(${bannertwo})` }} />
                <Grid fluid className={s.container}>
                    <div>
                        <Row>
                            <Col lg={7} md={7} sm={6} xs={12}>
                                <div>
                                    <h1 className={s.mobileTitle}>
                                        Vi också, därför startar vi en medlemsklubb för oss som vill träffa andra när vi arbetar 2021
                                    </h1>
                                    <h3 className={s.mobileSubText}>
                                        Vi har hållit oss aktiva under året genom att mobilisera de som vill vara med att skapa den nya moderna arbetsplatsen. Pandemin har visat oss vad som är viktigt för att vi ska må bra och gett oss en fantastisk möjlighet att utforma framtidens sätt att samverka.
                                    </h3>
                                    <h4 className={s.mobileSubText}>
                                        Nästa år kommer många av oss att fortsätta arbeta hemifrån och många kontakter fortsätta att skötas på digital väg. Men de vi pratar med efterfrågar också en ny typ av samlingsplats utöver att återgå till ett kontor. Det har vi tagit fasta på. Se oss på Flowpass som din biljett att få mer utrymme. Att expandera den värld som har blivit alltför trång det gångna året.
                                    </h4>
                                    <h4 className={s.mobileSubText}>
                                        Med i paketet får du även en app för att du ska få ut så mycket som möjligt av ditt medlemsskap. Nyfiken?
                                    </h4>
                                </div>
                            </Col>
                            <Col lg={5} md={5} sm={6} xs={12}>
                                <div className={s.mobileImg}>
                                    <img src={PhoneImg} />
                                </div>
                            </Col>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div className={'aboutBtnCenter'}>
                                    <a href={'https://www.flowpass.co/earlybird/'} target="_blank" className={cx(s.btnPrimary, 'aboutBtnScetion')}>
                                       Jag vill bli inbjuden!
                                    </a>
                                </div>
                                <div>
                                    <p className={s.footerText}>© 2020 Flowpass. All rights reserved. - www.flowpass.co</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(MoreAboutSection);