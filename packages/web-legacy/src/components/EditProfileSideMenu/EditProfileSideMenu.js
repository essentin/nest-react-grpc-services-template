import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfileSideMenu.css';
import {
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import Link from '../Link';
import history from '../../core/history';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';
class EditProfileSideMenu extends React.Component {
    render() {
        const { userData } = this.props;
        let isVerified;
        if (userData) {
            isVerified = userData.profileId;
        }
        let location;
         if (history.location) {
            location = history.location.pathname;
        }

        return (
            <div>
            <ul className={s.listContainer}>
                <li className={cx({ [s.active]: location === "/user/edit" })}>
                    <Link
                        to={"/security"}
                        className={s.sideNavitem}
                    >
                        <FormattedMessage {...messages.changePassword1} />
                    </Link>
                </li>
            </ul>
            <ul className={s.listContainer}>
                <li className={cx({ [s.active]: location === "/user/edit" })}>
                    <Link
                        to={"/security"}
                        className={s.sideNavitem}
                    >
                        <FormattedMessage {...messages.userVerification} />
                    </Link>
                </li>
            </ul>
                <ul className={s.listContainer}>
                    <li className={cx({ [s.active]: location === "/user/edit" })}>
                        <Link
                            to={"/user/edit"}
                            className={s.sideNavitem}
                        >
                            <FormattedMessage {...messages.editProfile} />
                        </Link>
                    </li>
                </ul>
                <Col
                    xs={12} sm={12} md={12} lg={12}
                    className={cx(s.noPadding, s.space3, s.spaceTop4)}
                >
                    <Link
                        to={"/users/show/" + isVerified}
                        className={cx(s.button, s.btnPrimary, s.btnlarge)}
                    >
                        <FormattedMessage {...messages.viewProfile} />
                    </Link>
                </Col>
            </div>
        );
    }
}

const mapState = (state) => ({
    userData: state.account.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditProfileSideMenu)));