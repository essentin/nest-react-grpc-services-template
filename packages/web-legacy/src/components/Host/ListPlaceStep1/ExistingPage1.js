// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Style
import { Button, Grid, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExistingPage.css';

import defaultPic from '../../../../public/SiteImages/vector.svg';

// Component
import Loader from '../../Loader/Loader';

// Redux action
import { ManagePublishStatus } from '../../../actions/Listing/ManagePublishStatus';
class ExistingPage1 extends Component {
  static propTypes = {
    listingSteps: PropTypes.shape({
      step1: PropTypes.string.isRequired,
      step2: PropTypes.string.isRequired,
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isReady: PropTypes.bool.isRequired,
        isPublished: PropTypes.bool.isRequired,
      }),
      user: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
    nextPage: PropTypes.any.isRequired,
    stepsLoading: PropTypes.bool,
    ManagePublishStatus: PropTypes.any.isRequired,
    publishListLoading: PropTypes.bool,
  };
  static defaultProps = {
    listingSteps: {
      step1: 'inactive',
      step2: 'inactive',
      step3: 'inactive',
      step4: 'active',
      listing: {
        id: 0,
        isReady: false,
        isPublished: false,
      },
      user: {
        userBanStatus: 0,
      },
    },
    photosCount: 0,
    stepsLoading: false,
    publishListLoading: false,
  };
  render() {
    const {
      nextPage,
      listingSteps,
      photosCount,
      stepsLoading,
      account,
      publishListLoading,
    } = this.props;
    const { formatMessage } = this.props.intl;
    if (stepsLoading) {
      return <Loader type={'text'} />;
    }
    const {
      listingSteps: {
        listing: { id, isReady, isPublished, user },
      },
    } = this.props;

    let userDelete = user && user.userDeletedAt;
    let isShowButton = false,
      stepOneCircle = false,
      stepTwoCircle = false,
      stepThreeCircle = false;
    let stepFour = false;

    if (!userDelete) {
      isShowButton = true;
    } else {
      isShowButton = false;
    }

    let userBanStatusValue;
    if (user) {
      const {
        listingSteps: {
          listing: {
            user: { userBanStatus },
          },
        },
      } = this.props;
      userBanStatusValue = userBanStatus;
    }
    const {
      listingSteps: { step1, step2, step3, step4 },
    } = this.props;
    const { ManagePublishStatus } = this.props;
    let isPhotoAvailable = false;
    if (photosCount > 0) {
      isPhotoAvailable = true;
    }

    if (step1 == 'completed') {
      stepOneCircle = true;
    }
    if (step2 == 'completed' && isPhotoAvailable) {
      stepTwoCircle = true;
    }
    if (step4 == 'completed') {
      stepThreeCircle = true;
    }

    if (step3 == 'active') {
      stepFour = true;
    }

    if (step3 == 'completed' && step4 == 'active') {
      stepFour = true;
    }

    return (
      <div className={cx(s.mainSectionPadding, 'noPaddingBottom')}>
        <Grid fluid className={s.landingContainer}>
          <Row>
            <Col xs={12} sm={7} md={7} lg={7}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <h3 className={s.landingTitle}>
                  <FormattedMessage {...messages.step1Heading} />
                </h3>
              </Col>
              <div>
                <div className={cx(s.displayTable)}>
                  <div className={s.displayTableRow}>
                    <div className={s.contentSection}>
                      <div className={cx(s.displayTableCell, s.contentWidth)}>
                        <h3 className={s.landingSubTitle}>
                          <span className={s.step}>
                            <FormattedMessage {...messages.step1HeadingNew} /> :{' '}
                          </span>
                          <FormattedMessage {...messages.Sayyourspace} />
                        </h3>
                        <p className={cx(s.landingTitleStep)}>
                          <span>
                            <FormattedMessage
                              {...messages.step1HeadingContent}
                            />
                          </span>
                        </p>
                      </div>
                      <div className={cx(s.displayTableCell, s.btnWidth)}>
                        {step1 == 'active' && (
                          <Button
                            className={cx(s.button, s.btnPrimary, s.btnlarge)}
                            onClick={() => nextPage('location')}
                          >
                            <FormattedMessage {...messages.continue} />
                          </Button>
                        )}
                        {step1 == 'completed' && (
                          <a
                            href="javascript:void(0);"
                            className={cx(
                              s.button,
                              s.btnPrimaryBorder,
                              s.btnlarge,
                              s.link,
                            )}
                            onClick={() => nextPage('location')}
                          >
                            <FormattedMessage {...messages.change} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={cx(s.displayTable)}>
                  <div className={s.displayTableRow}>
                    <div className={s.contentSection}>
                      <div className={cx(s.displayTableCell, s.contentWidth)}>
                        <h3 className={s.landingSubTitle}>
                          <span className={s.step}>
                            <FormattedMessage {...messages.step2Heading} /> :{' '}
                          </span>
                          <FormattedMessage {...messages.step2SubHeading} />
                        </h3>
                        <p className={cx(s.landingTitleStep)}>
                          <span>
                            <FormattedMessage
                              {...messages.step2HeadingContent}
                            />
                          </span>
                        </p>
                      </div>
                      <div className={cx(s.displayTableCell, s.btnWidth)}>
                        {step2 == 'active' && (
                          <Button
                            className={cx(s.button, s.btnPrimary, s.btnlarge)}
                            onClick={() => nextPage('about-your-space')}
                          >
                            <FormattedMessage {...messages.continue} />
                          </Button>
                        )}
                        {step2 == 'completed' && (
                          <a
                            href="javascript:void(0);"
                            className={cx(
                              s.button,
                              s.btnPrimaryBorder,
                              s.btnlarge,
                              s.link,
                            )}
                            onClick={() => nextPage('about-your-space')}
                          >
                            <FormattedMessage {...messages.change} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={cx(s.displayTable)}>
                  <div className={s.displayTableRow}>
                    <div className={s.contentSection}>
                      <div className={cx(s.displayTableCell, s.contentWidth)}>
                        <h3 className={s.landingSubTitle}>
                          <span className={s.step}>
                            <FormattedMessage {...messages.step3Heading} /> :{' '}
                          </span>
                          <FormattedMessage {...messages.step3SubHeading} />
                        </h3>
                        <p className={cx(s.landingTitleStep)}>
                          <span>
                            <FormattedMessage
                              {...messages.step3HeadingContent}
                            />
                          </span>
                        </p>
                      </div>
                      <div className={cx(s.displayTableCell, s.btnWidth)}>
                        {stepFour == true && (
                          <Button
                            className={cx(s.button, s.btnPrimary, s.btnlarge)}
                            onClick={() => nextPage('availability')}
                          >
                            <FormattedMessage {...messages.continue} />
                          </Button>
                        )}
                        {step4 == 'completed' && (
                          <a
                            href="javascript:void(0);"
                            className={cx(
                              s.button,
                              s.btnPrimaryBorder,
                              s.btnlarge,
                              s.link,
                            )}
                            onClick={() => nextPage('availability')}
                          >
                            <FormattedMessage {...messages.change} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {listingSteps &&
                isReady &&
                !isPublished &&
                !userBanStatusValue &&
                isShowButton && (
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <h3 className={cx(s.spaceTop1, s.space3, s.publishText)}>
                      <FormattedMessage {...messages.readyToPublish} />
                    </h3>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={cx(s.spaceTop3, s.noPadding)}
                    >
                      <div className={s.displayInline}>
                        <Loader
                          type={'button'}
                          className={cx(
                            s.button,
                            s.btnPrimary,
                            s.btnlarge,
                            s.marinRight,
                            s.publishBtn,
                          )}
                          handleClick={() => ManagePublishStatus(id, 'publish')}
                          // disabled={disabled}
                          show={publishListLoading}
                          label={formatMessage(messages.publishNow)}
                        />
                      </div>
                      <a
                        href={'/space/' + id + '/preview'}
                        className={cx(
                          s.button,
                          s.btnPrimaryBorder,
                          s.btnlarge,
                          s.link,
                          s.prelinkMobile,
                        )}
                      >
                        <FormattedMessage {...messages.previewListing} />
                      </a>
                    </Col>
                  </Col>
                )}
              {listingSteps &&
                isReady &&
                isPublished &&
                !userBanStatusValue &&
                isShowButton && (
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <h3 className={cx(s.spaceTop1, s.space3, s.publishText)}>
                      <FormattedMessage {...messages.listingPublished} />
                    </h3>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={cx(s.spaceTop3, s.noPadding)}
                    >
                      <div className={s.displayInline}>
                        <Loader
                          type={'button'}
                          className={cx(
                            s.button,
                            s.btnPrimary,
                            s.btnlarge,
                            s.marinRight,
                            s.publishBtn,
                          )}
                          handleClick={() =>
                            ManagePublishStatus(id, 'unPublish')
                          }
                          // disabled={disabled}
                          show={publishListLoading}
                          label={formatMessage(messages.unPublishNow)}
                        />
                      </div>
                      <a
                        href={'/space/' + id + '/preview'}
                        className={cx(
                          s.button,
                          s.btnPrimaryBorder,
                          s.btnlarge,
                          s.link,
                          s.prelinkMobile,
                        )}
                      >
                        <FormattedMessage {...messages.previewListing} />
                      </a>
                    </Col>
                  </Col>
                )}
              {userBanStatusValue == true && isShowButton && (
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={cx(s.spaceTop3, s.noPadding)}
                  >
                    <a
                      href={'/space/' + id + '/preview'}
                      className={cx(
                        s.button,
                        s.btnPrimaryBorder,
                        s.btnlarge,
                        s.link,
                        s.prelinkMobile,
                      )}
                    >
                      <FormattedMessage {...messages.previewListing} />
                    </a>
                  </Col>
                </Col>
              )}
            </Col>

            <Col xs={12} sm={5} md={5} lg={5} className={'hidden-xs'}>
              <div>
                <div>
                  <img
                    src={defaultPic}
                    className={s.imageSection}
                    alt="defaultPicture"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  stepsLoading: state.location.stepsLoading,
  account: state.account.data,
  publishListLoading: state.location.publishListLoading,
});
const mapDispatch = {
  ManagePublishStatus,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ExistingPage1)),
);
