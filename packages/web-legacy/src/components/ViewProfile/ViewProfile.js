import React from 'react'
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ViewProfile.css';

import Link from '../Link';
import Avatar from '../Avatar';
import PhoneVerificationModal from '../PhoneVerificationModal';

import messages from '../../locale/messages';

import ProfileIcon from '../../../public/NewIcon/profile.svg';
import EmailIcon from '../../../public/NewIcon/nounEmail.svg';
import LocationIcon from '../../../public/NewIcon/noun-postcode.svg';
import LockIcon from '../../../public/NewIcon/lock.svg';
import PhoneNumber from '../../../public/NewIcon/noun-phone.svg';
import company from '../../../public/SiteIcons/ic-company.svg';

class ViewProfile extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      location: PropTypes.string,
      picture: PropTypes.string.isRequired,
      profileId: PropTypes.number.isRequired,
    }).isRequired,
    isUser: PropTypes.bool,
    loadMore: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    data: {
      createdAt: new Date(),
      picture: null
    },
    isUser: false
  };

  render() {

    const { data, isUser } = this.props;
    const userType = data && data.profileBanStatus && data.profileBanStatus.userType;
    return (
      <div className={cx(s.pageContainer, s.space2, s.spaceTop4, 'ViewProfile')}>
        <div className={s.containerResponsive}>
          <Col md={12} lg={12} sm={12} xs={12}>
            <div>
              <h1 className={s.myProfileTitle}>{isUser ? <FormattedMessage {...messages.myProfile} /> : <FormattedMessage {...messages.userProfile}/>}</h1>
            </div>
          </Col>
          <Col md={8} lg={9} className={s.smPadding}>
            <Row className={s.space2}>
              <Col xs={12} sm={12} md={12} lg={12}>
                {isUser && <div className={cx(s.textAlignRight, s.space3)}>
                  <Link to={"/user/edit"} className={s.myProfileLink}>
                    <FormattedMessage {...messages.change} />
                  </Link>
                </div>}
                <div className={s.myprofileMargin}>
                  <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={ProfileIcon} className={s.imgMarginRight} /></span>
                      <span className={s.myprofileValues}>{data.firstName}</span>
                    </p>
                  </div>
                  <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={ProfileIcon} className={s.imgMarginRight} /></span>
                      <span className={s.myprofileValues}>{data.lastName}</span>
                    </p>
                  </div>
                  <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={EmailIcon} className={s.imgMarginRight} /></span>
                      <span className={s.myprofileValues}>{data.profileBanStatus && data.profileBanStatus.email}</span>
                    </p>
                  </div>
                  <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={LocationIcon} /></span>
                      <span className={s.myprofileValues}>{data.zipcode}</span>
                    </p>
                  </div>
                  {isUser && <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={LockIcon} className={s.imgMarginRight} /></span>
                      <span className={cx(s.myprofileValues, s.passWordSection)}>*******</span>
                    </p>
                  </div>}
                  {isUser && <div className={s.myprofileBorder}>
                    <div className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={PhoneNumber} className={s.imgMarginRight} /></span>
                      {(data && data.phoneNumber) ? <span className={cx(s.myprofileValues, s.blackColor)}>{data.countryCode && data.countryCode + ' '}{data.phoneNumber}</span>
                        : <span className={s.phoneModal}><PhoneVerificationModal /></span>}
                    </div>
                  </div>}
                  {!isUser && data && data.phoneNumber && <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={PhoneNumber} className={s.imgMarginRight} /></span>
                      <span className={cx(s.myprofileValues, s.blackColor)}>{data.countryCode && data.countryCode + ' '}{data.phoneNumber}</span>
                    </p>
                  </div>}
                  {userType === 1 && data && data.companyName && <div className={s.myprofileBorder}>
                    <p className={s.noMargin}>
                      <span className={s.myprofileIcons}><img src={company} alt={'company'} className={s.imgMarginRight} /></span>
                      <span className={cx(s.myprofileValues, s.blackColor)}>{data.companyName}</span>
                    </p>
                  </div>}
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} lg={3} className={s.spaceTop5}>
            <div className={cx(s.slideShow, s.space3, s.textalignCenter)}>
              <Avatar
                source={data.picture}
                isUser={isUser}
                className={s.imageContent}
              />
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  listSettingsData: state.adminListSettingsData.data,
  isAuthenticate: state.runtime.isAuthenticated
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(ViewProfile));