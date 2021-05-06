import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './Layout.css';

import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';
import SideMenu from '../SideMenu';
import FooterMobile from '../Footer/FooterMobile';

import Image from '../../../public/SiteIcons/footer-bg.png';
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { account, menuToggle } = this.props;
    return (
      <div className={s.overFlowHidden}>
        <div className={s.positionRelative}>
          <div className={cx(s.sideMenuSection,{[s.sideMenuToggleOpen]: menuToggle})}>
            <SideMenu />
          </div>
          <div className={cx(s.mainContainer)}>
            <Header />
            <div className={s.paddingTop}>
              {this.props.children}
            </div>
            {!(account && account.userId) && <div>
                <div className={cx('hidden-xs', s.positionRelative)}>
                  <div className={s.topImageBanner}>
                    {/* <div className={s.bottomLine} /> */}
                    <Footer />
                  </div>
                </div>
                <div className={cx('visible-xs', s.positionRelative)}>
                  <div className={s.topImageBanner}>
                    <FooterMobile />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

const mapState = state => ({
  account: state.account.data,
  menuToggle: state.toggle.showMenu
});

const mapDispatch = {
};
export default withStyles(s)((connect(mapState, mapDispatch))(Layout));