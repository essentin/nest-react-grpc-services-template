
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingItem.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import CurrencyConverter from '../../CurrencyConverter';
import ListingPhotos from '../ListingPhotos';
import StarRating from '../../StarRating';
import { formatURL } from '../../../helpers/formatURL';
import { encode } from '../../../helpers/base64Encryption';
// Locale
import messages from '../../../locale/messages';

//Images
import SqureFeetIcon from '../../../../public/SiteIcons/sq-ft.png';
import PeopleIcon from '../../../../public/SiteIcons/people.png';
import StartIcon from '../../../../public/SiteIcons/star.png';


class ListingItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    id: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    personCapacity: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    activity: PropTypes.array
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      currency,
      title,
      spaceSize,
      coverPhoto,
      listPhotos,
      bookingType,
      reviewsCount,
      reviewsStarRating,
      activity
    } = this.props;

    let guestsLabel = 'guest';


    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    let activeItem = 0, photoTemp, photosList = listPhotos.slice();
    if (listPhotos && listPhotos.length > 1) {
      listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }
    let basePrice = 0, personCapacity = 0, activityType;

    if (activity && activity.length > 0) {
      basePrice = activity[0].basePrice;
      personCapacity = activity[0].maxGuest;
      activityType = activity[0].activityType;
    }
    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }
    return (
      <div className={cx(s.listItemContainer)}>
        <ListingPhotos
          id={id}
          title={title}
          currency={currency}
          basePrice={basePrice}
          bookingType={bookingType}
          activityType={activityType}
          coverPhoto={coverPhoto}
          listPhotos={photosList}
        />
        <div className={s.listInfo}>
          <a className={s.listInfoLink} href={"/space/" + formatURL(title) + '-' + id + "?c=" + encode(activityType + '&preview')} >
            <Row>
              <Col xs={12} sm={12} md={12} className={cx(s.space1, s.textEllipsis, s.infoDesc, s.infoText, s.infoSpace)}>
                <div className={cx(s.listingInfo)}>
                  <div className={s.displayInlineBlock}>
                    <span className={s.vtrBottom}>
                      <img src={SqureFeetIcon} className={s.displayInlineBlock} alt="sq-ft" />
                    </span>{' '}
                    <span>
                      {spaceSize} <FormattedMessage {...messages.squareFeet} />
                    </span>
                  </div>
                  <div className={s.displayInlineBlock}>
                    <span className={s.sideBorder}>
                      |
                    </span>
                    <span className={s.vtrBottom}>
                      <img src={PeopleIcon} alt="People" className={s.displayInlineBlock} />
                    </span>{' '}
                    <span>
                      {personCapacity}
                    </span>
                  </div>
                  <div className={cx(s.displayInlineBlock, s.pullRight, s.startHidden)}>
                    <span className={s.starIconSection}><img src={StartIcon} className={s.startIcon} alt="star" /></span>
                    <span className={s.reviewText}>
                      {reviewsCount}
                    </span>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoTitle, s.infoText)}>
                <div className={cx(s.displayInlineBlockStar)}>
                  <div className={'visible-xs'}>
                    <span className={s.starIconSection}><img src={StartIcon} className={s.startIcon} alt="star" /></span>
                    <span className={s.reviewText}>
                      {reviewsCount}
                    </span>
                  </div>
                </div>
                <div className={cx(s.reviewStarResponsive, s.displayInlineBlockStar)}>
                  <span className={'visible-xs'}>|</span>
                </div>
                <div className={cx(s.roomTitleBlock, s.textEllipsis, s.dislpayInline)}>
                  <span>{title}</span>
                </div>
              </Col>
            </Row>
          </a>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListingItem));