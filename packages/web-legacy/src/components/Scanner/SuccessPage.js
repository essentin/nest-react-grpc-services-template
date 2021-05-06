import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import moment from 'moment';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ScannerModal.css';
import cx from 'classnames';

import messages from '../../locale/messages';
import { injectIntl, FormattedMessage } from 'react-intl';

//Images
import ProfileImage from '../../../public/NewIcon/profile.svg';
import ActivityImage from '../../../public/NewIcon/desk.svg';
import CalendarImage from '../../../public/NewIcon/whiteCalender.svg';
import LocationImage from '../../../public/NewIcon/pin.svg';
import SiteLogoImage from '../../../public/NewIcon/siteSympol.svg';
import CureBg from '../../../public/NewIcon/curve.svg';

class SuccessPage extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        const { activityTypeList, closeModal, data: { confirmationCode, checkIn, activityType, listData: { title: listName }, guestData: { displayName } } } = this.props
        let activity;
        const { formatMessage } = this.props.intl;
        if (activityTypeList != undefined && activityTypeList.results.length > 0) {
            activity = activityTypeList.results.find(data => data.id === +activityType);
        }
        return <div className={s.successBgColor}>
            <div>
                <div className={s.successBg}>
                    <img src={SiteLogoImage} />
                    <h2 className={s.welcomeText}>
                        <FormattedMessage {...messages.welcomeFlowPass} />
                    </h2>
                </div>
                <div className={s.cureTwoBg} style={{ backgroundImage: `url(${CureBg})` }} />
            </div>
            <div className={cx(s.secondBgColo, s.successBtnSection)}>
                <div>
                    <p className={s.yourtBookingText}>
                        <span>{formatMessage(messages.yourBookng)}:</span>
                    </p>
                    <p className={s.listText}>
                        <span className={s.displayTableCellIcon}><img src={ProfileImage} className={s.successListIcon} /></span>
                        <span className={s.displayTableCellContent}>{displayName}</span>
                    </p>
                    <p className={s.listText}>
                        <span className={s.displayTableCellIcon}>{confirmationCode}</span>
                        <span className={s.displayTableCellContent}>{formatMessage(messages.yourConfirmationCode)}</span>
                    </p>
                    <p className={s.listText}>
                        <span className={s.displayTableCellIcon}><img src={ActivityImage} className={s.successListIcon} /></span>
                        <span className={s.displayTableCellContent}>{activity && activity.name}</span>
                    </p>
                    <p className={s.listText}>
                        <span className={s.displayTableCellIcon}><img src={CalendarImage} /></span>
                        <span className={s.displayTableCellContent}>{moment(checkIn).format('DD/MM/YYYY')}</span>
                    </p>
                    <p className={s.listText}>
                        <span className={s.displayTableCellIcon}><img src={LocationImage} className={s.successListIcon} /></span>
                        <span className={s.displayTableCellContent}>{listName}</span>
                    </p>
                </div>
                <div onClick={() => closeModal()} className={cx(s.closBtn, s.successBtnBg, s.spaceTop5)}>{formatMessage(messages.close)}</div>
            </div>
        </div>
    }
}

const mapState = (state) => ({
    activityTypeList: state.activityType.data
});

export default compose(injectIntl, withStyles(s), connect(mapState))(SuccessPage);