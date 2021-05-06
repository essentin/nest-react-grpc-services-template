import React, { Component } from 'react';

import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import moment from 'moment';
import { change } from 'redux-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ScannerModal.css';
import cx from 'classnames';

import history from '../../core/history';

import { openHomeBookingModal } from '../../actions/modalActions';
import { setPersonalizedValues } from '../../actions/personalized';

import messages from '../../locale/messages';



//Images
import SiteLogo from '../../../public/NewIcon/group.svg';
// import BgImage from '../../../public/NewIcon/scannerFailure.svg';
import CureBg from '../../../public/NewIcon/curveSecond.svg';

class FailiurePage extends Component {

    constructor(props) {
        super(props);
        this.book = this.book.bind(this);
    }

    async book() {
        const { openHomeBookingModal, closeModal, listId, change, setPersonalizedValues } = this.props;
        let value = moment().format('YYYY-MM-DD');
        await setPersonalizedValues({ name: "bookingFormDate", value })
        await closeModal();
        await openHomeBookingModal(listId);
    }

    handleMyBooking() {
        const { closeModal } = this.props;
        closeModal();
        history.push('/bookings');
    }

    render() {
        const { closeModal, type, clearResult } = this.props;
        const { formatMessage } = this.props.intl;

        return <div className={s.successBtnBg}>
            <div>
                <div className={s.failureBg}>
                    <img src={SiteLogo} className={s.siteImage} />
                    <h2 className={s.failureText}>{type === 'noReservation' ? formatMessage(messages.failiureScannerTitle) : formatMessage(messages.notFlowpassQr)}</h2>
                </div>
                <div className={s.cureTwoBg} style={{ backgroundImage: `url(${CureBg})` }} />
            </div>
            <div className={s.failureBtnSection}>
                {
                    type === 'noReservation' && <div onClick={() => this.book()} className={s.bookBtnSection}>
                        <FormattedMessage {...messages.book} />
                    </div>
                }
                {
                    type === 'noReservation' && <div>
                        <a onClick={()=>this.handleMyBooking()} className={cx(s.bookBtnSection, s.linkBtn)}><FormattedMessage {...messages.myBookings} /></a>
                    </div>
                }
                {
                    type === 'invalidQR' && <div onClick={() => clearResult()} className={s.bookBtnSection}>
                        <FormattedMessage {...messages.tryAginLabel} />
                    </div>
                }
                <div onClick={() => closeModal()} className={s.closBtn}>
                    <FormattedMessage {...messages.close} />
                </div>
            </div>
        </div>
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    openHomeBookingModal,
    setPersonalizedValues,
    change
};

export default compose(injectIntl, withStyles(s), connect(mapState, mapDispatch))(FailiurePage);