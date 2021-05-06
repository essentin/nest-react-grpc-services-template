import React from 'react';

import { graphql, compose } from 'react-apollo';
import { Elements } from 'react-stripe-elements';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { change, initialize, reset } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './CalendarContainer.css';

import Calendar from '../../ViewListing/Calendar/Calendar';
import Loader from '../../Loader';
import CardForm from '../../CardForm';

import ListingDataQuery from './getListingData.graphql';
import { getTimesLookup } from '../../../actions/Listing/getTimesLookup';

import {
  setListingActivities, setSelectedActivity,
  resetListingActivities, resetSelectedActivity, resetSelectedActivityType
} from '../../../actions/Activities/handleActivies';

class CalendarContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { initialize, getTimesLookup, listId, getListingData: { loading, UserListing } } = this.props;
    const { activityType, filterActivityType, setListingActivities, setSelectedActivity } = this.props;
    const initialValues = { extendDay: [{}], spaceURL: '' };

    initialize('BookingForm', initialValues, true)
    getTimesLookup(Number(listId), 0)

    if (!loading && UserListing) {
      const selectedActivityType = activityType ? activityType : (filterActivityType ? filterActivityType : UserListing.activity[0].activityType);

      if (UserListing && UserListing.activity && UserListing.activity.length > 0) {
        const activityList = UserListing.activity;
        const activityValue = UserListing.activity.find(o => o.activityType == selectedActivityType);
        setListingActivities(activityList)
        setSelectedActivity(activityValue)
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { getListingData: { loading, UserListing }, listActivities, selectedActivity } = this.props;
    const { activityType, filterActivityType, setListingActivities, setSelectedActivity } = this.props;

    if (!loading && UserListing && UserListing.activity && UserListing.activity.length > 0 && (!selectedActivity || !listActivities)) {
      const selectedActivityType = activityType ? activityType : (filterActivityType ? filterActivityType : UserListing.activity[0].activityType);
      const activityList = UserListing.activity;
      const activityValue = UserListing.activity.find(o => o.activityType == selectedActivityType);
      setListingActivities(activityList)
      setSelectedActivity(activityValue)
    }
  }

  componentWillUnmount() {
    const { resetListingActivities, resetSelectedActivity, resetSelectedActivityType } = this.props;
    resetSelectedActivityType()
    resetListingActivities()
    resetSelectedActivity()
  }

  render() {
    const { getListingData: { loading, UserListing }, startDate } = this.props;
    const { account, isAdmin, modalOpen, activityType, listActivities, selectedActivity, filterActivityType } = this.props;
    let isHost = false, activityData, selectedActivityType, activityDataId;

    if (!loading && UserListing) {
      if (account && account.userId && account.userId === UserListing.userId) {
        isHost = true;
      } else if (isAdmin) {
        isHost = true;
      }
    }
    if (UserListing && UserListing.activity && UserListing.activity.length > 0) {
      selectedActivityType = activityType ? activityType : (filterActivityType ? filterActivityType : UserListing.activity[0].activityType);
      const activityValue = UserListing.activity.find(o => o.activityType == selectedActivityType);
      activityData = activityValue;
    }

    if (loading || !selectedActivity || !listActivities) {
      return (
        <div>
          <Loader
            show={loading}
            type={"page"}
          />
        </div>
      )
    } else {
      if (selectedActivity) {
        activityData = selectedActivity;
        activityDataId = selectedActivity.id;
      }

      return (
        <div className={'homebookNoMargin'}>
          {modalOpen && <div>
            <Elements>
              <CardForm
                listId={UserListing && UserListing.id}
                activityId={activityDataId}
                activityType={selectedActivityType}
                activityData={activityData}
                page={'home'}
                show={true}
              />
            </Elements>
          </div>}
          {!modalOpen && <Calendar
            id={UserListing && UserListing.id}
            show={true}
            title={UserListing && UserListing.title}
            loading={loading}
            blockedDates={
              UserListing != null ?
                UserListing && UserListing.blockedDates : undefined
            }
            activityData={activityData}
            listingData={UserListing && UserListing.listingData || undefined}
            isHost={isHost}
            bookingType={UserListing && UserListing.bookingType}
            userBanStatus={account && account.userBanStatus}
            startDate={startDate}
            reviewsCount={UserListing && UserListing.reviewsCount}
            reviewsStarRating={UserListing && UserListing.reviewsStarRating}
            activityId={activityDataId}
            activityType={selectedActivityType}
            title={UserListing && UserListing.title}
            blockedDays={UserListing && UserListing.spaceAvailability}
          />}
        </div>
      );
    }

  }
}

const mapState = (state) => ({
  account: state.account.data,
  isAdmin: state.runtime.isAdminAuthenticated,
  listActivities: state.activityType.listActivities,
  selectedActivity: state.activityType.selectedActivity,
  activityType: state.activityType.selectedActivityType,
  filterActivityType: state.activityType.filterActivityType,
});

const mapDispatch = {
  change,
  initialize,
  getTimesLookup,
  reset,
  setListingActivities,
  setSelectedActivity,
  resetListingActivities,
  resetSelectedActivity,
  resetSelectedActivityType,
};

export default compose(
  injectIntl,
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
  )
)(CalendarContainer)