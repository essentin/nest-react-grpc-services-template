import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListingItem.css';

import ListingPhotos from '../ListingPhotos';

import { formatURL } from '../../../helpers/formatURL';

class ListingItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    basePrice: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    personCapacity: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool,
  };

  render() {
    const {
      id,
      currency,
      title,
      coverPhoto,
      listPhotos,
      reviewsCount,
      reviewsStarRating,
      // wishListStatus,
      // isListOwner,
      isMapShow,
      spaceSize,
      bookingType,
      activity,
      searchActivityType,
      city,
      state,
      country,
      dates
    } = this.props;
    let activityLogoTypeIdArray = [], activityType;
    for (let activityTypeIndex = 0; activityTypeIndex < activity.length; activityTypeIndex++) {
      const activities = activity[activityTypeIndex];
      activityLogoTypeIdArray.push(activities.activityType);
    }
    let guestsLabel = 'guest',
      basePrice = 0,
      personCapacity = 0;

    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount);
    }
    let activeItem = 0,
      photoTemp,
      photosList = listPhotos.slice();
    if (listPhotos && listPhotos.length > 1) {
      listPhotos.map((x, y) => {
        if (x.id === coverPhoto) activeItem = y;
      });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }

    if (activity && activity.length > 0) {
      let activityTypes = activity.find((o) => o.activityType == searchActivityType);
      if (activityTypes != undefined) {
        basePrice = activityTypes.basePrice;
        personCapacity = activityTypes.maxGuest;
        activityType = activityTypes.activityType
      } else {
        //If no activity found in search form
        activityTypes = activity[0];
        basePrice = activityTypes.basePrice;
        personCapacity = activityTypes.maxGuest;
        activityType = activityTypes.activityType
      }
    }


    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }
    return (
      <div
        className={cx(s.listItemContainer)}
      >
        <ListingPhotos
          id={id}
          coverPhoto={coverPhoto}
          listPhotos={photosList}
          formatURL={formatURL}
          title={title}
          isMapShow={isMapShow}
          currency={currency}
          basePrice={basePrice}
          bookingType={bookingType}
          activityType={activityType}
          city={city}
          state={state}
          country={country}
          activityLogoTypeIdArray={activityLogoTypeIdArray}
          dates={dates}
        />
      </div>
    );
  }
}
const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  isMapShow: state.personalized.showMap,
  searchActivityType: selector(state, 'activityType'),
  dates: selector(state, 'dates')
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ListingItem)),
);