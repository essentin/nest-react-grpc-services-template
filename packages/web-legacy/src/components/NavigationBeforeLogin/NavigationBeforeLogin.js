import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';

import { Nav, NavDropdown } from 'react-bootstrap';

// Modals
import LoginModal from '../LoginModal';
import ForgotPassword from '../ForgotPassword';
import MenuItemLink from '../MenuItemLink';
import NavLink from '../NavLink';

// Redux
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';

import { openApplyForBetaModal } from '../../actions/modalActions';
import ApplyForBetaModal from '../ApplyForBetaModal/ApplyForBetaModal';
import history from '../../core/history';

class NavigationBeforeLogin extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuActive: false
    }
  }

  componentDidMount() {
    let location = history && history.location && history.location.pathname;
    this.setState({ isMenuActive: location === '/aboutus/for-workers' || location === '/aboutus/for-employers' || location === '/aboutus/for-workspaces' || location === '/aboutus/about-the-initiatives' })
  }

  render() {
    const {
      openLoginModal,
    } = this.props;
    const { toCurrency, baseCurrency, showHomeLink, openApplyForBetaModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { isMenuActive } = this.state;
    let location = history && history.location && history.location.pathname;

    return (
      <div className={'inviteSection'}>
        <LoginModal />
        <ForgotPassword userType={1} />
        <ApplyForBetaModal />
        <Nav pullRight>
          {showHomeLink && <NavLink to={'/'} className={cx('lastLink', 'newHeaderSection', 'headerLinkPaddingLeft')}>
            <FormattedMessage {...messages.findYourWorkSpace} />
          </NavLink>}
          <NavLink to={'/aboutus/for-workers'} className={cx('lastLink', 'headerLinkPaddingLeft')}>
            <FormattedMessage {...messages.whyFlowpassLabel} />
          </NavLink>
         
          <NavLink onClick={openApplyForBetaModal} className={cx('lastLink', 'headerLinkPaddingLeft')}>
            <FormattedMessage {...messages.joinBeta} />
          </NavLink> 
          <NavLink to={'/support'} className={cx('lastLink', 'headerLinkPaddingLeft', 'visible-xs', 'visible-sm', 'visible-md')}>
            <FormattedMessage {...messages.faqtitle} />
          </NavLink>
          <NavLink
            to="#"
            noLink
            onClick={openLoginModal}
            className={'lastLink'}
          >
            <Button className={cx(s.btn, s.btnPrimary, s.btnBlock)}>
              <FormattedMessage {...messages.login} />
            </Button>
          </NavLink>
        </Nav>
      </div>
    );
  }
}

const mapState = (state) => ({
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
});
const mapDispatch = {
  openApplyForBetaModal,
};

export default injectIntl(withStyles(s)(
  connect(mapState, mapDispatch)(NavigationBeforeLogin)),
);