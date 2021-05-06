import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import { connect } from 'react-redux';
import { formValueSelector, change, submit, reset } from 'redux-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';

import s from './Search.css';

import SearchResults from '../../components/SearchListing/SearchResults';
import MapResults from '../../components/SearchListing/MapResults';
import Loader from '../../components/Loader';
import SearchHeader from '../../components/SearchListing/SearchHeader';
import FilterModal from '../../components/FilterModal/FilterModal';

import {
  showMap,
  showResults,
  showForm,
  showFilter,
} from '../../actions/mobileSearchNavigation';
import { getListingFields } from '../../actions/getListingFields';
import {
  closeHomeBookingModal,
  openFilterModal,
} from '../../actions/modalActions';

import { setPersonalizedValues } from '../../actions/personalized';

import PinOnMapIcon from '../../../public/NewIcon/pin-on-map.svg';
import MapIconMobile from '../../../public/NewIcon/map.svg';
import ShowMapIcon from '../../../public/NewIcon/image-list.svg';

import messages from '../../locale/messages';

import { googleMapAPI, defaultLat, defaultLng } from '../../config';

//Images
import SelectCity from '../../components/SelectCity/SelectCity';

class Search extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.object,
    filterToggle: PropTypes.bool,
    showMap: PropTypes.func.isRequired,
    showResults: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
    mobileSearch: PropTypes.shape({
      searchMap: PropTypes.bool,
      searchResults: PropTypes.bool,
      searchForm: PropTypes.bool,
    }),
    getListingFields: PropTypes.func,
  };

  static defaultProps = {
    mobileSearch: {
      searchMap: false,
      searchResults: true,
      searchForm: false,
      searchFilter: false,
    },
    isMapShow: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      smallDevice: false,
      load: false,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClickWhishList = this.handleClickWhishList.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.mobileNavigation = this.mobileNavigation.bind(this);
    this.showMap = this.showMap.bind(this);
  }

  componentDidMount() {
    // let isBrowser = typeof window !== 'undefined';
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      let smallDevice = window.matchMedia('(max-width: 1199px)').matches;
      if (smallDevice) {
        const { showResults } = this.props;
        showResults();
        this.setState({ smallDevice });
      }
      window.addEventListener('resize', this.handleResize);
    }

    this.setState({
      load: true,
    });
  }

  componentWillUnmount() {
    const { closeHomeBookingModal } = this.props;
    closeHomeBookingModal();

    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(e) {
    const { showResults } = this.props;
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 1199px)').matches : false;
    this.setState({ smallDevice });
  }

  async showMap() {
    const { setPersonalizedValues, isMapShow } = this.props;
    await setPersonalizedValues({
      name: 'showMap',
      value: !isMapShow,
    });
  }

  async handleClickWhishList() {
    const { change, showWhishList } = this.props;
    await change('SearchForm', `showWhishList`, !showWhishList);
    await submit('SearchForm');
  }

  async resetFilter() {
    const { reset, submit, change, setPersonalizedValues } = this.props;
    await setPersonalizedValues({ name: 'startDate', value: null });
    await setPersonalizedValues({ name: 'endDate', value: null });
    await setPersonalizedValues({ name: 'singleDate', value: false });
    await change('SearchForm', `currentPage`, 1);
    await change('SearchForm', `activityType`, null);
    await change('SearchForm', `dates`, null);
    await change('SearchForm', `singleDate`, null);
    await change('SearchForm', `SearchForm`, null);
    await change('SearchForm', `moods`, null);
    await change('SearchForm', `amenities`, []);
    await submit('SearchForm');
  }

  mobileNavigation() {
    const {
      mobileSearch: { searchMap, searchResults },
      showMap,
      showResults,
    } = this.props;

    let leftNav;
    if (searchResults) {
      leftNav = (
        <Button
          className={cx(s.filterButton, s.locationBtn, s.noPadding, s.tabMapBtn)}
          bsStyle="link"
          onClick={() => showMap()}
        >
          <img src={MapIconMobile} alt='mapIcon' />
        </Button>
      );
    }

    if (searchMap) {
      leftNav = (
        <Button
          className={cx(s.filterButton, s.locationBtn, s.noPadding, s.tabMapBtn)}
          bsStyle="link"
          onClick={() => showResults()}
        >
          <img src={ShowMapIcon} alt='mapIcon' />
        </Button>
      );
    }

    return (
      <div className={s.whereIcons}>
        {leftNav}
      </div>
    );
  }

  render() {
    const {
      mobileSearch: { searchMap, searchResults, searchForm },
      initialFilter,
      filterToggle,
      showFilter,
      showResults,
      isMapShow,
      openFilterModal,
      moods,
      activityType,
      amenities,
      singleDate
    } = this.props;
    const { total, menuToggle } = this.props;
    const { smallDevice, load } = this.state;

    let DesktopResults = true;
    if (filterToggle === true) {
      DesktopResults = false;
    }
    const isBrowser = typeof window !== 'undefined';
    let smallerDevice = isBrowser ? window.matchMedia('(max-width: 1199px)').matches : false;

    if (!load || !isBrowser) {
      return (
        <div className={s.searchLoaderContainer}>
          <Loader type={'text'} />
        </div>
      );
    }

    return (
      <div className={cx(s.root, 'searchPage', 'overFlowHidden')}>
        <div className={s.container}>
          <FilterModal />
          <div className={s.bannerRelative}>
            <SelectCity />
          </div>
          <div className={cx(s.positionSticky, { [s.positionStickyMobile]: menuToggle })}>
            {!smallDevice && <SearchHeader/>}
            <div>
              {smallDevice && (
                <SearchHeader
                  showFilter={showFilter}
                  showResults={showResults}
                />
              )}
            </div>
          </div>
          <div className={cx(s.positionRelative, s.overFlowHidden, { [s.searchMapHeight]: smallDevice && searchMap })}>
            <div className={cx(s.searchResultContainer, 'searchHeaderScroll', { [s.listItemOnly]: isMapShow == false })}>
              <div className={s.whereSection}>
                <div>
                  <span className={s.whereText}>
                    {total} <FormattedMessage {...messages.workSpaceCount} />
                  </span>
                </div>
                <div className={cx(s.textAlignRight, s.hiddenMobile)}>
                  {(singleDate || activityType || amenities && amenities.length > 0 || moods) && (
                    <div className={s.whereIcons}>

                      <Button
                        className={cx(s.navItem, s.active, s.btn)}
                        onClick={this.resetFilter}
                      >
                        <FormattedMessage {...messages.clearFilter} />
                      </Button>
                    </div>
                  )}

                  {smallerDevice && this.mobileNavigation()}

                  <div className={cx(s.whereIcons, s.tabHideMapShowBtn)}>
                    <img
                      onClick={this.showMap}
                      src={PinOnMapIcon}
                      alt="map"
                      className={s.cursorPointer}
                    />
                  </div>

                </div>
              </div>
              {!smallDevice && DesktopResults && (
                <div className={cx(s.resultsBody)}>
                  <SearchResults />
                </div>
              )}

              {smallDevice && searchResults && (
                <div className={cx(s.resultsBody)}>
                  <SearchResults />
                </div>
              )}
            </div>
            {!smallDevice && isMapShow && (
              <div className={cx(s.searchMapContainer, 'searchMapSection')}>
                <ReactGoogleMapLoader
                  params={{
                    key: googleMapAPI, // Define your api key here
                    libraries: 'places,geometry,markerwithlabel', // To request multiple libraries, separate them with a comma
                  }}
                  render={(googleMaps) =>
                    googleMaps && (
                      <MapResults
                        initialFilter={initialFilter}
                      />
                    )
                  }
                />
              </div>
            )}
            {smallDevice && searchMap && (
              <div className={cx(s.searchMapContainer, 'searchMapSection')}>
                <ReactGoogleMapLoader
                  params={{
                    key: googleMapAPI, // Define your api key here
                    libraries: 'places,geometry,markerwithlabel', // To request multiple libraries, separate them with a comma
                  }}
                  render={(googleMaps) =>
                    googleMaps && (
                      <MapResults
                        initialFilter={initialFilter}
                      />
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  showWhishList: selector(state, 'showWhishList'),
  filterToggle: state.toggle.filterToggle,
  mobileSearch: state.mobileSearch.data,
  isMapShow: state.personalized.showMap,
  total: state.search.count,
  showClearFilter: state.personalized.showClearFilter,
  lat: state.personalized.lat,
  lng: state.personalized.lng,
  moods: selector(state, 'moods'),
  singleDate: selector(state, 'dates'),
  activityType: selector(state, 'activityType'),
  amenities: selector(state, 'amenities'),
  menuToggle: state.toggle.showMenu
});

const mapDispatch = {
  showMap,
  showResults,
  showForm,
  getListingFields,
  showFilter,
  closeHomeBookingModal,
  openFilterModal,
  setPersonalizedValues,
  change,
  submit,
  reset
};

export default withStyles(s)(connect(mapState, mapDispatch)(Search));