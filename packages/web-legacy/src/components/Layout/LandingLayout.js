import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './Layout.css';

import Header from '../Header';
import Footer from '../Footer';
import FooterMobile from '../Footer/FooterMobile';


class LandingLayout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { account } = this.props;
        return (
            <div className={s.overFlowHidden}>
                <div className={s.positionRelative}>
                    <div>
                        <Header />
                        <div className={s.paddingTop}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = state => ({
    account: state.account.data
});

const mapDispatch = {
};
export default withStyles(s)((connect(mapState, mapDispatch))(LandingLayout));