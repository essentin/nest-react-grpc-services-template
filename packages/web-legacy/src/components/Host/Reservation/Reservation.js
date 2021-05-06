import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { connect } from 'react-redux';

import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Tr, Td } from 'reactable';

import s from './Reservation.css';

import Link from '../../Link/Link';
import Cancellation from '../../CancellationModal/Cancellation';
import Avatar from '../../Avatar';

import { openCancellationModal } from '../../../actions/CancellationModal/modalActions';

import DeskIcon from '../../../../public/NewIcon/desk.svg';
import LoungeIcon from '../../../../public/NewIcon/lounge.svg';
import MeetingIcon from '../../../../public/NewIcon/meeting.svg';
import rightArrow from '../../../../public/NewIcon/large-right-arrow.svg';
import CloseIcon from '../../../../public/NewIcon/cross.svg';

import messages from '../../../locale/messages';

class Reservation extends Component {
    static propTypes = {
        noList: PropTypes.bool,
        reservationId: PropTypes.number.isRequired,
        reservationState: PropTypes.string.isRequired,
        checkIn: PropTypes.string.isRequired,
        checkOut: PropTypes.string.isRequired,
        guests: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
        profileId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string,
        guestServiceFee: PropTypes.number.isRequired,
        hostServiceFee: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        formatMessage: PropTypes.any,
    };

    static defaultProps = {
        noList: false,
        checkIn: null,
        checkOut: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            smallDevice: false,
            verySmallDevice: false,
            iPadDevice: false,
            tabs: {
                editButton: false,
            },
            overlay: false,
        };
        this.handleResize = this.handleResize.bind(this);
    }


    componentDidMount() {
        let isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount() {
        let isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            window.removeEventListener('resize', this.handleResize);
        }
    }


    handleResize(e) {
        const { tabs } = this.state;
        let isBrowser = typeof window !== 'undefined';
        let smallDevice = isBrowser
            ? window.matchMedia('(max-width: 768px)').matches
            : true;
        let verySmallDevice = isBrowser
            ? window.matchMedia('(max-width: 480px)').matches
            : false;
        let iPadDevice = isBrowser
            ? window.matchMedia('(min-width: 768px) and (max-width: 992px)').matches
            : false;

        this.setState({
            smallDevice,
            verySmallDevice,
            iPadDevice,
        });
    }

    render() {
        const { reservations, type, openCancellationModal, currentPage } = this.props;
        const { formatMessage } = this.props.intl;
        const { smallDevice } = this.state;
        return (
            <div>
                <Cancellation userType={'host'} />
                <div className={cx('table-responsive', 'bookingTable')}>
                    <h1 className={s.resverBookTitle}>
                        {type === "previous" && <FormattedMessage {...messages.previousReservations} />}
                        {type === "current" && <FormattedMessage {...messages.upcomingReservations} />}
                        {type === "cancelled" && <FormattedMessage {...messages.cancelledReservation} />}
                    </h1>
                    <Table className="table"
                        noDataText={formatMessage(messages.noBookingRecordFound)}
                    >
                        {
                            reservations && reservations.length > 0 && reservations.map((item, key) => {
                                let checkInDate = moment(item.checkIn).format('YYYY-MM-DD'),
                                    activityType = item.activityType,
                                    activityIcon = Number(activityType) === 1 ? DeskIcon : Number(activityType) === 2 ? LoungeIcon : MeetingIcon,
                                    guestName = item && item.guestData && item.guestData.displayName,
                                    profileId = item && item.guestData && item.guestData.profileId,
                                    guestPicture = item && item.guestData && item.guestData.picture;
                                return (
                                    <Tr key={key}>
                                        <Td column={formatMessage(messages.where)} data={item && item.listData && item.listData.title ?
                                            item.listData.title : formatMessage(messages.missedList)} />

                                        <Td column={formatMessage(messages.space)} className={cx(s.textAlignCenter, s.spaceIconWidth)}>
                                            <img src={activityIcon} />
                                        </Td>

                                        <Td column={formatMessage(messages.when)} data={checkInDate} />


                                        <Td column={formatMessage(messages.who)} >
                                            <div>
                                                <div>
                                                    <Avatar
                                                        source={guestPicture}
                                                        withLink
                                                        profileId={profileId}
                                                        className={s.imageContent}
                                                    />
                                                </div>
                                                <Link to={`/users/show/${profileId}`} className={s.linkText}>
                                                    {guestName}
                                                </Link>
                                            </div>
                                        </Td>

                                        {
                                            smallDevice &&
                                            <Td column={''}>
                                                {item.id && (item.reservationState === 'approved' || item.reservationState === 'completed' || item.reservationState === 'expired') ? <Link to={"/users/bookings/receipt/" + item.id} className={s.linkText}>
                                                    <img src={rightArrow} />
                                                </Link> : ""}

                                            </Td>
                                        }
                                        {!smallDevice && item.id && (item.reservationState === 'approved' || item.reservationState === 'completed' || item.reservationState === 'expired') && <Td column={formatMessage(messages.receipt)}>
                                            {item.id && (item.reservationState === 'approved' || item.reservationState === 'completed' || item.reservationState === 'expired') ? <Link to={"/users/bookings/receipt/" + item.id} className={s.linkText}>
                                                <FormattedMessage {...messages.viewReceipt} />
                                            </Link> : ""}
                                        </Td>}

                                        {!smallDevice && <Td column={formatMessage(messages.confirmationCode)} data={item.confirmationCode} />}


                                        {
                                            type === "current" && item && item.listData && item.reservationState && item.reservationState === 'approved' && !smallDevice &&
                                            <Td column={formatMessage(messages.cancellation)} className={s.cancelSection}>
                                                <a href="javascript:void(0)" className={s.linkText} onClick={() => openCancellationModal(item, 'host', currentPage, type)}>
                                                    <FormattedMessage {...messages.cancel} />
                                                    <img src={CloseIcon} className={s.crossIcon} />
                                                </a>
                                            </Td>
                                        }
                                    </Tr>
                                )
                            })
                        }
                    </Table>
                </div>
            </div>
        )

    }
}

const mapState = (state) => ({
    cancellationModal: state.modalStatus.cancellationModal
});

const mapDispatch = {
    openCancellationModal
};

export default injectIntl(
    withStyles(s)(connect(mapState, mapDispatch)(Reservation)),
);