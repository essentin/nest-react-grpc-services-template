import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

//Images
import TickIcon from '../../../public/SiteIcons/check.svg';

class AboutUsFaq extends React.Component {

    render() {
        return (
            <div className={cx(s.sectionOneContainer, s.faqPadding)}>
                <Grid fluid>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
                                <h2 className={cx(s.titleSubText, s.normalTextColor, s.fontBold, s.space5)}>
                                    <FormattedMessage {...messages.faqtitle} />
                                </h2>
                                <Col lg={6} md={6} sm={6} xs={12}>
                                    <div className={s.faqWidth}>
                                        <h3 className={s.faqTitle}><FormattedMessage {...messages.howdoIaddmyspaceLabel} /></h3>
                                        <h4 className={cx(s.faqDesc, s.space4)}>
                                            <FormattedMessage {...messages.faqDescription1} />
                                        </h4>
                                        <h5 className={s.faqDesc}>
                                            <FormattedMessage {...messages.faqDescription2} />
                                        </h5>
                                    </div>
                                    <hr className={s.horizaldalSection} />
                                    <div className={s.faqWidth}>
                                        <h3 className={s.faqTitle}>Finns det några krav?</h3>
                                        <h4 className={s.faqDesc}>
                                            <span className={s.tickTabelCell}><img src={TickIcon} className={s.tickImgeMargin} /></span>
                                            <span className={s.tickTabelCell}>Snabbt och stabilt WiFi.</span>
                                        </h4>
                                        <h4 className={s.faqDesc}>
                                            <span className={s.tickTabelCell}><img src={TickIcon} className={s.tickImgeMargin} /></span>
                                            <span className={s.tickTabelCell}>En professionell miljö.</span>
                                        </h4>
                                        <h4 className={s.faqDesc}>
                                            <span className={s.tickTabelCell}><img src={TickIcon} className={s.tickImgeMargin} /></span>
                                            <span className={s.tickTabelCell}>Ytor för telefonsamtal och möten.</span>
                                        </h4>
                                        <h4 className={s.faqDesc}>
                                            <span className={s.tickTabelCell}><img src={TickIcon} className={s.tickImgeMargin} /></span>
                                            <span className={s.tickTabelCell}>Mötesrum med whiteboards och display teknik.</span>
                                        </h4>
                                        <h4 className={s.faqDesc}>
                                            <span className={s.tickTabelCell}><img src={TickIcon} className={s.tickImgeMargin} /></span>
                                            <span className={s.tickTabelCell}>Skrivbord med justerbar höjd och stol, gärna utrustade med skärmar, laddning för datorer och mobiler.</span>
                                        </h4>
                                        <h4 className={s.faqDesc}>
                                            <span className={s.tickTabelCell}><img src={TickIcon} className={s.tickImgeMargin} /></span>
                                            <span className={s.tickTabelCell}>Kaffe, te, vatten och eventuellt andra förmåner.</span>
                                        </h4>
                                    </div>
                                    <hr className={s.horizaldalSection} />
                                  
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={12}>
                                    <div className={s.faqWidth}>
                                        <h3 className={s.faqTitle}>Hur fungerar det?</h3>
                                        <h4 className={s.faqDesc}>
                                            Flowpass medlemmar använder appen för att boka din yta och checkar in när de anländer. Du kan se medlems namn, e-postadress, foto och bokningsdatum. Du har alltid fullständig kontroll över din yta, inklusive foton, öppettider, tillgänglighet och bekvämligheter som erbjuds. Du kan pausa eller ta bort din yta från plattformen när som helst. Vi betalar dig per bokningar.
                                        </h4>
                                    </div>
                                    <hr className={s.horizaldalSection} />
                                    <div className={s.faqWidth}>
                                        <h3 className={s.faqTitle}>Vem bokar och besöker oss?</h3>
                                        <h4 className={s.faqDesc}>
                                            Flowpass medlemmar kommer från stora och små företag till frilansare. De är professionella och letar efter en produktiv miljö för att få sitt arbete gjort. 
                                        </h4>
                                    </div>
                                    <hr className={s.horizaldalSection} />
                                    <div className={s.faqWidth}>
                                        <h3 className={s.faqTitle}>Vilka priser kan vi ta?</h3>
                                        <h4 className={cx(s.faqDesc, s.space4)}>
                                            Du bygger en affärsmodell tillsammans med oss som passar ditt företag, fri tillgång, pris per timme, halvdag, heldag eller i flera dagar.
                                        </h4>
                                    </div>
                                    <hr className={s.horizaldalSection} />
                                    <div className={s.faqWidth}>
                                        <h3 className={s.faqTitle}>Vad kostar det?</h3>
                                        <h4 className={s.faqDesc}>
                                            Det är gratis att ansluta sig till Flowpass. Vi hjälper er att komma igång så att det ska vara enkelt och gå snabbt.
                                        </h4>
                                    </div>
                                    <hr className={s.horizaldalSection} />
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(AboutUsFaq);