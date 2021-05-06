import React from 'react';

import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './HostStuffMenu.css';

import history from '../../../../../core/history';
import Link from '../../../../Link/Link';

//Images
import PinIcon from '../../../../../../public/NewIcon/pin-on-map.svg';
import UpcomingIcon from '../../../../../../public/NewIcon/ic-reservation-coming.svg';
import PreviousIcon from '../../../../../../public/NewIcon/ic-reservation-past.svg';
import CancelledIcon from '../../../../../../public/NewIcon/ic-cancelation.svg';
import NewListIcon from '../../../../../../public/NewIcon/ic-add-a-space.svg';
import CloseIcon from '../../../../../../public/NewIcon/cross.svg'


import messages from '../../../../../locale/messages';

const hostMenu = [
  { link: '/space', image: PinIcon, messageKey: 'ourPlaces' },
  { link: '/reservation/current', image: UpcomingIcon, messageKey: 'upcomingReservations' },
  { link: '/reservation/previous', image: PreviousIcon, messageKey: 'previousReservations' },
  { link: '/reservation/cancelled', image: CancelledIcon, messageKey: 'cancellations' },
  { link: '/become-a-host?mode=new', image: NewListIcon, messageKey: 'addListing' }
];

class HostStuffMenu extends React.Component {

  render() {
    const { account, handleClose, featureFlag } = this.props;
    let location = history && history.location && history.location.pathname;

    return (
      <div className={s.menuHeadSection}>
        <div onClick={() => handleClose()} className={s.textAlignRight}>
          <img src={CloseIcon} />
        </div>
        <ul className={cx(s.ulSection, s.signOutMargin)}>
          {
            hostMenu.map(menu => {
              return (<li className={cx(s.Line)}>
                <Link to={menu.link} onClick={() => handleClose()} className={s.linkText}>
                  <span><img src={menu.image} alt='icon' className={cx({[s.imageActiveColor]:location === menu.link})}/></span>
                  <span className={cx(s.listText, { [s.imageActiveColor]:location === menu.link})}>
                    <FormattedMessage {...messages[menu.messageKey]} />
                  </span>
                </Link>
              </li>);
            })
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
)(HostStuffMenu);