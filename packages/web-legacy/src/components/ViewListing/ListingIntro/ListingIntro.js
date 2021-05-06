import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingIntro.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import Avatar from '../../Avatar';
import StarRating from '../../StarRating';
import Link from '../../Link';


//Images
import HomeIcon from './home.svg';
import Building from './hotel.svg';
import User from './user.svg';
import Slumber from './slumber.svg';
import SqureFeetIcon from '../../../../public/SiteIcons/sq-ft.png';
import PeopleIcon from '../../../../public/SiteIcons/people.png';
import LocationIcon from '../../../../public/SiteIcons/loaction.png';

import { connect } from 'react-redux';

class ListingIntro extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
    isHost: PropTypes.bool.isRequired,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    isHost: false,
    description: []
  };

  render() {
    const { data, isHost, userBanStatus } = this.props;
    const { formatMessage } = this.props.intl;
    const { reviewsCount, reviewsStarRating, activityData, spaceSize, activity } = this.props;

    const { hostEmail } = this.props;
    const { id, userId, city, blockedDates } = this.props;
    const { profile: { profileId, firstName, picture } } = this.props;

    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    let initialValues = {
      listId: id,
      host: userId,
      hostEmail,
      firstName,
      extendDay: [{}],
      activityData,
      title: data && data.title,
      activity
    };

    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className={cx(s.titleText, s.space1, s.spaceTop1)}>
              {data.title + ' ' + formatMessage(messages.in) + ' ' + data.city}
            </h1>
            <div className={cx(s.space2, s.displayInlineBlock, s.noMarginBottomMob)}>
              <p className={cx(s.textMuted, s.space1)}>
                <span>
                  <img src={LocationIcon} className={s.locationIcon} />
                </span>
                <span className={s.vtrMiddle}>
                  {data.buildingName && <span>{data.buildingName},</span>} {data.street}, {data.city}, {data.country}
                </span>
              </p>
            </div>
          </Col>
        </Row>
        <hr className={cx(s.hrMargin, s.noMarginBottom)} />
      </div>
    );
  }
}

const mapState = (state) => ({

});

const mapDispatch = {

};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingIntro)));