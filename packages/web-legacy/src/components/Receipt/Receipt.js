import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import {
	Row,
	Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Receipt.css';

// Components
import Link from '../Link';
import CurrencyConverter from '../CurrencyConverter';
import Cancellation from '../CancellationModal/Cancellation'

// Actions
import { openCancellationModal } from '../../actions/CancellationModal/modalActions';

//Images
import DeskIcon from '../../../public/NewIcon/desk.svg';
import ProfileIcon from '../../../public/NewIcon/profile.svg';
import DateIcon from '../../../public/NewIcon/calendar.svg';
import LocationIcon from '../../../public/NewIcon/pin.svg';
import LoungeIcon from '../../../public/NewIcon/lounge.svg';
import MeetingIcon from '../../../public/NewIcon/meeting.svg';
import LeftArrowIcon from '../../../public/NewIcon/down-arrow.svg';
import Cross from '../../../public/NewIcon/cross.svg';

// Redirection
import history from '../../core/history';

// Locale
import messages from '../../locale/messages';

class PaymentReceipt extends React.Component {

	static propTypes = {
		formatMessage: PropTypes.any,
		data: PropTypes.shape({
			id: PropTypes.number.isRequired,
			listId: PropTypes.number.isRequired,
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			basePrice: PropTypes.number.isRequired,
			cleaningPrice: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
			discount: PropTypes.number.isRequired,
			discountType: PropTypes.string,
			guestServiceFee: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			createdAt: PropTypes.string.isRequired,
			updatedAt: PropTypes.string.isRequired,
			listData: PropTypes.shape({
				id: PropTypes.number.isRequired,
				title: PropTypes.string.isRequired,
				street: PropTypes.string.isRequired,
				city: PropTypes.string.isRequired,
				state: PropTypes.string.isRequired,
				country: PropTypes.string.isRequired,
				zipcode: PropTypes.string.isRequired,
				listingData: PropTypes.shape({
					checkInStart: PropTypes.string.isRequired,
					checkInEnd: PropTypes.string.isRequired
				})
			}),
			guestData: PropTypes.shape({
				displayName: PropTypes.string.isRequired,
			}),
			bookingSpecialPricing: PropTypes.array,
		})
	};

	static defaultProps = {
		data: null
	};

	constructor(props) {
		super(props);
		this.state = {
			activityValue: '',
			smallDevice: false,
			verySmallDevice: false,
			iPadDevice: false,
		};
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		const { activityTypeList, data: { activityType } } = this.props;
		let activityData, activityValue, isBrowser;
		if (activityTypeList != undefined && activityTypeList.results.length > 0) {
			activityData = activityTypeList.results.find(o => o.id == activityType);
			if (activityData) {
				activityValue = activityData.name;
			}
			this.setState({
				activityValue: activityValue,
			});
		}
		isBrowser = typeof window !== 'undefined';
		if (isBrowser) {
			this.handleResize();
			window.addEventListener('resize', this.handleResize);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { activityTypeList, data } = nextProps;
		let activityData, activityValue, isBrowser;
		if (activityTypeList != undefined && activityTypeList.results.length > 0 && (data && data.activityType)) {
			activityData = activityTypeList.results.find(o => o.id == data.activityType);
			if (activityData) {
				activityValue = activityData.name;
			}
			this.setState({
				activityValue: activityValue,
			});
		}
		isBrowser = typeof window !== 'undefined';
		if (isBrowser) {
			window.removeEventListener('resize', this.handleResize);
		}
	}

	handleResize(e) {
		let isBrowser = typeof window !== 'undefined', smallDevice, verySmallDevice, iPadDevice;
		smallDevice = isBrowser
			? window.matchMedia('(max-width: 768px)').matches
			: true;
		verySmallDevice = isBrowser
			? window.matchMedia('(max-width: 480px)').matches
			: false;
		iPadDevice = isBrowser
			? window.matchMedia('(min-width: 768px) and (max-width: 992px)').matches
			: false;

		this.setState({
			smallDevice,
			verySmallDevice,
			iPadDevice,
		});
	}

	print() {
		window.print();
	}

	goBack() {
		const { userTypeId } = this.props;
		console.log(history)
		history.length !== 1 && history.goBack()
		if (history.length === 1) {
			let url = userTypeId === 1 ? '/bookings' : '/reservation/current';
			history.push(url)
		}
	}

	render() {
		const { data, userId, openCancellationModal, reservationId, userTypeId } = this.props;
		const { activityValue, smallDevice } = this.state;
		if (data === null) {
			return <div> <FormattedMessage {...messages.errorMessage} /> </div>;
		}
		else {
			const { data: { checkIn, reservationState, confirmationCode, hostId, paymentState, cancellationDetails } } = this.props;
			const { data: { basePrice, total, discount, discountType, guestServiceFee, currency, hostServiceFee } } = this.props;
			const { data: { guestData } } = this.props;
			const { data: { totalHours, activityType } } = this.props;

			let dayPrice, subTotal, userType, activityLogo, singleDay = false;
      let VAT = 0.2; //TODO: remove this hardcoded VAT eventually

			if (activityType == '3') {
				if (totalHours && Number(totalHours) > 0) {
					dayPrice = basePrice * Number(totalHours);
				}
			} else {
				dayPrice = basePrice;
				singleDay = true;
			}

			activityLogo = Number(activityType) === 1 ? DeskIcon : Number(activityType) === 2 ? LoungeIcon : MeetingIcon

			if (userId === hostId) {
				userType = 'host';
				subTotal = total - hostServiceFee;
			} else {
				userType = 'guest';
				subTotal = total + guestServiceFee;
			}

			let cancelledOn = cancellationDetails && cancellationDetails.createdAt && moment(cancellationDetails.createdAt).format('YYYY-MM-DD');

			return (
        <div className={cx(s.containerResponsive, s.spaceTop4)}>
          <Cancellation userType={userType} />
          <div className={cx(s.space4, s.rowTable)}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <div
                  to={'/bookings'}
                  onClick={() => this.goBack()}
                  className={s.backText}
                >
                  <span className={cx(s.downImgSection, s.cursorPointer)}>
                    <img src={LeftArrowIcon} className={s.downArrowImg} />
                  </span>
                  <span className={s.cursorPointer}>
                    <FormattedMessage {...messages.back} />
                  </span>
                </div>
                <h2 className={s.titleText}>
                  {reservationState === 'cancelled' ? (
                    <FormattedMessage {...messages.cancellation} />
                  ) : (
                    <FormattedMessage {...messages.receipt} />
                  )}
                </h2>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8} className={s.noPadding}>
              <p className={cx(s.reciptText, s.space3)}>
                <FormattedMessage {...messages.receipt} />
                {' '} - {' '} {confirmationCode}
              </p>
              <hr className={s.horizontalLine} />
              <div>
                <span className={s.iconsSection}>
                  <img src={ProfileIcon} alt="profile" />
                </span>
                <span className={s.subText}>
                  <Link to={`/users/show/${guestData.profileId}`}>
                    {guestData.displayName}
                  </Link>
                </span>
              </div>
              <hr className={s.horizontalLine} />
              <div>
                <span className={s.iconsSection}>
                  <img src={activityLogo} alt={activityValue} />
                </span>
                <span className={s.subText}>{activityValue}</span>
              </div>
              <hr className={s.horizontalLine} />
              <div>
                <span className={cx(s.iconsSection, s.textCenter)}>
                  <img src={DateIcon} alt="date" />
                </span>
                <span className={s.subText}>
                  {moment(checkIn).format('YYYY-MM-DD')}
                </span>
              </div>
              <hr className={s.horizontalLine} />

              {cancelledOn && (
                <div>
                  <div>
                    <span className={cx(s.iconsSection, s.textCenter)}>
                      <img src={Cross} alt="date" />
                    </span>
                    <span className={s.subText}>{cancelledOn}</span>
                  </div>
                  <hr className={s.horizontalLine} />
                </div>
              )}
              <div>
                <div className={s.locationSection}>
                  <span
                    className={cx(
                      s.iconsSection,
                      s.textCenter,
                      s.locationMobileIcon,
                    )}
                  >
                    <img src={LocationIcon} alt="location" />
                  </span>
                  <span className={cx(s.subText, s.locationContentMobile)}>
                    {data.listData && data.listData.title ? (
                      data.listData.title
                    ) : (
                      <FormattedMessage {...messages.noList} />
                    )}
                  </span>
                </div>
                {reservationState !== 'cancelled' && (
                  <div className={s.contactMail}>
                    <span className={s.mobileDisplay}>
                      <FormattedMessage {...messages.contact} />
                      :&nbsp;
                    </span>
                    {data.listData && data.listData.contactPhoneNumber && (
                      <span className={s.displayBlockMobile}>
                        {' '}
                        {data.listData.contactDialCode}{' '}
                        {data.listData.contactPhoneNumber},&nbsp;
                      </span>
                    )}
                    <span>{data.listData && data.listData.contactEmail}</span>
                  </div>
                )}
              </div>
              <hr className={s.horizontalLine} />
              {reservationState !== 'cancelled' &&
                reservationState !== 'expired' && (
                  <div className={s.tableSection}>
                    <div>
                      <span className={cx(s.tableText, s.subText)}>
                        <FormattedMessage {...messages.price} />
                      </span>
                      <span className={cx(s.talePrice, s.subText)}>
                        <CurrencyConverter
                          amount={subTotal - discount}
                          from={currency}
                        />
                      </span>
                    </div>

                    {/* If there is a discount */}
                    <hr className={s.horizontalLine} />
                    {Number(discount) > 0 && (  
                      <div>
                        <span className={cx(s.tableText, s.subText)}>
                          <FormattedMessage {...messages.discount} />
                          {discountType}
                        </span>
                        <span className={cx(s.talePrice, s.subText)}>
                          <CurrencyConverter
                            amount={discount}
                            from={currency}
                          />
                        </span>
                        <hr className={s.horizontalLine} />
                      </div>
                    )}

                    {/* VAT */}
                    <div>
                      <span className={cx(s.tableText, s.subText)}>
                        <FormattedMessage {...messages.vat} />
                      </span>
                      <span className={cx(s.talePrice, s.subText)}>
                        <CurrencyConverter
                          amount={VAT * subTotal}
                          from={currency}
                        />
                      </span>
                      <hr className={s.horizontalLine} />
                    </div>
                                        
                    {/* total price */}
                    <div className={s.space5}>
                      <span className={cx(s.tableText, s.subText)}>
                        <FormattedMessage {...messages.total} />
                      </span>
                      <span className={cx(s.talePrice, s.totalText)}>
                        <CurrencyConverter amount={subTotal} from={currency} />
                      </span>
                    </div>
                    <div className={s.contactMail}><FormattedMessage {...messages.orgNameAndNumber} /></div>

                  </div>
                  
                )}
              {reservationState !== 'cancelled' &&
                reservationState !== 'expired' && (
                  <hr className={s.horizontalLine} />
                )}
              <div className={s.textCenterMobile}>
                <Link to={'/bookings'} className={s.previousBtn}>
                  <FormattedMessage {...messages.previousTrips} />
                </Link>
                {data &&
                  data.listData &&
                  reservationState &&
                  (reservationState === 'approved' || reservationState === 'pending') &&
                  (paymentState === 'completed' || paymentState === 'requires_capture') && 
                  (
                    <a
                      href="javascript:void(0)"
                      className={cx(s.cancelBtn, s.space3, s.spaceTop2)}
                      onClick={() =>
                        openCancellationModal({ id: reservationId }, userType)
                      }
                    >
                      <FormattedMessage {...messages.cancelBooking} />
                    </a>
                  )}
              </div>
            </Col>
          </Row>
        </div>
      );
		}
	}
}

const mapState = (state) => ({
	userId: state.account.data.userId,
	listingFields: state.listingFields.data,
	activityTypeList: state.activityType.data,
	userTypeId: state.account.data.userType
});

const mapDispatch = {
	openCancellationModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentReceipt)));