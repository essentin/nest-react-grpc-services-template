import React from 'react';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './HostSideMenu.css';

import Link from '../../../Link/Link';
import HostStuffMenu from './HostStuffMenu/HostStuffMenu';

import { setActive } from '../../../../actions/sideMenu/activeDeactiveMenu';

import messages from '../../../../locale/messages';
import history from '../../../../core/history';

function Tab({ icon, text, active, link, handleClick, showClass, helpHide, loginHide }) {
  return (
    <div onClick={handleClick} className={cx(s.responsiveDisplay)}>
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

class HostSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    const { setActive } = this.props;
    const path = history.location.pathname;
    if (path && path.includes('/support')) {
      setActive('help');
    } 
    else {
      setActive('');
    }
  }

  handleClose = () => {
    const { setActive } = this.props;
    setActive('');
  }

  handleOpen = (id) => {
    const { selectedMenu, setActive } = this.props;
      if (selectedMenu && selectedMenu == 'host') {
        this.handleClose();
      } else {
        setActive(id);
      }
  }

  render() {
    const { selectedMenu, intl: { formatMessage },  } = this.props;

    let options = [
      { id: 'host', icon: 'workspace', name: 'Host', messageKey: 'accommodationHost' },
      { id: 'help', icon: 'help', name: 'Support', link: '/support', messageKey: 'faqtitle' }
    ];
    
    return (
      <div>
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
                handleClick={() => {
                  this.handleOpen(option.id);
                }}
              />
            );
          })}
        </div>
        {selectedMenu == 'host' && <HostStuffMenu handleClose={() => this.handleClose()} />}
      </div>
    );
  }
}

const mapState = state => ({
  selectedMenu: state.modalStatus.selectedMenu
});

const mapDispatch = {
  setActive
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(HostSideMenu);