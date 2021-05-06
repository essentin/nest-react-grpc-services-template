// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import cx from 'classnames';
import {
  Navbar
} from 'react-bootstrap';

// Internal Components
import Navigation from '../Navigation';
import Logo from '../Logo';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';

// Redux action
import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';

import history from '../../core/history';

//Images
import CloseIcon from '../../../public/NewIcon/cross.svg';
import MobileLogo from '../../../public/NewIcon/mobileLogo.svg';
import LocationLogo from '../../../public/NewIcon/pin.svg';


class Header extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    checked: PropTypes.any,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false,
    searchDisablePages: [
      '/',
      '/home',
      // '/s',
      '/activity/'
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      searchHide: true,
      load: false,
      isOpen: 0
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      load: true
    });
    this.handleDisableSearchPages();
  }

  componentWillReceiveProps(nextProps) {
    const { showMenu } = nextProps;
    this.setState({
      isOpen: showMenu ? 1 : 0
    })
    this.handleDisableSearchPages();

  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    if (showMenu) {
      toggleClose();
    } else {
      toggleOpen();
    }
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location = history.location ? (history.location.search ? (history.location.pathname + history.location.search) : history.location.pathname) : null;
    if (location && (location.indexOf('/s?') > -1)) {
      this.setState({
        searchHide: false
      })
    }

  }
  async openMenu() {
    const { toggleOpen } = this.props;
    // toggleOpen();
    this.setState({
      isOpen: 1,
    })
    if (this.state.isOpen == 0) {
      document.body.classList.add('menu-open');
    }
    setTimeout(() => toggleOpen(), 500);
  }

  async openClose() {
    const { toggleClose } = this.props;
    this.setState({
      isOpen: 0,
    })
    if (this.state.isOpen == 1) {
      document.body.classList.remove('menu-open');
    }
    toggleClose();
  }

  render() {
    const { borderLess, showMenu } = this.props;
    const { searchHide, load, isOpen } = this.state;
    let borderClass;
    let location;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }

    if (history.location) {
      location = history.location.pathname;
    }

    if (!load) {
      return (
        <div>
          <div className={s.root} key={new Date().getTime()}>
            <Toaster />
            <LoadingBar />
            <div className={cx(s.container, 'listMobileHeader')}>
              <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', borderClass, { [s.fixedHeader]: location === '/s' }, { ['homeHeader']: location === '/' || location === '/home' })}
                expanded={showMenu} onToggle={this.handleMenu}>
                <Navbar.Header className={cx('logoPadding', !showMenu ? 'normalPosition' : 'fixedPosition')}>
                  <Navbar.Brand >
                    <Logo link={"/"} className={cx(s.brand, s.brandImg, s.logoMbileHide)} />
                    <img src={MobileLogo} className={s.mobileLogo} />
                    <span className={cx(s.btnMobile)}>
                      <span><img src={LocationLogo} className={s.locationImg} /></span>
                    </span>
                  </Navbar.Brand>
                  <div onClick={() => this.openMenu()}>
                    <div className={'hidden-lg hamburgerButton'}>
                      <span className={cx('menuToggle', 'menuToggleOne')}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </div>
                  </div>
                </Navbar.Header>
               
                <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu, 'homeMobileMenu')}>
                  <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'hidden-lg')}>
                    <div className={s.closeButtonPosition}>
                      <div className={s.closeColor} onClick={() => this.openClose()} >
                        <img src={CloseIcon} />
                      </div>
                    </div>
                  </div>
                 
                  <Navigation />
                </div>
              </Navbar>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="">
        <div className={s.root}>
          <Toaster />
          <LoadingBar />
          <div className={cx(s.container, 'listMobileHeader')}>
            <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', borderClass, { [s.fixedHeader]: location === '/s' }, { ['homeHeader']: location === '/' || location === '/home' })}
              expanded={showMenu} onToggle={this.handleMenu}>
              <Navbar.Header className={cx('logoPadding', !showMenu ? 'normalPosition' : 'fixedPosition')}>
                <Navbar.Brand>
                  <Logo link={"/"} className={cx(s.brand, s.brandImg, s.logoMbileHide)} />
                  <img src={MobileLogo} className={s.mobileLogo} />
                  <span className={cx(s.btnMobile)}>
                    <span><img src={LocationLogo} className={s.locationImg} /></span>
                  </span>
                </Navbar.Brand>
                <div onClick={() => this.openMenu()}>
                  <div className={'hidden-lg hamburgerButton'}>
                    <span className={cx('menuToggle', 'menuToggleOne')}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                </div>
              </Navbar.Header>
              <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu)}>
                <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'hidden-lg')}>
                  <div className={s.closeButtonPosition}>
                    <div className={s.closeColor} onClick={() => this.openClose()} >
                      <img src={CloseIcon} />
                    </div>
                  </div>
                </div>
               
                <Navigation />
              </div>
            </Navbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  showMenu: state.toggle.showMenu
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Header)));