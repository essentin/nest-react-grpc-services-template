import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { connect } from 'react-redux';
import S from './FooterToggle.css';
import { FormattedMessage } from 'react-intl';
import {
    Button
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import Footer from '../Footer';
import ReactDrawer from 'react-drawer';
import s from '!isomorphic-style-loader/!css-loader!react-drawer/lib/react-drawer.css';

import { setPersonalizedValues } from '../../actions/personalized';

// Locale
import messages from '../../locale/messages';
//Images
import Image from '../../../public/SiteIcons/footer-bg.png';
class FooterToggle extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            position: 'bottom',
            noOverlay: true
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.setNoOverlay = this.setNoOverlay.bind(this);
    }

    componentDidMount() {
        const { setPersonalizedValues } = this.props;
        setPersonalizedValues({name: 'showFooter', value: false})
    }

    setNoOverlay(e) {
        this.setState({ noOverlay: e.target.checked });
    }
    toggleDrawer() {
        const { setPersonalizedValues, showFooter } = this.props;
        setPersonalizedValues({name: 'showFooter', value: !showFooter})
        this.setState({ open: !this.state.open });
    }
    closeDrawer() {
        const { setPersonalizedValues } = this.props;
        setPersonalizedValues({name: 'showFooter', value: false})
        this.setState({ open: false });
    }
    onDrawerClose() {
        const { setPersonalizedValues } = this.props;
        setPersonalizedValues({name: 'showFooter', value: false})
        this.setState({ open: false });
    }
    render() {
        const { showFooter } = this.props;
        return (
            <div>
                <Button
                    onClick={this.toggleDrawer}
                    disabled={showFooter && !this.state.noOverlay}
                    className={cx(S.buttonStyle, S.buttonPosition)}
                >
                    {!showFooter ? <span>
                        <span><FontAwesome.FaGlobe className={cx(S.iconStyle)} /> </span>
                        <FormattedMessage {...messages.footerTerms} />
                    </span> :
                        <span>
                            <span><FontAwesome.FaClose className={cx(S.iconStyle)} /></span>
                            <FormattedMessage {...messages.footerClose} />
                        </span>
                    }
                </Button>
                <ReactDrawer
                    open={showFooter}
                    position={this.state.position}
                    onClose={this.onDrawerClose}
                    noOverlay={this.state.noOverlay}>
                    <div className={S.positionRelative}>
                        <div className={S.topImageBanner}>
                            <Footer />
                        </div>
                    </div>
                </ReactDrawer>
            </div>
        );
    }
}

const mapState = (state) => ({
    showFooter: state.personalized.showFooter
});

const mapDispatch = {
    setPersonalizedValues,
};

export default (withStyles(s, S)(connect(mapState, mapDispatch)(FooterToggle)));