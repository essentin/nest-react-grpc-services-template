import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Tr, Td } from 'reactable';
import s from './Reservation.css';

// Actions
import { openCancellationModal } from '../../actions/CancellationModal/modalActions';

// Components
import Link from '../Link/Link';
import Cancellation from '../CancellationModal/Cancellation';

// Icons
import DeskIcon from '../../../public/NewIcon/desk.svg';
import LoungeIcon from '../../../public/NewIcon/lounge.svg';
import MeetingIcon from '../../../public/NewIcon/meeting.svg';
import CloseIcon from '../../../public/NewIcon/cross.svg';
import rightArrow from '../../../public/NewIcon/large-right-arrow.svg';

// locale
import messages from '../../locale/messages';

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

  renderHistory(type) {
    const { bookingHistoryData, cancelledBookingData } = this.props;
    const { formatMessage } = this.props.intl;
    const { smallDevice } = this.state;

    let reservationData = [];
    if (type === 'history') reservationData = bookingHistoryData;
    if (type === 'cancellation') reservationData = cancelledBookingData;

    return (
      <div className={s.space4}>
        <div className={cx('table-responsive', 'bookingTable', 'bookingTableSecond', s.spaceTop4)}>
          {type === 'history' && <h1 className={s.resverBookTitle}><FormattedMessage {...messages.myBookingHistory} /></h1>}
          {type === 'cancellation' && <h1 className={s.resverBookTitle}><FormattedMessage {...messages.cancellations} /></h1>}

          <Table className="table"
            noDataText={formatMessage(messages.noBookingRecordFound)}
          >
            {
              reservationData && reservationData.length > 0 && reservationData.map((item, key) => {
                let activityType = item.activityType
                let activityIcon = Number(activityType) === 1 ? DeskIcon : Number(activityType) === 2 ? LoungeIcon : MeetingIcon
                let checkInDate = moment(item.checkIn).format('YYYY-MM-DD');
                
                return (
                  <Tr key={key}>
                    <Td column={formatMessage(messages.where)} data={item && item.listData && item.listData.title ?
                      item.listData.title : formatMessage(messages.missedList)} />

                    <Td column={formatMessage(messages.space)} className={cx(s.textAlignCenter, s.spaceIconWidth)}>
                      <img src={activityIcon} />
                    </Td>

                    <Td column={formatMessage(messages.when)} data={checkInDate} />

                    {
                      smallDevice &&
                      <Td column={''}>
                        <Link to={"/users/bookings/receipt/" + item.id} className={s.linkText}>
                          <img src={rightArrow} />
                        </Link>

                      </Td>
                    }

                    {
                      !smallDevice &&
                      <Td column={formatMessage(messages.confirmationCode)} data={item && item.confirmationCode} />
                    }

                    {
                      item.id && !smallDevice &&
                      <Td column={formatMessage(messages.receipt)} className={s.secondTableViewRecipt}>
                        <Link to={"/users/bookings/receipt/" + item.id} className={s.linkText}><FormattedMessage {...messages.viewReceipt} /></Link>
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

  renderUpcomingBooking() {
    const { upcomingBookingData, openCancellationModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { smallDevice } = this.state;
    return (
      <div>
        <Cancellation userType={'guest'} />
        <div className={cx('table-responsive', 'bookingTable')}>
          <h1 className={s.resverBookTitle}><FormattedMessage {...messages.myUpcomingBooking} /></h1>
          <Table className="table"
            noDataText={formatMessage(messages.noBookingRecordFound)}
          >
            {
              upcomingBookingData && upcomingBookingData.length > 0 && upcomingBookingData.map((item, key) => {
                let checkInDate = moment(item.checkIn).format('YYYY-MM-DD');
                let activityType = item.activityType
                let activityIcon = Number(activityType) === 1 ? DeskIcon : Number(activityType) === 2 ? LoungeIcon : MeetingIcon
                return (
                  <Tr key={key}>
                    <Td column={formatMessage(messages.where)} data={item && item.listData && item.listData.title ?
                      item.listData.title : formatMessage(messages.missedList)} />

                    <Td column={formatMessage(messages.space)} className={cx(s.textAlignCenter, s.spaceIconWidth)}>
                      <img src={activityIcon} />
                    </Td>


                    <Td column={formatMessage(messages.when)} data={checkInDate} />

                    {
                      smallDevice &&
                      <Td column={''}>
                        <Link to={"/users/bookings/receipt/" + item.id} className={s.linkText}>
                          <img src={rightArrow} />
                        </Link>

                      </Td>
                    }

                    {
                      !smallDevice &&
                      <Td column={formatMessage(messages.confirmationCode)} data={item && item.confirmationCode} />
                    }

                    {
                      item.id && !smallDevice &&
                      <Td column={formatMessage(messages.receipt)}>
                        <Link to={"/users/bookings/receipt/" + item.id} className={s.linkText}>
                          <FormattedMessage {...messages.viewReceipt} />
                        </Link>
                      </Td>
                    }

                    {
                      item && item.listData && item.reservationState && item.reservationState !== 'cancelled' && !smallDevice &&
                      <Td column={formatMessage(messages.cancellation)} className={s.cancelSection}>
                        <a href="javascript:void(0)" className={s.linkText} onClick={() => openCancellationModal(item,
                          'guest')}>
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

  render() {
    const { cancelledBookingData } = this.props;
    return (
      <div>
        <div>  {this.renderUpcomingBooking()} </div>
        <div> {this.renderHistory('history')}  </div>
        {cancelledBookingData && cancelledBookingData.length > 0 && <div> {this.renderHistory('cancellation')} </div>}
      </div>
    );
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