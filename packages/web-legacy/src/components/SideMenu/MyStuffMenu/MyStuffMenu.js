import React from 'react';

import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';

import s from './MyStuffMenu.css';

import Link from '../../Link';

//Images
import PinIcon from '../../../../public/NewIcon/pin-on-map.svg';
import ProfileIcon from '../../../../public/NewIcon/profile.svg';
import CardIcon from '../../../../public/NewIcon/card.svg';
import CloseIcon from '../../../../public/NewIcon/cross.svg';
import InviteIcon from '../../../../public/NewIcon/inviteProfile.svg';
import SecurityIcon from '../../../../public/NewIcon/key.svg';

import messages from '../../../locale/messages';

class MyStuffMenu extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { account, handleClose, featureFlag } = this.props;
    let userType = account && account.userType;
    let maxInviteCount = account && account.maxInviteCount || 0, usedInvitesCount = account && account.usedInvitesCount;

    return (
      <div className={s.menuHeadSection}>
        <div onClick={() => handleClose()} className={s.textAlignRight}>
          <img src={CloseIcon} />
        </div>
        <ul className={s.ulSection}>
          <li className={cx(s.Line, s.signOutMargin, s.textCenter)}>
            <form action="/logout" method="post">
              <Button type="submit" className={s.myStuffBtn}>
                <FormattedMessage {...messages.signout} />
              </Button>
            </form>
          </li>
          {
            userType === 1 && <li className={cx(s.Line, s.noBorderBottom)}>
              <Link to={'/bookings'} onClick={() => handleClose()} className={s.linkText}>
                <span><img src={PinIcon} alt='pinicon' /></span>
                <span className={s.listText}>
                  <FormattedMessage {...messages.myBookings} />
                </span>
                <span className={s.userText}>{account && Number(account.myBookingsCount) != 0 ? account.myBookingsCount : ''}</span>
              </Link>
            </li>
          }
          <li className={cx(s.Line, s.noBorderBottom)}>
            <Link to={'/user/edit'} onClick={() => handleClose()} className={s.linkText}>
              <span><img src={ProfileIcon} alt='profileicon' /></span>
              <span className={s.listText}>
                <FormattedMessage {...messages.myProfile} />
              </span>
              <span className={s.userText}>{account && account.firstName}</span>
            </Link>
          </li>
          {
            featureFlag && featureFlag.security && <li className={cx(s.Line, s.noBorderBottom)}>
              <Link to={'/security'} onClick={() => handleClose()} className={s.linkText}>
                <span><img src={SecurityIcon} alt='security' /></span>
                <span className={s.listText}>
                  <FormattedMessage {...messages.security} />
                </span>
              </Link>
            </li>
          }
          {
            userType === 1 && <li className={s.Line}>
              <Link to={'/user/cards'} onClick={() => handleClose()} className={s.linkText}>
                <span><img src={CardIcon} alt='cardicon' /></span>
                <span className={s.listText}>
                  <FormattedMessage {...messages.payment} />
                </span>
              </Link>
            </li>
          }
          {
            featureFlag && featureFlag.inviteUser && <li className={s.Line}>
              <Link to={'/user-invitation'} onClick={() => handleClose()} className={s.linkText}>
                <span><img src={InviteIcon} alt='inviteicon' /></span>
                <span className={cx(s.listText, s.inviteMarginLeft)}>
                  <FormattedMessage {...messages.inviteMembers} />
                </span>
                {maxInviteCount > 0 && <span className={s.userText}>{usedInvitesCount}/{maxInviteCount}</span>}
              </Link>
            </li>
          }
        </ul>
      </div>
    );
  }
}

const mapState = state => ({
  account: state.account.data,
  featureFlag: state.featureFlag
});

const mapDispatch = {
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(MyStuffMenu);