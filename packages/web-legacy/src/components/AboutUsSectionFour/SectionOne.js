import React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/AboutUsSectionOne/AboutUsSectionOne.css';
import cx from 'classnames';
import a from './AboutUsSectionFour.css'
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

//locale
import messages from '../../locale/messages';

//Images
import MobileImage from '../../../public/SiteImages/joshAppel.png';
class SectionOne extends React.Component {

    render() {
        const { title, subTitle } = this.props;

        return (
            <div className={cx(a.contactFormSection, a.noPaddingBottom)}>
                <Grid fluid>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div className={cx(s.positionRelative)}>
                                    <div>
                                        <h3 className={cx(s.oneTitleText, s.space4, s.normalTextColor, a.textAlignLeft)}>
                                            Node-working - nya sättet att arbeta på
                                        </h3>
                                    </div>
                                
                                    <h4 className={a.noteText}>
                                        Flexibelt arbete har under COVID-19 gått från en växande trend till ett integrerat arbetssätt. Studier visar också att distansarbete har en positiv inverkan på både välmående och produktivitet. Enligt Diwo-indexet* säger 91% av anställda att reducerad restid är en av de största fördelarna kopplat till distansarbete. Samtidigt uppger över 50% att arbeta hemifrån är ensamt och utmanande i längden och att de har problem med ergonomiska förhållande såsom skrivbord och stol.
                                    </h4>
                                    <h4 className={a.noteText}>
                                        Det nya arbetssättet innebär att företag, medarbetare och team behöver tillgång till fler arbetsytor och mötesrum lokalt där de bor och när de rör på sig. Människor kommer fortfarande att åka till huvudkontoret när de efterfrågas eller stanna på hemmakontoret när det fungerar. Men det behövs ett komplement som ger möjligheter till en bättre arbetsmiljö där hen kan välja 100% flexibilitet.
                                    </h4>
                                    <h4 className={a.noteText}>
                                        Vi kallar det "Node-working". Företag och organisationer behöver komplettera kontoret och hemmet med ett nätverk av lokala arbetsytor där deras anställda bor eller befinner sig. Platser där hen känner sig produktiv och samtidigt också säkrare, men ändå lite mer social än att vara hemma 24/7.
                                    </h4>
                                    <h4 className={a.noteText}>
                                        Flowpass löser problemet genom att bygga en marknadsplats där vi samlar flexibla arbetsplatser i förorter och stadskärnor. Vi hjälper arbetsgivare att göra övergången till Node-working effektiv och enkel.
                                    </h4>
                                    <h3 className={s.subTitle}>Hur fungerar det?</h3>
                                    <h4 className={a.noteText}>
                                        Flowpass ger dig tillgång till platser och utrymmen som du inte ens visste existerade. Du bokar enkelt din plats var du vill sitta. Du kan välja att sitta i en kreativ lounge eller med ett specifikt skrivbord. Du betalar bara för den tid du använder den. In och ut som du vill.
                                    </h4>
                                    <h3 className={s.subTitle}>Varför gör vi det här?</h3>
                                    <h4 className={a.noteText}>
                                        Vi vill att man ska kunna styra vart man vill arbeta. Att kunna välja arbetsställen lokalt eller där du är och snabbt hitta kreativa, lugna bra platser där du kan jobba utan bli störd. Hitta ditt flow och få saker gjort. Vi vill göra världen lite bättre genom att skapa fler glada och mindre stressade medarbetare samtidigt som vi också vill bidra till att påverka miljön positivt genom att färre pendlar varje dag.

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

export default withStyles(s, a)(SectionOne);