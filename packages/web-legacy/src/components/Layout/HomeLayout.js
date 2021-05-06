import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';

import HomeHeader from '../Header/HomeHeader';
import CookiesDisclaimer from '../CookiesDisclaimer';
import SelectCity from '../../components/SelectCity/SelectCity';
import cx from 'classnames';
import FooterToggle from '../FooterToggle';
import SideMenu from '../SideMenu';


class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { layoutType, account, menuToggle } = this.props;

    return (
      <div>
        <div className={s.positionRelative}>
        <div className={cx(s.sideMenuSection,{[s.sideMenuToggleOpen]: menuToggle})}>
            <SideMenu />
          </div>
          <div className={cx(s.mainContainer)}>
            <HomeHeader borderLess={true} layoutType={layoutType} showHomeLink={false} />
            {/* <SelectCity /> */}
            {this.props.children}
          </div>
        </div>
        {!(account && account.userId) && <div className={cx('hidden-xs', s.searchFooter)}>
          <FooterToggle />
        </div>}
        <CookiesDisclaimer />
      </div>
    );
  }
}

const mapState = state => ({
  account: state.account.data,
  menuToggle: state.toggle.showMenu
});

const mapDispatch = {};
export default withStyles(s)((connect(mapState, mapDispatch)
)(HomeLayout));