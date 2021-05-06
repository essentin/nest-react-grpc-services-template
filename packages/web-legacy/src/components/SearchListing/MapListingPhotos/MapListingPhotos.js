import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './MapListingPhotos.css';

import LazyLoadImage from '../../LazyLoadImage';

import { encode } from '../../../helpers/base64Encryption';

import deskIcon from '../../../../public/SiteIcons/desk.png';
import LaungeIcon from '../../../../public/NewIcon/lounge.svg';
import MeetingIcon from '../../../../public/NewIcon/meeting.svg';

import messages from '../../../locale/messages'

const nextArrowStyle = {
  right: '4px',
  color: ' #1A1B1C',
  zIndex: '0',
  width: '34px',
  height: '34px',
  top: '50%',
  fontSize: '18px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: '#fff',
  backgroundRepeat: 'repeat-x',
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%',
};

const prevArrowStyle = {
  left: '4px',
  color: ' #1A1B1C',
  zIndex: '1',
  width: '34px',
  height: '34px',
  top: '50%',
  fontSize: '18px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: '#fff',
  backgroundRepeat: 'repeat-x',
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderRadius: '50%',
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
          height: '13px',
          width: '13px',
          display: 'block',
          fill: ' #1A1B1C',
          position: 'absolute',
          top: '31%',
          right: '8px',
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
          height: '13px',
          width: '13px',
          display: 'block',
          fill: ' #1A1B1C',
          position: 'absolute',
          top: '31%',
          left: '8px',
        }}
      >
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

class MapListingPhotos extends React.Component {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  render() {
    const {
      id,
      listPhotos,
      size,
      formatURL,
      title,
      activityType,
      dates,
      city,
      state,
      activityLogoTypeIdArray,
      country
    } = this.props;
    let imagepath = '/images/upload/' + size;
    const placeholderPath = `/images/upload/placeholder_`;

    const item = listPhotos && listPhotos[0]
    return (
      <div className={cx(s.listPhotoContainer, 'mapListingPhotoSlider')}>
        {listPhotos != null && listPhotos.length && (
          <div>

            <div
              className={cx(
                'col-md-12 col-sm-12 col-xs-12',
                s.sliderItem,
                s.positionRelative,
              )}
            >
              <a
                href={`/space/${formatURL(title)}-${id}?c=${encode(
                  activityType)
                  } "&dates= ${dates}`}
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
              </a>
            </div>
            <a
              href={`/space/${formatURL(title)}-${id}?c=${encode(
                activityType,
              )}`}
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
            </a>

          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(MapListingPhotos);