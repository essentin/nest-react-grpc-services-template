import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPhotos.css';
import cx from 'classnames';

import Link from '../../Link';
import LazyLoadImage from '../../LazyLoadImage';

import { encode } from '../../../helpers/base64Encryption';

import deskIcon from '../../../../public/SiteIcons/desk.png';
import LaungeIcon from '../../../../public/NewIcon/lounge.svg';
import MeetingIcon from '../../../../public/NewIcon/meeting.svg';

import messages from '../../../locale/messages';

const nextArrowStyle = {
  right: '5px',
  color: ' #1A1B1C',
  zIndex: '1',
  width: '40px',
  height: '40px',
  top: '47%',
  fontSize: '18px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  backgroundRepeat: 'repeat-x',
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%',
  position: 'absolute',
};

const prevArrowStyle = {
  left: '5px',
  color: ' #1A1B1C',
  zIndex: '1',
  width: '40px',
  height: '40px',
  top: '47%',
  fontSize: '18px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  backgroundRepeat: 'repeat-x',
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderRadius: '50%',
  position: 'absolute',
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={nextArrowStyle} onClick={onClick}>
      <svg
        viewBox="0 0 18 18"
        role="img"
        aria-label="Previous"
        focusable="false"
        style={{
          height: '15px',
          width: '15px',
          display: 'block',
          fill: ' #1A1B1C',
          position: 'absolute',
          top: '33%',
          right: '12px',
        }}
      >
        <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={prevArrowStyle} onClick={onClick}>
      <svg
        viewBox="0 0 18 18"
        role="img"
        aria-label="Previous"
        focusable="false"
        style={{
          height: '15px',
          width: '15px',
          display: 'block',
          fill: ' #1A1B1C',
          position: 'absolute',
          top: '33%',
          left: '12px',
        }}
      >
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

class ListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
    currency: PropTypes.string,
    basePrice: PropTypes.number,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_',
    data: [],
    arrow: true,
  };
  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);

    this.state = {
      isBeginning: true,
      isEnd: false,
    };
  }

  goNext() {
    this.swiper.slideNext();
  }

  goPrev() {
    this.swiper.slidePrev();
  }
  progress() {
    if (!this.swiper) return;
    if (this.swiper.isEnd) {
      this.setState({ isEnd: true });
    } else if (this.swiper.isBeginning) {
      this.setState({ isBeginning: true });
    } else {
      this.setState({ isEnd: false, isBeginning: false });
    }
  }
  render() {
    const {
      id,
      listPhotos,
      size,
      formatURL,
      title,
      isMapShow,
      arrow,
      activityType,
      city,
      state,
      country,
      activityLogoTypeIdArray,
      dates
    } = this.props;
    const imagepath = `/images/upload/${size}`;
    const placeholderPath = `/images/upload/placeholder_`;
    let date = dates || '';
    const item = listPhotos != null &&
      listPhotos.length &&
      [listPhotos[0]][0]
      const listingURL = date ? `/space/${formatURL(title)}-${id}?c=${encode(
        activityType)
        } "&dates=${date}` : `/space/${formatURL(title)}-${id}?c=${encode(
          activityType)
          } "`;
    return (
      <div
        className={cx(
          s.listPhotoContainer,
          { [s.listPhotoContainerFullWidth]: isMapShow == false },
          'searchSwiper',
        )}
      >
        <div
          className={cx(s.sliderItem)}
          className={s.positionRelative}
        >
          <Link
            to={listingURL}
          >
            <div className={s.parent}>
              <div className={cx(s.children)}>
                <div className={s.content}>
                  <LazyLoadImage
                    src={`${imagepath}${item.name}`}
                    placeholderSrc={`${placeholderPath}${item.name}`}
                    className={cx(s.imageContent)}
                    placeholderClassName={cx(s.imageContent)}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
        {false && arrow && arrow == true && (
          <div className={'searchArrow'}>
            <SamplePrevArrow
              className={cx('hidden-xs hidden-sm')}
              onClick={this.goPrev}
            />
            <SampleNextArrow
              className={cx('hidden-xs hidden-sm')}
              onClick={this.goNext}
            />
          </div>
        )}
        <div className="clearBoth"></div>
        <Link
          to={listingURL}
          className={s.priceColor}
        >
          <div className="clearBoth"></div>
          <div className={s.nameAndFeatures}>
            <h3 className={s.nameAndFeaturesTitle}>{title}</h3>
            <p className={s.nameAndFeaturesAddress}>
              {`${city}, ${country}`}
            </p>
            {
              activityLogoTypeIdArray && activityLogoTypeIdArray.indexOf(1) !== -1 &&
              <img src={deskIcon} className={s.imgMarginRight} />
            }

            {
              activityLogoTypeIdArray && activityLogoTypeIdArray.indexOf(2) !== -1 &&
              <img src={LaungeIcon} className={cx(s.imgWhiteFilter, s.imgMarginRight)} />
            }

            {
              activityLogoTypeIdArray && activityLogoTypeIdArray.indexOf(3) !== -1 &&
              <img src={MeetingIcon} className={cx(s.imgWhiteFilter, s.imgMarginRight)} />
            }
          </div>
          <div className="clearBoth"></div>
          <div className={s.nameAndFeaturesShowMore}><FormattedMessage {...messages.showMore} /></div>
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(ListingPhotos);