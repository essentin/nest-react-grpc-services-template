import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import s from './MapListingItem.css';

// Components
import MapListingPhotos from '../MapListingPhotos';

// Helper
import { formatURL } from '../../../helpers/formatURL';
import { encode } from '../../../helpers/base64Encryption';

// Icons
import SqureFeetIcon from '../../../../public/SiteIcons/sq-ft.png';
import PeopleIcon from '../../../../public/SiteIcons/people.png';
import StartIcon from '../../../../public/SiteIcons/star.png';

// Locale
import messages from '../../../locale/messages';



class MapListingItem extends React.Component {
  static propTypes = {
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
    formatMessage: PropTypes.any,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    console.log(this.props)
    const { onCloseClick } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onCloseClick();
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      currency,
      title,
      coverPhoto,
      listPhotos,
      bookingType,
      reviewsCount,
      reviewsStarRating,
      activity,
      spaceSize,
      dates,
      city,
      state,
      country
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
      let activityTypes = activity.find((o) => o.activityType == activityType);
      if (activityTypes != undefined) {
        basePrice = activityTypes.basePrice;
        personCapacity = activityTypes.maxGuest;
        activityType = activityTypes.activityType
      } else {
        //If no activity found in search form
        activityTypes = activity[0];
        basePrice = activityTypes.basePrice;
        activityType = activityTypes.activityType
        personCapacity = activityTypes.maxGuest;
      }
    }


    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }
    return (
      <div className={cx(s.listItemContainer, 'mapInfoWindow-')} ref={this.setWrapperRef}>
        <MapListingPhotos
          id={id}
          coverPhoto={coverPhoto}
          listPhotos={photosList}
          formatURL={formatURL}
          title={title}
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
      </div >
    );
  }
}



const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  activityType: selector(state, 'activityType'),
  dates: selector(state, 'dates')
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(MapListingItem)),
);