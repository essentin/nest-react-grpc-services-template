import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import NavigationBeforeLogin from '../NavigationBeforeLogin';
import NavigationAfterLogin from '../NavigationAfterLogin';

import { setUserLogout } from '../../actions/logout';
import { openLoginModal } from '../../actions/modalActions';

class Navigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any
  };
  static defaultProps = {
    showHomeLink: true
  };

  render() {
    const { className, isAuthenticated, setUserLogout, openLoginModal, openClose, showHomeLink } = this.props;
    if (isAuthenticated === true) {
      return <NavigationAfterLogin
        className={className}
        setUserLogout={setUserLogout}
        openClose={openClose}
        showHomeLink={showHomeLink}
      />
    } else {
      return <NavigationBeforeLogin
        className={className}
        openLoginModal={openLoginModal}
        openClose={openClose}
        showHomeLink={showHomeLink}
      />;
    }
  }

}

const mapState = (state) => ({
  isAuthenticated: state.runtime.isAuthenticated,
});

const mapDispatch = {
  setUserLogout,
  openLoginModal
};
export default injectIntl(connect(mapState, mapDispatch)(Navigation));