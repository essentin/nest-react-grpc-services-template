import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import HomeHeader from '../Header/HomeHeader';
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';
import FooterToggle from '../FooterToggle';
import FooterMobile from '../Footer/FooterMobile';
import Footer from '../Footer';

class LandingHomeLayout extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { layoutType, account } = this.props;

    return (
      <div className={'aboutHeader'}>
        <div className={s.positionRelative}>
          <div>
            <HomeHeader borderLess={true} layoutType={layoutType} />
            <div>{this.props.children}</div>
            {/* {!(account && account.userId) && <div>
              <div className={cx('hidden-xs', s.positionRelative)}>
                <div className={s.topImageBanner}>
                  <Footer />
                </div>
              </div>
              <div className={cx('visible-xs', s.positionRelative)}>
                <div className={s.topImageBanner}>
                  <FooterMobile />
                </div>
              </div>
            </div>
            } */}
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
  account: state.account.data
});

const mapDispatch = {
};
export default withStyles(s)((connect(mapState, mapDispatch))(LandingHomeLayout));