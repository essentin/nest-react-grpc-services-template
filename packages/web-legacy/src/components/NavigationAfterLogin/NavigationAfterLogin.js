import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationAfterLogin.css';
import {
  Nav, Button, NavDropdown
} from 'react-bootstrap';

// Internal Components
import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';
import Logout from '../Logout';
import WishListModal from '../WishListModal';

// Graphql
import UserBanStatusQuery from './getUserBanStatus.graphql';
import CheckUserStatusQuery from './getCheckUserStatus.graphql';
import UserStatusQuery from './getUserStatus.graphql';

// Locale
import messages from '../../locale/messages';

// Redux action
import { setUserLogout } from '../../actions/logout';

import { aboutusUrl } from '../../config'
import history from '../../core/history';

class NavigationAfterLogin extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    formatMessage: PropTypes.any,
    loginUserBanStatus: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUserBanStatus: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
  };

  static defaultProps = {
    loginUserBanStatus: {
      loading: true,
      getUserBanStatus: {
        userBanStatus: 0,
      },
    },
    userDeleteStatus: {
      userLoading: true,
      getUserStatus: {
        userStatus: null,
      },
    },
    checkLoginUserExist: {
      userExistloading: true,
      getCheckUserStatus: {
        userExistStatus: null,
      },
    }
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
    const { loginUserBanStatus: { loading, getUserBanStatus }, userDeleteStatus: { userLoading, getUserStatus } } = this.props;
    const { checkLoginUserExist: { userExistloading, getCheckUserStatus }, className, setUserLogout, wishListModal, showHomeLink } = this.props;
    const { userData, featureFlag } = this.props;
    const { formatMessage } = this.props.intl;
    const { isMenuActive } = this.state;
    let location = history && history.location && history.location.pathname;

    let isVerified;
    if (userData) {
      isVerified = userData.profileId;
    }
    if (!userExistloading && getCheckUserStatus) {
      if (getCheckUserStatus.userExistStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }
    if (!loading && getUserBanStatus) {
      if (getUserBanStatus.userBanStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }
    if (!userLoading && getUserStatus) {
      if (getUserStatus.userStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }
    return (
      <Nav pullRight>
        {showHomeLink && <NavLink to={'/'} className={cx('lastLink', 'newHeaderSection', 'headerLinkPaddingLeft')}>
          <FormattedMessage {...messages.findYourWorkSpace} />
        </NavLink>}
        <NavLink to={'/aboutus/for-workers'} className={cx('lastLink', 'headerLinkPaddingLeft')}>
          <FormattedMessage {...messages.whyFlowpassLabel} />
        </NavLink>
        <NavLink to={'/support'} className={cx('lastLink', 'headerLinkPaddingLeft', 'visible-xs', 'visible-sm', 'visible-md')}>
          <FormattedMessage {...messages.faqtitle} />
        </NavLink>
        <Logout />
        {
          featureFlag && featureFlag.inviteUser && <NavLink to={'/user-invitation'} className={cx('lastLink', 'inviteLink', 'visible-xs', 'visible-sm', 'visible-md')}>
            <span className={s.inviteLinkSpan}>
              <FormattedMessage {...messages.inviteMembers} />
            </span>
          </NavLink>
        }
      </Nav>
    );
  }
}

const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  userData: state.account.data,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
  featureFlag: state.featureFlag

});

const mapDispatch = {
  setUserLogout
};

export default
  compose(
    injectIntl,
    withStyles(s),
    graphql(UserBanStatusQuery, {
      name: 'loginUserBanStatus',
      options: {
        ssr: false,
      },
    }),
    graphql(UserStatusQuery, {
      name: 'userDeleteStatus',
      options: {
        ssr: false,
      },
    }),
    graphql(CheckUserStatusQuery, {
      name: 'checkLoginUserExist',
      options: {
        ssr: false,
      },
    }),
    (connect(mapState, mapDispatch)))(NavigationAfterLogin);