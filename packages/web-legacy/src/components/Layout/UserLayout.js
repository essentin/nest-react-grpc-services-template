import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import cx from 'classnames';

// components
import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';
import SideMenu from '../SideMenu';

// Icons
import Image from '../../../public/SiteIcons/footer-bg.png';

class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { account } = this.props;
    return (
      <div className={s.overFlowHidden}>
        <div className={s.positionRelative}>
          <div className={s.sideMenuSection}>
            <SideMenu />
          </div>
        </div>
        <div className={cx(s.mainContainer)}>
          <Header />
          <div className={s.paddingTop}>
            {this.props.children}
          </div>
          {
            !(account && account.userId) && 
            <div className={cx(s.positionRelative, s.marginTopUser)}>
            <div className={s.topImageBanner}>
              <div className={s.bottomLine} />
              <Footer />
            </div>
          </div>
          }
        </div>
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
export default withStyles(s)((connect(mapState, mapDispatch)
)(UserLayout));


// export default withStyles(s)(UserLayout);
