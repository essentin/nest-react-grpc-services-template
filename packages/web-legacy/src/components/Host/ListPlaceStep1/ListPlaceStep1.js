// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Internal Helpers
import submit from './submit';
import update from './update';
import updateStep3 from './updateStep3';

// Translation
import { injectIntl } from 'react-intl';

// Component
import ListYourSpaceSlider from './ListYourSpaceSlider/ListYourSpaceSlider';

// Step #1
import ExistingPage1 from './ExistingPage1';
import Location from './Location';
import Amenities from './Amenities';
import SpaceParking from './SpaceParking';
import Mood from './Mood';
import ContactHost from './ContactHost';

// Step #2
import Photos from './Photos';
import PhotoCover from './PhotoCover';
import HouseRules from './HouseRules';
import AboutSpace from './AboutSpace';
import Instructions from './Instructions';

// Step #3
import Availability from './Availability';
import Calendar from './Calendar';
import Activity from './Activity';

// Tab Bar
import TabBarStep1 from './TabBarStep1';
import TabBarStep2 from './TabBarStep2';
import TabBarStep3 from './TabBarStep3';

// Helper
import history from '../../../core/history';

class ListPlaceStep1 extends Component {

  static propTypes = {
    listData: PropTypes.object,
    existingList: PropTypes.bool,
    listingSteps: PropTypes.object,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 'index',
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      formValues: {}
    };
  }

  componentWillMount() {
    const { existingList, listingSteps } = this.props;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
        step4: listingSteps.step4
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { existingList, listingSteps } = nextProps;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
        step4: listingSteps.step4
      });
    } else {
      this.setState({
        step1: null,
        step2: null,
        step3: null,
        step4: null
      });

    }
  }

  nextPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
  }

  previousPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
  }

  renderTabBar(currentPage) {
    const { step1, step2, step3, step4 } = this.state;
    const { photosCount, formPage } = this.props;

    const step1Pages = [
      "location", "spaces-parking", "amenities", "moods", "contact"
    ];
    const step2Pages = [
      "about-your-space", "house-rules", "instructions", "photos", "cover-photo"
    ];
    const step3Pages = [
      "availability", "calendar", "cancellation-policy", "activities", "booking-scenarios"
    ];

    if (step1Pages.indexOf(currentPage) > -1 && step1 === "completed") {
      return <TabBarStep1 nextPage={this.nextPage} currentPage={currentPage} formPage={formPage} />
    }

    if (step2Pages.indexOf(currentPage) > -1 && step2 === "completed") {
      return <TabBarStep2 nextPage={this.nextPage} currentPage={currentPage} photosCount={photosCount} formPage={formPage} />
    }

    if (step3Pages.indexOf(currentPage) > -1 && step4 === "completed") {
      return <TabBarStep3 nextPage={this.nextPage} currentPage={currentPage} formPage={formPage} />
    }
  }

  render() {
    const { page } = this.state;
    const { formPage, photosCount, mode, existingList, listId, baseCurrency } = this.props;
    let currentPage = page;
    if (mode != undefined && mode === "new") {
      currentPage = 'index';
    } else if (formPage != undefined) {
      currentPage = formPage;
    }
    return (
      <div className={'inputFocusColor'}>
        {this.renderTabBar(currentPage)}
        {currentPage === "index" &&
          <ListYourSpaceSlider
            nextPage={this.nextPage}
            previousPage={this.previousPage}
            onSubmit={existingList ? update : submit}
          />
        }
        {currentPage === "home" && <ExistingPage1
          nextPage={this.nextPage}
          photosCount={photosCount}
        />}

        {currentPage === "location" && <Location
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          onSubmit={existingList ? update : submit}
        />}
        {currentPage === "spaces-parking" && <SpaceParking
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          onSubmit={update}
        />}

        {currentPage === "amenities" && <Amenities
          nextPage={this.nextPage}
          previousPage={this.previousPage}
        />}

        {currentPage === "moods" && <Mood
          nextPage={this.nextPage}
          previousPage={this.previousPage}
        />}

        {currentPage === "contact" && <ContactHost
          nextPage={this.nextPage}
          previousPage={this.previousPage}
        />}


        {currentPage === "about-your-space" && <AboutSpace
          previousPage={this.previousPage}
          nextPage={this.nextPage}
        />}
        {currentPage === "house-rules" && <HouseRules
          previousPage={this.previousPage}
          nextPage={this.nextPage}
        />}
        {currentPage === "instructions" && <Instructions
          previousPage={this.previousPage}
          nextPage={this.nextPage}
        />}
        {currentPage === "photos" && <Photos
          previousPage={this.previousPage}
          listId={listId}
          nextPage={this.nextPage}
        />}
        {currentPage === "cover-photo" && <PhotoCover
          previousPage={this.previousPage}
          listId={listId}
          nextPage={this.nextPage}
        />}


        {currentPage === "availability" && <Availability
          previousPage={this.previousPage}
          nextPage={this.nextPage}
        />}
        {currentPage === "calendar" && <Calendar
          listId={listId}
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          baseCurrency={baseCurrency}
        />}
        {currentPage === "activities" && <Activity
          previousPage={this.previousPage}
          nextPage={this.nextPage}
        />}
      </div>
    );
  }

}


const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingSteps: state.location.listingSteps,
  photosCount: state.location.photosCount
});

const mapDispatch = {};

export default injectIntl(connect(mapState, mapDispatch)(ListPlaceStep1));