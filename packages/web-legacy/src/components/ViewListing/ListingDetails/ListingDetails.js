import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Row,
  Col,
  Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import s from './ListingDetails.css';

import ListItem from './ListItem';
import Rules from './Rules';
import LocationMap from '../LocationMap/LocationMap';

import messages from '../../../locale/messages';

import { getSpecificSettings } from '../../../actions/getSpecificSettings';

import { checkValue } from './helper';
import { formatTime } from '../../../helpers/timeHelper';

import LoungeIcon from '../../../../public/NewIcon/lounge.svg';
import DeskIcon from '../../../../public/NewIcon/desk.svg';
import MeetingIcon from '../../../../public/NewIcon/meeting.svg';

const renderOperatingHours = (day) => {
  // if (day.isWholeDay == 'true' && day.isOpen == true) {
  //   return (
  //     <div className={s.hoursDisplayInline}>
  //       <div className={s.space2}>
  //         <div>
  //           <p className={cx(s.timeText)}><FormattedMessage {...messages.allDayHours} /></p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // } else if (day.isWholeDay == 'false' && day.isOpen == true) {
  //   return (
  //     <div className={s.hoursDisplayInline}>
  //       <div className={s.space2}>
  //         {
  //           day.timeSlot && day.timeSlot.length > 0 && day.timeSlot.map((value, index2) => {
  //             return (
  //               <div>
  //                 <p className={cx(s.timeText)}>{formatTime(value.startTime)} - {formatTime(value.endTime)}</p>
  //               </div>
  //             )
  //           })
  //         }
  //       </div>
  //     </div>
  //   )
  // } else 
  if (!day.isOpen) {
    return (
      <div className={s.hoursDisplayInline}>
        <div className={s.space2}>
          <div>
            <p className={cx(s.timeText)}>(<FormattedMessage {...messages.closedLabel} />)</p>
          </div>
        </div>
      </div>
    )
  } else {
    return <span></span>;
  }
}

