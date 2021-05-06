import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import { reset, initialize } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewListing.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

import Photos from '../../components/ViewListing/Photos';
import ListingIntro from '../../components/ViewListing/ListingIntro';
import Calendar from '../../components/ViewListing/Calendar';
import ListingDetails from '../../components/ViewListing/ListingDetails';
import LocationMap from '../../components/ViewListing/LocationMap';
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import BookingModal from '../../components/ViewListing/BookingModal';
import CardForm from '../../components/CardForm';

import BlockedDatesQuery from './BlockedDates.graphql';
import ListingDataQuery from './getListingData.graphql';

import { openBookingModal } from '../../actions/BookingModal/modalActions';
import { openViewListAddCardModal } from '../../actions/modalActions';
import {
  setListingActivities, setSelectedActivity, resetListingActivities,
  resetSelectedActivity, resetSelectedActivityType
} from '../../actions/Activities/handleActivies';

import messages from '../../locale/messages';

class ViewListing extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    preview: PropTypes.bool,
    isAdmin: PropTypes.bool,
    account: PropTypes.shape({
      userId: PropTypes.string,
      userBanStatus: PropTypes.number,
    }),
    ListingBlockedDates: PropTypes.shape({
      loading: PropTypes.bool,
      UserListing: PropTypes.shape({
        blockedDates: PropTypes.array
      })
    }),
    getListingData: PropTypes.shape({
      loading: PropTypes.bool,
      UserListing: PropTypes.object
    }),
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    openBookingModal: PropTypes.func,
  };

  static defaultProps = {
    getListingData: {
      loading: false,
      UserListing: {
        userId: null
      }
    },
    ListingBlockedDates: {
      loading: true,
      UserListing: {
        blockedDates: []
      }
    },
    account: {
      userId: null,
      userBanStatus: 0,
    },
    getListingData: {
      loading: false,
      getReservationActivity: {
        userId: null
      }
    },
    isAdmin: false
  }

  constructor(props) {
    super(props);

    this.state = {
      smallDevice: false
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    // let isBrowser = typeof window !== 'undefined';
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      let smallDevice = window.matchMedia('(max-width: 1199px)').matches;
      if (smallDevice) {
        this.setState({ smallDevice });
      }
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    const { resetListingActivities, resetSelectedActivity, resetSelectedActivityType } = this.props;
    resetSelectedActivityType()
    resetListingActivities()
    resetSelectedActivity()
  }

  handleResize(e) {
    const isBrowser = typeof window !== 'undefined';
    const smallDevice = isBrowser ? window.matchMedia('(max-width: 991px)').matches : undefined;
    if (smallDevice) {
      this.setState({ smallDevice });
    }
  }

  render() {
    const { title, getListingData: { loading, UserListing }, preview } = this.props;
    const { ListingBlockedDates } = this.props;
    const { openBookingModal, startDate, activityType } = this.props;
    const { account: { userId, userBanStatus }, isAdmin, account } = this.props;
    const { viewListCardStatus, listActivities, selectedActivity, filterActivityType } = this.props;
    const { setListingActivities, setSelectedActivity } = this.props;
    const { smallDevice } = this.state;
    const isBrowser = typeof window !== 'undefined';
    let selectedActivityType;
    let activityData, activityDataId;
    let isHost = false;
    if (isBrowser && loading && !UserListing) {
      return <Loader type="text" />
    }



    if (UserListing) {
      if (userId && userId === UserListing.userId) {
        isHost = true;
      } else if (isAdmin) {
        isHost = true;
      }
    }

    if (preview && !isHost) {
      return <NotFound title={title} />
    }

    if (!loading && !UserListing) {
      return <NotFound title={title} />
    }

    if (smallDevice) {
      openBookingModal();
    }

    let reviewsCount = UserListing.reviewsCount;
    let reviewsStarRating = UserListing.reviewsStarRating;

    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }

    if (UserListing.activity && UserListing.activity.length > 0) {
      selectedActivityType = activityType ? activityType : (filterActivityType ? filterActivityType : UserListing.activity[0].activityType);
      const activityList = UserListing.activity;
      const activityValue = UserListing.activity.find(o => o.activityType == selectedActivityType);
      activityData = activityValue;
      setListingActivities(activityList)
      setSelectedActivity(activityValue)
    }

    if (!selectedActivity || !listActivities) {
      return <Loader type="text" />
    }

    if (selectedActivity) {
      activityData = selectedActivity;
      activityDataId = selectedActivity.id;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            UserListing && <div>
              <div className={s.pageContainer}>
                <Photos
                  data={UserListing}
                  loading={loading}
                  activityType={selectedActivityType}
                />
                <Grid fluid className={cx(s.horizontalLineThrough, s.listDetailsPadding)}>
                  <Row className={cx(s.pageContent)}>
                    <Col xs={12} sm={12} md={8} lg={8} className={s.responsiveNoPadding}>
                      <Row>
                        <Grid fluid>
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.listingIntroSection)}>
                              <ListingIntro data={UserListing}
                                reviewsCount={UserListing.reviewsCount}
                                reviewsStarRating={UserListing.reviewsStarRating}
                                activity={UserListing.activity}
                                spaceSize={UserListing.spaceSize}
                                activityData={activityData}
                                id={UserListing.id}
                                userId={UserListing.userId}
                                hostEmail={UserListing.user.email}
                                city={UserListing.city}
                                listingData={UserListing.listingData || undefined}
                                profile={UserListing.user.profile || undefined}
                                blockedDates={
                                  ListingBlockedDates.UserListing != null ?
                                    ListingBlockedDates.UserListing.blockedDates : undefined
                                }
                                isHost={isHost}
                                userBanStatus={userBanStatus}
                              />
                            </Col>
                          </Row>
                        </Grid>
                        <Grid fluid className={cx(s.horizontalLineThrough, s.noBorder)}>
                          <ListingDetails
                            data={UserListing}
                            activity={UserListing.activity}
                            isHost={isHost}
                            userBanStatus={userBanStatus}
                            hostDetails={UserListing.user}
                          />
                        </Grid>
                      </Row>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className={s.positionSticky}>
                      {
                        !smallDevice && !loading && <div className={cx(s.responsiveNopadding, 'hidden-xs hidden-sm')}>
                          {account && viewListCardStatus && <div className={'viewListingCard'}>
                            <div>
                              <h1 className={s.paymentTitle}>
                                <FormattedMessage {...messages.addCardForPayment} />
                              </h1>
                            </div>
                            <Elements>
                              <CardForm
                                listId={UserListing.id}
                                activityId={activityDataId}
                                activityType={selectedActivityType}
                                activityData={activityData}
                                page={'viewListing'}
                              />
                            </Elements>
                          </div>}
                          {!viewListCardStatus && <Calendar
                            id={UserListing.id}
                            loading={ListingBlockedDates.loading}
                            blockedDates={
                              ListingBlockedDates.UserListing != null ?
                                ListingBlockedDates.UserListing.blockedDates : undefined
                            }
                            activityData={activityData}
                            listingData={UserListing.listingData || undefined}
                            isHost={isHost}
                            bookingType={UserListing.bookingType}
                            userBanStatus={userBanStatus}
                            startDate={startDate}
                            reviewsCount={UserListing.reviewsCount}
                            reviewsStarRating={UserListing.reviewsStarRating}
                            activityId={activityDataId}
                            activityType={selectedActivityType}
                            title={UserListing.title}
                            blockedDays={UserListing && UserListing.spaceAvailability}
                          />}
                        </div>
                      }
                      {
                        !smallDevice && loading && <div className={cx(s.webDevice, s.responsiveNopadding, 'hidden-xs hidden-sm')}>
                          {account && viewListCardStatus && <div className={'viewListingCard'}>
                            <div>
                              <h1 className={s.paymentTitle}><FormattedMessage {...messages.addCardForPayment} /></h1>
                            </div>
                            <CardForm page={'viewListing'} />
                          </div>}
                          {!viewListCardStatus && <Calendar
                            id={UserListing.id}
                            loading={ListingBlockedDates.loading}
                            blockedDates={
                              ListingBlockedDates.UserListing != null ?
                                ListingBlockedDates.UserListing.blockedDates : undefined
                            }
                            activityData={activityData}
                            listingData={UserListing.listingData || undefined}
                            isHost={isHost}
                            bookingType={UserListing.bookingType}
                            userBanStatus={userBanStatus}
                            startDate={startDate}
                            reviewsCount={UserListing.reviewsCount}
                            reviewsStarRating={UserListing.reviewsStarRating}
                            activityId={activityDataId}
                            activityType={selectedActivityType}
                            title={UserListing.title}
                            blockedDays={UserListing && UserListing.spaceAvailability}
                          />}
                        </div>
                      }
                      {!smallDevice && <div className={s.locationMarginTop}>
                        <Grid fluid className={cx(s.noPadding)}>
                          <LocationMap data={UserListing} />
                        </Grid>
                      </div>}
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div id='bookingModal' >
                <Grid fluid>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.mobileMargin)}>
                      <BookingModal
                        id={UserListing.id}
                        loading={ListingBlockedDates.loading}
                        blockedDates={
                          ListingBlockedDates.UserListing != null ?
                            ListingBlockedDates.UserListing.blockedDates : undefined
                        }
                        listingData={UserListing.listingData || undefined}
                        isHost={isHost}
                        bookingType={UserListing.bookingType}
                        reviewsCount={UserListing.reviewsCount}
                        reviewsStarRating={UserListing.reviewsStarRating}
                        activityData={activityData}
                        activityId={activityDataId}
                        activityType={selectedActivityType}
                        title={UserListing && UserListing.title}
                        blockedDays={UserListing && UserListing.spaceAvailability}
                      />
                    </Col>
                  </Row>
                </Grid>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
  isAdmin: state.runtime.isAdminAuthenticated,
  viewListCardStatus: state.modalStatus.viewListCardModalStatus,
  listActivities: state.activityType.listActivities,
  selectedActivity: state.activityType.selectedActivity,
  activityType: state.activityType.selectedActivityType,
  filterActivityType: state.activityType.filterActivityType,
});

const mapDispatch = {
  openBookingModal,
  openViewListAddCardModal,
  setListingActivities,
  setSelectedActivity,
  reset,
  initialize,
  resetListingActivities,
  resetSelectedActivity,
  resetSelectedActivityType
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(ListingDataQuery,
    {
      name: 'getListingData',
      options: (props) => ({
        variables: {
          listId: props.listId,
          preview: props.preview,
        },
        fetchPolicy: 'network-only',
        ssr: true
      })
    }
  ),
  graphql(BlockedDatesQuery,
    {
      name: 'ListingBlockedDates',
      options: (props) => ({
        variables: {
          listId: props.listId,
          preview: props.preview,
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }
  )
)(ViewListing);