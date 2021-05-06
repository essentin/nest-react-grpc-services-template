import React from 'react';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './SideMenu.css';

import Link from '../Link';
import MyStuffMenu from './MyStuffMenu';
import ScannerModal from '../Scanner/ScannerModal';
import BookingModal from '../SearchListing/BookingModal';

import { setActive } from '../../actions/sideMenu/activeDeactiveMenu';
import { openLoginModal, openScannerModal } from '../../actions/modalActions';

import messages from '../../locale/messages';
import history from '../../core/history';

function Tab({ icon, text, active, link, handleClick, showClass, helpHide, loginHide }) {
  return (
    <div onClick={handleClick} className={cx(s.responsiveDisplay, { 'scanner': showClass, helpHide, loginHide })}>
      <Link to={link} className={active ? s.tabActive : s.tab}>
        <img
          src={'/sidemenu/' + icon + (active ? '-active' : '') + '.svg'}
          alt={icon}
        />
        <div className={active ? s.tabLabelActive : s.tabLabel}>{text}</div>
      </Link>
    </div>
  );
}

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    const { setActive } = this.props;
    const path = history.location.pathname;
    if (path && path.includes('/support')) {
      setActive('help');
    } else if (path == '/') {
      setActive('workspace');
    } else {
      setActive('');
    }
  }

  handleClose = () => {
    const { setActive } = this.props;
    setActive('');
  }

  handleOpen = (id) => {
    const { selectedMenu, setActive, openLoginModal, account, openScannerModal } = this.props;
    if (id === 'scanner') {
      setActive(id);
      !(account && account.userId) ? openLoginModal() : openScannerModal()
    } else {
      if (selectedMenu && selectedMenu == 'profile') {
        this.handleClose();
      } else {
        setActive(id);
      }
    }
  }

  render() {
    const { account, selectedMenu, intl: { formatMessage }, checkInFeatureEnabled } = this.props;

    let options = [
      { id: 'workspace', icon: 'workspace', name: 'Workspaces', link: '/', messageKey: 'workspaceLabel' },
      { id: 'help', icon: 'help', name: 'Support', link: '/support', messageKey: 'faqtitle' }
    ];

    if (account && account.userId) {
      options = [
        ...options,
        { id: 'profile', icon: 'profile', name: 'My stuff', link: '', messageKey: 'myStuff' }
      ];
      if (account.userType === 1 && checkInFeatureEnabled) {
        options = [
          options[0],
          { id: 'scanner', icon: 'scanner', name: 'Check in', link: '', showClass: true, messageKey: 'checkInScanner' },
          options[1],
          options[2],
        ];
      }
    } else {
      options = [
        ...options,
        { id: 'login', icon: 'profile', name: 'Login', link: '/login', messageKey: 'login' }
      ];
    }

    return (
      <div>
        <BookingModal />
        {
          checkInFeatureEnabled && <ScannerModal />
        }
        <div className={s.tabs}>
          {options.map((option, i) => {
            let active = selectedMenu == option.id;
            return (
              <Tab
                key={i}
                active={active}
                icon={option.icon}
                text={option.messageKey ? formatMessage(messages[option.messageKey]) : option.name}
                className={cx(s.tab)}
                link={option && option.link}
                showClass={option.showClass || false}
                helpHide={option.id === 'help'}
                loginHide={option.id === 'login'}
                handleClick={() => {
                  this.handleOpen(option.id);
                }}
              />
            );
          })}
        </div>
        {selectedMenu == 'profile' && <MyStuffMenu handleClose={() => this.handleClose()} />}
      </div>
    );
  }
}

const mapState = state => ({
  account: state.account.data,
  selectedMenu: state.modalStatus.selectedMenu,
  checkInFeatureEnabled: state.featureFlag.checkIn
});

const mapDispatch = {
  setActive,
  openLoginModal,
  openScannerModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(SideMenu);