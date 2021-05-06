import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostLayout.css';
import cx from 'classnames';

// components
import HostHeader from './HostHeader';
import CookiesDisclaimer from '../../CookiesDisclaimer/CookiesDisclaimer';
import SideMenu from './SideMenu/HostSideMenu';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { runtime } = this.props
    return (
      <div className={s.overFlowHidden}>
        <div className={s.positionRelative}>
          {
            runtime && runtime.isAuthenticated && <div className={s.sideMenuSection}>
              <SideMenu />
            </div>
          }
          <div className={cx(s.mainContainer, { 'loginContainer': !runtime || !runtime.isAuthenticated })}>
            <HostHeader />
            <div>
              <div className={s.paddingTop}>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

const mapState = state => ({
  runtime: state.runtime
});
const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Layout));