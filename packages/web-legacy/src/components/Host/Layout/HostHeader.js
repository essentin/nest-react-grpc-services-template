// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostHeader.css';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import {
  Navbar
} from 'react-bootstrap';
import LoadingBar from 'react-redux-loading-bar';

// Components
import HostNavigation from './HostNavigation';
import Logo from '../../Logo/Logo';
import Toaster from '../../Toaster/Toaster';

//Images
import MobileLogo from '../../../../public/NewIcon/mobileLogo.svg';


class HostHeader extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool
  };

  static defaultProps = {
    borderLess: false
  }

  render() {
    const { borderLess, account, intl: { formatMessage } } = this.props;
    let borderClass;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }
    return (
      <div className={s.root}>
        <Toaster />
        <LoadingBar />
        <div className={s.container}>
          <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', 'rentallAdminHeaderNoBorder', 'hostHeader', 'listMobileHeader')} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Logo link={"/space"} className={cx(s.brand, s.brandImg, s.logoMbileHide)} />
                <img src={MobileLogo} className={s.mobileLogo} />
                <span className={s.hostPortalText}>{formatMessage(messages.hostPortal)}</span>
              </Navbar.Brand>
              {/* <Navbar.Toggle className={s.navBarToggle} children={
                <span>
                  <Logo link={"/space"} className={cx(s.brand, s.brandImgToggle)} />
                  <FontAwesome.FaChevronDown />
                </span>
              } /> */}
              {
                account && account.userId &&
                <HostNavigation />
              }
            </Navbar.Header>

          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  account: state.account.data
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(HostHeader);