const renderOpeningHours = (day, spaceOpeningHours) => {
  let openingHour = spaceOpeningHours.find(element => element.day === day);
  if (openingHour && (openingHour.startTime || openingHour.startTime === 0) && openingHour.endTime) {
    return (
      <div className={s.hoursDisplayInline}>
        <div className={s.space2}>
          <div>
            <p className={cx(s.timeText)}>({formatTime(openingHour.startTime, true)} - {openingHour.endTime === 24 ? '23.59' : formatTime(openingHour.endTime, true)})</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <span></span>;
  }
}

class ListingDetails extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      listingData: PropTypes.shape({
        cancellation: PropTypes.shape({
          policyName: PropTypes.string.isRequired,
          policyContent: PropTypes.string.isRequired
        })
      })
    }),
    getSpecificSettings: PropTypes.any,
    settingsData: PropTypes.object,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    isHost: false,
    description: []
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openArrival: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickArrival = this.handleClickArrival.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  handleClickArrival() {
    this.setState({ openArrival: !this.state.openArrival })
  }

  render() {
    const { data, hostDetails, activity } = this.props;
    const { open, openArrival } = this.state;
    const { formatMessage } = this.props.intl;
    let userAmenities = [], userSafetyAmenities = [], parkingOptions = [];
    let description;
    userAmenities = checkValue(data.userAmenities, []);
    userSafetyAmenities = checkValue(data.userSafetyAmenities, []);
    description = checkValue(data.description, '');
    parkingOptions = checkValue(data.parkingOptions, []);

    let count = 150, firstArray, restArray, dotString = false;
    if (description) {
      firstArray = description.slice(0, count);
      restArray = description.slice(count, description.length);
    }
    if (restArray && restArray.length > 0) {
      dotString = true;
    }

    let getWholeDay = data.spaceAvailability.filter(i => (i.isWholeDay == 'true' && i.isOpen == true));

    let getSlotDay = data.spaceAvailability.filter(i => (i.isWholeDay == 'false' && i.isOpen == true));

    let getClosedDay = data.spaceAvailability.filter(i => (i.isOpen == false));

    let spaceAvailabilityData = data && data.spaceAvailability.length > 0 && data.spaceAvailability || [];

    let spaceOpeningHours = data && data.spaceOpeningTime && data.spaceOpeningTime.length > 0 && data.spaceOpeningTime || [];

    let instruction;
    instruction = checkValue(data.arrivalInstruction, '');

    let count2 = 150, firstArray2, restArray2, dotString2 = false;
    if (instruction) {
      firstArray2 = instruction.slice(0, count);
      restArray2 = instruction.slice(count, instruction.length);
    }
    if (restArray2 && restArray2.length > 0) {
      dotString = true;
    }
    return (
      <Row className={cx(s.pageContent)}>
        <div className={cx(s.horizontalLineThrough)}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className={s.space4}>
              {activity.map(({ activityName, activityType }) => (
                <div className={s.itemBorder}>
                  <div>
                    <div className={cx(s.displayTableCellList, s.iconWidth)}>
                      <img
                        src={
                          +activityType === 1
                            ? DeskIcon
                            : +activityType === 2
                              ? LoungeIcon
                              : MeetingIcon
                        }
                        className={s.listImg}
                      />
                    </div>
                    <div className={cx(s.displayTableCellList, s.textWidth)}>
                      {activityName}
                    </div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              <h2 className={cx(s.sectionTitleText)}>
                {' '}
                <FormattedMessage {...messages.aboutListing} />
              </h2>
              <div>
                <p className={cx(s.listingFontSize, s.wordBreak)}>
                  {!this.state.open && count >= 150 && dotString === true && (
                    <span className={cx(s.subText, s.lineBreak)}>
                      {' '}
                      {firstArray} ...
                    </span>
                  )}
                  {!this.state.open && count >= 150 && dotString === false && (
                    <span className={cx(s.subText, s.lineBreak)}>
                      {' '}
                      {firstArray}
                    </span>
                  )}
                  {restArray && restArray.length > 0 && (
                    <span>
                      <Collapse in={open}>
                        <div>
                          {' '}
                          <span className={cx(s.subText, s.lineBreak)}>
                            {firstArray} {restArray}
                          </span>
                        </div>
                      </Collapse>
                      {dotString && (
                        <div className={s.btnContainer}>
                          <div className={s.showHidePadding}>
                            <Button
                              bsStyle="link"
                              className={cx(
                                s.button,
                                s.noPadding,
                                s.btnLInk,
                                s.showHideBtn,
                              )}
                              onClick={() => this.handleClick()}
                            >
                              {this.state.open ? (
                                <FormattedMessage
                                  {...messages.hideDescription}
                                />
                              ) : (
                                <FormattedMessage
                                  {...messages.showDescription}
                                />
                              )}

                              {this.state.open && (
                                <FontAwesome.FaAngleUp
                                  className={s.navigationIcon}
                                />
                              )}

                              {!this.state.open && (
                                <FontAwesome.FaAngleDown
                                  className={s.navigationIcon}
                                />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </span>
                  )}
                </p>
              </div>

              <div>
                <Rules
                  parkingOptions={parkingOptions}
                  isParking={data.isParking}
                  parkingDescription={data.parkingDescription}
                  houseRuleDesc={data.houseRuleDesc}
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} className={'hidden-xs'}>
              <div>
                <h2 className={cx(s.sectionTitleText)}>
                  <FormattedMessage {...messages.viewListingContact} />
                </h2>
                <p>
                  {data && data.contactName && (
                    <span>
                      {data.contactName}
                    </span>
                  )}
                </p>
                <p>
                  {data && data.contactPhoneNumber && (
                    <span>
                      {data.contactDialCode}{' '}
                      {data.contactPhoneNumber}
                    </span>
                  )}
                </p>
                <p>
                  {data && data.contactEmail && (
                    <span>
                      {data.contactEmail}
                    </span>
                  )}
                </p>
              </div>
            </Col>
          </Row>
          <hr className={s.hrMargin} />
          {/* <h3 className={cx(s.sectionTitleText)}><FormattedMessage {...messages.includeBookings} /></h3> */}
          <div>
            <Row>
              {userAmenities && userAmenities.length > 0 && (
                <Col
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  className={s.mobileMarginBottom}
                >
                  <div>
                    <ListItem
                      itemList={userAmenities}
                      hideImg={false}
                      label={formatMessage(messages.aminities)}
                      showLabel={formatMessage(messages.showAmenities)}
                      hideLabel={formatMessage(messages.closeAmenities)}
                    />
                  </div>
                </Col>
              )}
              {userSafetyAmenities.length > 0 && (
                <Col
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  className={s.mobileMarginBottom}
                >
                  <div>
                    <ListItem
                      itemList={userSafetyAmenities}
                      hideImg={false}
                      label={formatMessage(messages.safetyFeatures)}
                      showLabel={formatMessage(messages.showAllSafetyFeatures)}
                      hideLabel={formatMessage(messages.closeSafetyFeatures)}
                    />
                  </div>
                </Col>
              )}
              <Col xs={12} sm={4} md={4} lg={4}>
                <div>
                  <p className={cx(s.textMutedNew, s.space2)}>
                    <FormattedMessage {...messages.operationHours} />
                  </p>
                </div>
                {spaceAvailabilityData &&
                  spaceAvailabilityData.length > 0 &&
                  spaceAvailabilityData.map((item) => (
                    <div>
                      <div className={s.hoursDisplayInline}>
                        <p
                          className={cx(
                            s.timeText,
                            s.wordBreak,
                            s.hourPaddingRight,
                          )}
                        >
                          {messages[item.day] && <FormattedMessage {...messages[item.day]} />}
                          {!messages[item.day] && item.day}
                        </p>
                      </div>
                      {
                        !item.isOpen ? renderOperatingHours(item) : renderOpeningHours(item.day, spaceOpeningHours)
                      }
                    </div>
                  ))}
              </Col>
            </Row>
            <hr className={s.hrMargin} />
          </div>
        </div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={'visible-xs'}>
            <div>
              <h2 className={cx(s.sectionTitleText)}>
                <FormattedMessage {...messages.viewListingContact} />
              </h2>
              <p>
                {data && data.contactName && (
                  <span>
                    {data.contactName}
                  </span>
                )}
              </p>
              <p>
                {data && data.contactPhoneNumber && (
                  <span>
                    {data.contactDialCode}{' '}{data.contactPhoneNumber}
                  </span>
                )}
              </p>
              <p>
                {data && data.contactEmail && <span>{data.contactEmail}</span>}
              </p>
            </div>
          </Col>
        </Row>
        <div className={cx('visible-xs', 'visible-sm', s.mapMargin)}>
          <LocationMap data={data} />
        </div>
        {instruction && (
          <div className={cx(s.horizontalLineThrough)}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <p className={cx(s.sectionTitleText)}>
                  <FormattedMessage {...messages.arrivalInstruction} />
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Row>
                  <Col md={12} lg={12}>
                    <p className={cx(s.listingFontSize, s.wordBreak)}>
                      {!this.state.openArrival &&
                        count2 >= 150 &&
                        dotString2 === true && (
                          <span className={cx(s.subText, s.lineBreak)}>
                            {' '}
                            {firstArray2} ...
                          </span>
                        )}
                      {!this.state.openArrival &&
                        count2 >= 150 &&
                        dotString2 === false && (
                          <span className={cx(s.subText, s.lineBreak)}>
                            {' '}
                            {firstArray2}
                          </span>
                        )}
                      {restArray2 && restArray2.length > 0 && (
                        <span>
                          <Collapse in={openArrival}>
                            <div>
                              {' '}
                              <span className={cx(s.subText, s.lineBreak)}>
                                {firstArray2} {restArray2}
                              </span>
                            </div>
                          </Collapse>
                          {dotString && (
                            <div className={s.btnContainer}>
                              <div className={s.showHidePadding}>
                                <Button
                                  bsStyle="link"
                                  className={cx(
                                    s.button,
                                    s.noPadding,
                                    s.btnLInk,
                                    s.showHideBtn,
                                  )}
                                  onClick={() => this.handleClickArrival()}
                                >
                                  {this.state.openArrival ? (
                                    <FormattedMessage
                                      {...messages.hideDescription}
                                    />
                                  ) : (
                                    <FormattedMessage
                                      {...messages.showDescription}
                                    />
                                  )}

                                  {this.state.openArrival && (
                                    <FontAwesome.FaAngleUp
                                      className={s.navigationIcon}
                                    />
                                  )}

                                  {!this.state.openArrival && (
                                    <FontAwesome.FaAngleDown
                                      className={s.navigationIcon}
                                    />
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}
                        </span>
                      )}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr className={s.hrMargin} />
          </div>
        )}
        {data && data.listingData && data.listingData.cancellation && (
          <div className={cx(s.horizontalLineThrough)}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <p className={s.sectionTitleText}>
                  <FormattedMessage {...messages.inCaseOfCancellation} />
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Row>
                  <Col md={12} lg={12}>
                    <p className={s.listingFontSize}>
                      <span className={cx(s.text)}>
                        {data.listingData.cancellation.policyContent}
                      </span>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Row>
    );
  }
}

const mapState = (state) => ({
  settingsData: state.viewListing.settingsData
});

const mapDispatch = {
  getSpecificSettings
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingDetails)));