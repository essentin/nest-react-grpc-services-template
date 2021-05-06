import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	injectStripe,
	CardElement,
	Elements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement
} from 'react-stripe-elements';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import {
	Row,
	FormGroup,
	Col,
	FormControl,
	Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CardForm.css';
import messages from '../../locale/messages';
import { closePaymentBookingModal, closeCardModal, closeHomeBookingModal, closeHomeAddCardModal } from '../../actions/modalActions';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';
import { addCard } from '../../actions/Cards/addCard';
import imageOne from '../../../public/NewIcon/bitmap.png';
import imageTwo from '../../../public/NewIcon/stripe.png';
import Loader from '../Loader/Loader';
import { bookingProcess } from '../../actions/booking/bookingProcess';

//Images
import CloseIcon from '../../../public/NewIcon/cross.svg';

const required = value => !value ? messages.required : value.trim() == '' ? messages.required : undefined


const createOptions = () => {
	return {
		style: {
			base: {
				color: '#1A1B1C',
				fontWeight: 400,
				fontFamily: 'inherit',
				fontSize: '14px',
				fontSmoothing: 'antialiased',
				':focus': {
					color: '#1A1B1C',
				},

				'::placeholder': {
					color: '#aaa',
				},

				':focus::placeholder': {
					color: '#aaa',
				},
			},
			invalid: {
				color: '#1A1B1C',
				':focus': {
					color: '#1A1B1C',
				},
				'::placeholder': {
					color: '#aaa',
				},
			},
		}
	}
};

class CardForm extends Component {

	constructor(props) {
		super(props);

		this.createPaymentMethodId = this.createPaymentMethodId.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.initiateBookingProcess = this.initiateBookingProcess.bind(this);
	}
	static defaultProps = {
		show:false
	};

	renderFormControl = ({ input, label, type, placeholder, meta: { touched, error }, className }) => {
		const { formatMessage } = this.props.intl;

		return (
			<div>
				<FormControl {...input} placeholder={placeholder} type={type} className={cx(className, 'CardFormInput')} />
				{touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
			</div>
		)
	}

	async initiateBookingProcess() {

		const { activityData, bookingProcess, singleDay, bookedDate, stripe } = this.props;
		const { listId, extendDay, totalHours, activityId, activityType } = this.props;

		let minHour = activityData && activityData.minHour,
			currency = activityData && activityData.currency,
			basePrice = activityData && activityData.basePrice,
			discount = activityData && activityData.discount,
			maxGuest = activityData && activityData.maxGuest,
			cleaningFee = activityData && activityData.cleaningFee,
			isCleaningIncluded = activityData && activityData.isCleaningIncluded

		await bookingProcess(listId, basePrice, minHour, discount, extendDay, totalHours, null, null, activityId,
			maxGuest, activityType, isCleaningIncluded, cleaningFee, stripe, singleDay, bookedDate);


	}

	async createPaymentMethodId() {
		const { page, handleClick, change, addCard, cardUserName, stripe, setLoaderStart, setLoaderComplete } = this.props;

		if(!cardUserName || cardUserName.trim() == ''){
			toastr.error("Oops!", "Your card's name is incomplete.");
			return 
		}
		await setLoaderStart('cardAdd');

		let msg = '', paymentMethodId, last4Digits, cardType, expiryDate;

		let createPaymentMethod = await stripe.createPaymentMethod('card', {
			card: <CardElement />,
		})

		if (createPaymentMethod && createPaymentMethod.paymentMethod) {


			paymentMethodId = createPaymentMethod.paymentMethod.id;
			last4Digits = createPaymentMethod.paymentMethod && createPaymentMethod.paymentMethod.card && createPaymentMethod.paymentMethod.card.last4;
			cardType = createPaymentMethod.paymentMethod && createPaymentMethod.paymentMethod.card && createPaymentMethod.paymentMethod.card.brand;
			expiryDate = createPaymentMethod.paymentMethod && createPaymentMethod.paymentMethod.card
				&& (`${createPaymentMethod.paymentMethod.card.exp_month}/${createPaymentMethod.paymentMethod.card.exp_year}`);

			if (page == 'cards' || 'home' || 'viewListing') {

				let isDefaultCard = page == 'home' || 'viewListing' ? true : false;
				await addCard(paymentMethodId, last4Digits, isDefaultCard, cardUserName, cardType, expiryDate, page)

				if (page == 'home' || 'viewListing') {
					this.initiateBookingProcess();
				}

			} else {
				//Payment Summary Page
				await change('PaymentForm', 'paymentMethodId', paymentMethodId)
				await change('PaymentForm', 'last4Digits', last4Digits)
				await handleClick()
			}

		} else if (createPaymentMethod && createPaymentMethod.error && createPaymentMethod.error.message) {
			msg = createPaymentMethod.error.message
			toastr.error("Oops!", msg);
			await setLoaderComplete('cardAdd')
		}

	}

	handleCancel() {
		const { page, closeCardModal, closePaymentBookingModal, closeHomeBookingModal } = this.props;

		if (page == 'cards') {
			closeCardModal()
		} else if (page == 'home') {
			closeHomeBookingModal()
		} else {
			closePaymentBookingModal()
		}
	}

	render() {
		const { paymentLoading, addCardLoader, page, show, submitting } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={'cardFormStripe'}>
				{show && <div className={s.addcardHome}>
					   <h1 className={s.modalTitle}><FormattedMessage {...messages.addCard} /></h1>
					   <span onClick={this.handleCancel} className={s.pullRight}><img src={CloseIcon} /></span>
					</div>}
				<Row>
					<div className={s.space4}>
						<Col lg={12} md={12} sm={12} xs={12} className={s.cardSection}>
							<div className={'placeHolderFont'}>
								<Col lg={12} md={12} sm={12} xs={12} className={'cardModalStripe'}>
									<label className={s.cardLabelText}>
										<FormattedMessage {...messages.nameOnTheCard} />
									</label>
									<Field
										name="cardUserName"
										component={this.renderFormControl}
										placeholder={''}
										validate={required}
										className={'inputProfile'}
									/>
								</Col>
								<Col lg={12} md={12} sm={12} xs={12} className={cx('cardModalStripe', 'noCardNumberMargin')}>
									<label className={s.cardLabelText}>
										<FormattedMessage {...messages.paymentCardNumber} />
									</label>
									<CardNumberElement
										{...createOptions()}
										placeholder={''}
										className={cx(s.cardNumber, s.cardNumberSection, s.cardNumberSectionOne, 'CardFormInput', 'inputCard')}
									/>
								</Col>
								<Col lg={6} md={6} sm={6} xs={6} className={cx('cardModalStripe', s.expireBorder, 'cardModalCsvSection', 'cardModalCsvExpireInput')}>
									<label className={s.cardLabelText}>
										<FormattedMessage {...messages.cardExpires} />
									</label>
									<CardExpiryElement
										placeholder='     /     '
										{...createOptions()}
										className={cx(s.cardNumber, s.cardNumberSectionTwo, s.cardNumberSection, 'CardFormInput', 'inputExpire')}
									/>
								</Col>
								<Col lg={6} md={6} sm={6} xs={6} className={cx('cardModalStripe', 'cardModalCsvSection')}>
									<label className={s.cardLabelText}>
										<FormattedMessage {...messages.cvv} />
									</label>
									<CardCvcElement
										placeholder=''
										{...createOptions()}
										className={cx(s.cardNumber, s.cardNumberSectionThree, s.cardNumberSection, 'CardFormInput', 'inputCsv')}
									/>
								</Col>
								<Col lg={12} md={12} sm={12} xs={12} className={cx('cardModalStripe', s.spaceTop2)}>
									<Col lg={6} md={6} sm={6} xs={7} className={cx(s.space4, s.noPadding)}>
										<img src={imageOne} className={s.cardsIcon} alt="payment-icons" />
									</Col>
									<Col lg={6} md={6} sm={6} xs={5} className={cx(s.textAlignRight, s.spaceTop1, s.noPadding)}>
										<span className={s.powerByText}><FormattedMessage {...messages.poweredByLabel} /></span> <img src={imageTwo} className={s.stripeImg} alt="stripe-connect" />
									</Col>
								</Col>
							</div>
						</Col>
					</div>
				</Row>
				<Row>
					{page == 'book' && <div>
						<span><FormattedMessage {...messages.defaultCardNote} /></span>
					</div>}
					<Col lg={12} md={12} sm={12} xs={12} className={cx('cardModalStripe', s.spaceTop4, s.space7, s.noBorder)}>
						<Col lg={12} md={12} sm={12} xs={12}>
							<Loader
								type={"button"}
								buttonType={"submit"}
								className={cx(s.button, s.btnPrimary, s.btnlarge)}
								show={(page == 'cards' || 'home' || 'viewListing') ? (addCardLoader || paymentLoading) : paymentLoading}
								label={(page == 'cards') ? formatMessage(messages.save) : formatMessage(messages.addCardPay)}
								handleClick={this.createPaymentMethodId}
								disabled={submitting}
							/></Col>
					</Col>
				</Row>
			</div>
		);
	}
}

CardForm = reduxForm({
	form: 'CardForm',
})(CardForm);

const selector = formValueSelector('CardForm')
const selector2 = formValueSelector('BookingForm');
const mapState = (state) => ({
	paymentModalStatus: state.modalStatus.paymentBookingModalStatus,
	paymentLoading: state.book.paymentLoading,
	addCardLoader: state.loader.cardAdd,
	cardUserName: selector(state, 'cardUserName'),
	extendDay: selector2(state, 'extendDay'),
	totalHours: selector2(state, 'totalHours'),
	singleDay: selector2(state, 'singleDay'),
	bookedDate: selector2(state, 'bookedDate'),
});

const mapDispatch = {
	closePaymentBookingModal,
	closeHomeBookingModal,
	closeHomeAddCardModal,
	closeCardModal,
	change,
	addCard,
	bookingProcess,
	setLoaderStart,
	setLoaderComplete
};

export default injectStripe(injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CardForm))));