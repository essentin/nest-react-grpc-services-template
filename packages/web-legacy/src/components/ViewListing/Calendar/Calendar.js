import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './Calendar.css';

import Loader from '../../Loader';
import BookingForm from './BookingForm';

import { getDefaultCardDetails } from '../../../actions/Cards/getDefaultCardDetails';

class Calendar extends React.Component {

	static propTypes = {
		id: PropTypes.number.isRequired,
		personCapacity: PropTypes.number.isRequired,
		listingData: PropTypes.shape({
			basePrice: PropTypes.number.isRequired,
			cleaningPrice: PropTypes.number,
			currency: PropTypes.string,
			monthlyDiscount: PropTypes.number,
			weeklyDiscount: PropTypes.number,
			minNight: PropTypes.number,
			maxNight: PropTypes.number,
			maxDaysNotice: PropTypes.string,
		}),
		isLoading: PropTypes.bool,
		loading: PropTypes.bool,
		blockedDates: PropTypes.array,
		isHost: PropTypes.bool.isRequired,
		bookingType: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		userBanStatus: PropTypes.number,
		reviewsCount: PropTypes.number.isRequired,
		reviewsStarRating: PropTypes.number.isRequired,
	};

	static defaultProps = {
		isLoading: false,
		loading: false,
		blockedDates: [],
		isHost: false,
		show: false,
		listingData: {
			basePrice: 0,
			cleaningPrice: 0,
			monthlyDiscount: 0,
			weeklyDiscount: 0,
			minNight: 0,
			maxNight: 0
		}
	};

	render() {
		const { id, activityData, isLoading, isHost, userBanStatus, bookingType, blockedDays } = this.props;
		const { listingData: { currency } } = this.props;
		const { loading, blockedDates, startDate, endDate, show } = this.props;
		const { reviewsCount, reviewsStarRating, activityId, activityType, title } = this.props;
		let loadingStatus = loading || isLoading || false;
		let initialValues = {
			startDate,
			endDate
		}
		let starRatingValue = 0;
		if (reviewsCount > 0 && reviewsStarRating > 0) {
			starRatingValue = Number(reviewsStarRating / reviewsCount)
		}

		return (
			<div className={cx(s.bookItContainer, 'bookItContentCommon', 'modalMarginTop', 'bookItContainers')}>
				<div className={cx(s.bookItContentBox)} data-sticky-section>
					<div className={cx('bookItFormSection')}>
						<Loader
							show={loadingStatus}
							type={"page"}
						>
							<div className={cx(s.bookItPanel, 'borderRadiusNone')}>
								<BookingForm
									initialValues={initialValues}
									id={id}
									blockedDates={blockedDates}
									isHost={isHost}
									userBanStatus={userBanStatus}
									bookingType={bookingType}
									startDate={startDate}
									activityData={activityData}
									activityId={activityId}
									activityType={activityType}
									currency={currency}
									title={title}
									show={show}
									blockedDays={blockedDays}
								/>
							</div>
						</Loader>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	isLoading: state.viewListing.isLoading,
});

const mapDispatch = {
	getDefaultCardDetails
};

export default withStyles(s)(connect(mapState, mapDispatch)(Calendar))