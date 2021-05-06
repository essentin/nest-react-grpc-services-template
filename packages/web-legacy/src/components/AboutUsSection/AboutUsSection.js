import React from 'react';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AboutUsSection.css';
import cx from 'classnames';
import {
    Grid,
    Row,
    Col,
    Tabs, Tab
} from 'react-bootstrap';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'

import AboutUsSectionOne from '../AboutUsSectionOne/AboutUsSectionOne';
import AboutUsSectionTwo from '../AboutUsSectionTwo/AboutUsSectionTwo';
import AboutUsSectionThree from '../AboutUsSectionThree/AboutUsSectionThree';
import AboutUsSectionFour from '../AboutUsSectionFour/AboutUsSectionFour';
import ContactForm from '../../components/ContactForm';

import history from '../../core/history';

import bannertwo from '../../../public/SiteImages/dummyImage.jpg';
import SecondBgNew from '../../../public/NewIcon/curve.svg';

import messages from '../../locale/messages';
class AboutUsSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', console.log);
        Events.scrollEvent.register('end', console.log);
        scrollSpy.update();
    }

    componentDidUpdate() {
        let show = window.location.hash ? window.location.hash.replace(/^\#/g, '') : false;
        show && scroll.scrollToBottom();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    handleSelect(keys) {
        history.push(`/aboutus/${keys}`)
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { tab, show } = this.props;

        return (
            <div className={cx(s.bgParent, s.bgParentColor, 'aboutUsTabs')}>
                {!show && <div className={s.spaceBg} style={{ backgroundImage: `url(${bannertwo})` }} />}
                {show && <div className={s.fourthPosition}>
                    <div className={s.fourthBg} style={{ backgroundImage: `url(${SecondBgNew})` }} />
                </div>
                }
                <Grid fluid className={cx(s.zIntexBannerTitleSection, s.containerPaddingTop)}>
                    <div >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
                                <div>
                                    <Tabs id="uncontrolled-tab-example" activeKey={tab} onSelect={this.handleSelect}>
                                        <Tab eventKey={'for-workers'} title={formatMessage(messages.forWorkers)}>
                                            <AboutUsSectionOne />
                                        </Tab>
                                        <Tab eventKey={'for-employers'} title={formatMessage(messages.forEmployers)}>
                                            <AboutUsSectionTwo />
                                        </Tab>
                                        <Tab eventKey={'for-workspaces'} title={formatMessage(messages.forWorkSpacesLabel)}>
                                            <AboutUsSectionThree />
                                        </Tab>
                                        <Tab eventKey={'about-the-initiatives'} title={formatMessage(messages.aboutTheInitiative)}>
                                            <AboutUsSectionFour />
                                            <div className={s.contactFormSection}>
                                                <ContactForm />
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default injectIntl((withStyles(s)(AboutUsSection)));