import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
	Row,
	Col,
	FormGroup,
} from 'react-bootstrap';
import cx from 'classnames';

import CurrencyConverter from '../../CurrencyConverter';

import { convert } from '../../../helpers/currencyConvertion';

import messages from '../../../../src/locale/messages';

class BillDetails extends Component {
	static propTypes = {
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number,
		currency: PropTypes.string.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		startDate: PropTypes.object,
		endDate: PropTypes.object,
		serviceFees: PropTypes.shape({
			guest: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		base: PropTypes.string.isRequired,
		rates: PropTypes.object.isRequired,
		formatMessage: PropTypes.func,
		minHour: PropTypes.number,
		discount: PropTypes.number,
		extendDay: PropTypes.array
	};

	static defaultProps = {
		basePrice: 0,
		cleaningPrice: 0,
		monthlyDiscount: 0,
		weeklyDiscount: 0,
		startDate: null,
		endDate: null,
		minHour: 0,
		discount: 0,
		extendDay: []
	}

	render() {
		const { basePrice, currency, singleDay } = this.props;
		const { serviceFees, base, rates } = this.props;
		const { formatMessage } = this.props.intl;
		const { totalHours, extendDay, minHour, discount, isCleaningIncluded, cleaningFee, activityType } = this.props;

		let serviceFee = 0, serviceFeeCurrency;
		let dayDifference, priceForDays, discountPrice, discountType, total;
		if (!singleDay) {
			if (totalHours != undefined && totalHours > 0) {
				priceForDays = Number(basePrice) * Number(totalHours);
				discountPrice = 0;
				discountType = null;
				total = 0;
			}

			if (Number(totalHours) >= 8 && Number(discount) > 0) {
				discountPrice = (Number(priceForDays) * Number(discount)) / 100;
				//discountType = discount + "% " + formatMessage(messages.weeklyDiscount);
				discountType = discount + "% discount for 8+ hours";
			}
		} else if (singleDay) {
			priceForDays = Number(basePrice);
			discountPrice = 0;
			discountType = null;
			total = 0;
		}
		
		if (serviceFees) {
			if (serviceFees.guest.type === 'percentage') {
				serviceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
			} else {
				serviceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
			}
		}

		if (isCleaningIncluded) {
			total = (priceForDays + serviceFee) - discountPrice;
		} else {
			total = (priceForDays + serviceFee + cleaningFee) - discountPrice;
		}
		return (
			<FormGroup className={cx(s.spaceTop4, s.space4)}>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12}>
						<div className={s.TotalText}>
							<span>
								<CurrencyConverter
									amount={total}
									// from={currency}
								/>
							</span>
							<span>
								{' '}/ {formatMessage(messages.days)}
							</span>
		{
			// minHour && <span style={{textAlign: 'right'}}>Minimum{' '} {minHour} {Number(activityType) === 3 ? "hour" : "day"}</span>
	}
						</div>
					</Col>
				</Row>
			</FormGroup>
		);
	}
}

export default injectIntl(withStyles(s)(BillDetails));