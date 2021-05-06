import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
    Field
} from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapSwitch.css';

class Hello extends Component {

    render() {
        return (
            <div className={s.root}>
                <div className={s.textContainer}>
                    <span><FormattedMessage {...messages.showMap} /></span>
                </div>
                <div className={s.btnContainer}>
                    <Field
                        name="bookingType"
                        component={this.renderSwitch}
                    />
                </div>
            </div>
        );
    }
}


export default withStyles(s)(Hello);