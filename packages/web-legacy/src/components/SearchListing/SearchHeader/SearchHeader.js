import React, { Component } from 'react';

import moment from 'moment';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  change,
  submit as submitForm,
  formValueSelector,
} from 'redux-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Grid, Row, Button } from 'react-bootstrap';
import s from './SearchHeader.css';
import cx from 'classnames';

import Dates from '../Filters/Dates';
import Selector from '../../Selector';

import { setPersonalizedValues } from '../../../actions/personalized';
import {
  setSelectedActivityType,
  setFilterActivityType,
} from '../../../actions/Activities/handleActivies';
import { openFilterModal } from '../../../actions/modalActions';
import {
  showMap,
  showResults
} from '../../../actions/mobileSearchNavigation';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';

import FilterIcon from '../../../../public/NewIcon/filter.svg';
import MapIconMobile from '../../../../public/NewIcon/map.svg';
import ShowMapIcon from '../../../../public/NewIcon/image-list.svg';

import messages from '../../../locale/messages';

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        guests: false,
        price: false,
        instantBook: false,
        moreFilters: false,
      },
      overlay: false,
      smallDevice: false,
      verySmallDevice: false,
      iPadDevice: false,
      dateSelector: [],
      activitySelector: [],
      dateSelected: null,
      selectedActivity: null,
    };

    this.handleTabToggle = this.handleTabToggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleDateSelectorSearch = this.handleDateSelectorSearch.bind(this);
    this.handleActivitySelectorSearch = this.handleActivitySelectorSearch.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.mobileNavigation = this.mobileNavigation.bind(this);
  }

  componentDidMount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    this.handleSearchData();
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
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
          className={cx(s.filterButton, s.locationBtn, s.noPadding)}
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
          className={cx(s.filterButton, s.locationBtn, s.noPadding)}
          bsStyle="link"
          onClick={() => showResults()}
        >
          <img src={ShowMapIcon} alt='mapIcon' />
        </Button>
      );
    }

    return (
      <div className={s.mapIcon}>
        {leftNav}
      </div>
    );
  }

  async handleDateSelectorSearch(date) {
    const {
      change,
      setPersonalizedValues,
      submitForm,
      personalized,
    } = this.props;
    let endDate = moment(date).add('days', 1).format('YYYY-MM-DD');
    if (personalized.startDate === date) {
      await setPersonalizedValues({ name: 'startDate', value: null });
      await setPersonalizedValues({ name: 'endDate', value: null });
      await setPersonalizedValues({ name: 'singleDate', value: null });
      await change('SearchForm', 'singleDate', null);
      await change('SearchForm', 'dates', null);
    } else {
      await setPersonalizedValues({ name: 'startDate', value: date });
      await setPersonalizedValues({ name: 'endDate', value: endDate });
      await setPersonalizedValues({ name: 'singleDate', value: true });
      await change('SearchForm', 'singleDate', true);
      await change('SearchForm', 'dates', `'${date}' AND '${endDate}'`);
    }
    await change('SearchForm', 'currentPage', 1);
    await submitForm('SearchForm');
  }

  async handleActivitySelectorSearch(activityType) {
    const {
      change,
      setPersonalizedValues,
      submitForm,
      setFilterActivityType,
      personalized
    } = this.props;

    if (personalized.activityType === activityType) {
      this.setState({ selectedActivity: null });
      setFilterActivityType(null);
      await setPersonalizedValues({ name: 'activityType', value: null });
      await change('SearchForm', 'activityType', null);
    } else {
      this.setState({ selectedActivity: activityType });
      setFilterActivityType(activityType);
      await setPersonalizedValues({
        name: 'activityType',
        value: activityType,
      });
      await change('SearchForm', 'activityType', activityType);
    }
    await change('SearchForm', 'currentPage', 1);
    await submitForm('SearchForm');
  }

  handleSearchData() {
    const { activityTypeList } = this.props;
    const { locale } = this.props.intl;
    const { smallDevice } = this.state;

    let startDate = new Date(),
      dateSelectorArray = [],
      activitySelectorArray = [];
    let endDate = new Date(moment(startDate).add(4, 'days'));

    while (startDate <= endDate) {
      let dateSelectorObject = {};
      dateSelectorObject['name'] = smallDevice
        ? moment(startDate).format('DD')
        : capitalizeFirstLetter(moment(startDate).locale(locale).format('ddd DD').toLowerCase());
      dateSelectorObject['value'] = moment(startDate).format('YYYY-MM-DD');
      dateSelectorArray.push(dateSelectorObject);

      startDate = moment(startDate).add(1, 'day');
      startDate = new Date(startDate);
    }

    if (activityTypeList && activityTypeList.length > 0) {
      activityTypeList.map((item) => {
        let activitySelectorObject = {};
        activitySelectorObject['name'] = item.name;
        activitySelectorObject['value'] = item.id;
        if (+item.id === 2) activitySelectorArray.push(activitySelectorObject);
      });
    }
    this.setState(() => ({
      dateSelector: dateSelectorArray,
      activitySelector: activitySelectorArray,
    }));
  }

  async handleResize(e) {
    const { tabs } = this.state;
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser
      ? window.matchMedia('(max-width: 767px)').matches
      : true;
    let verySmallDevice = isBrowser
      ? window.matchMedia('(max-width: 480px)').matches
      : false;
    let iPadDevice = isBrowser
      ? window.matchMedia('(min-width: 768px) and (max-width: 992px)').matches
      : false;

    for (let key in tabs) {
      tabs[key] = false;
    }

    await this.setState({
      smallDevice,
      verySmallDevice,
      iPadDevice,
      tabs,
      overlay: false,
    });
    await this.handleSearchData();
  }

  handleTabToggle(currentTab, isExpand) {
    const { showResults, showFilter } = this.props;
    const { tabs, smallDevice } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }

    this.setState({
      tabs,
      overlay: isExpand,
    });

    if (smallDevice) {
      if (isExpand) {
        showFilter();
      } else {
        showResults();
      }
    }
  }

  render() {
    const { personalized, openFilterModal,
      mobileSearch, } = this.props;
    const {
      tabs,
      smallDevice,
      verySmallDevice,
      dateSelector,
      activitySelector,
    } = this.state;
    const { formatMessage, locale } = this.props.intl;
    let startDate, selectedDate, selectedActivityType;

    if (personalized) {
      if (personalized.startDate && personalized.singleDate) {
        startDate = new Date(personalized.startDate);
        selectedDate = moment(startDate).format('YYYY-MM-DD');
      } else {
        startDate = undefined;
        selectedDate = undefined;
      }

      if (personalized.activityType) {
        selectedActivityType = personalized.activityType;
      } else {
        selectedActivityType = undefined;
      }
    }

    return (
      <div className={s.searchOptions}>
        <Grid fluid>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
              <div className={s.mainHeader}>
                <div className={s.textAlignRight}>
                  <div className={cx(s.displayInlieBlock, s.mobileDateSelect)}>
                    <Selector
                      title={formatMessage(messages.when)}
                      month={capitalizeFirstLetter(moment().locale(locale).format('MMMM').toLowerCase())}
                      alignRight
                      selectedDate={selectedDate}
                      options={dateSelector}
                      onSelect={this.handleDateSelectorSearch}
                      component={'date'}
                      smallDevice={smallDevice}
                    />
                  </div>
                  <div
                    className={cx(
                      s.centerDates,
                      s.displayInlieBlock,
                      s.mobileDateSection,
                    )}
                  >
                    <Dates
                      className={s.filterButtonContainer}
                      handleTabToggle={this.handleTabToggle}
                      isExpand={tabs.dates}
                      smallDevice={smallDevice}
                      verySmallDevice={verySmallDevice}
                    />
                  </div>
                </div>
                <div className={s.paddingLeftBtn}>
                  <div className={s.meetSection}>
                    <Selector
                      title={formatMessage(messages.what)}
                      selectedActivity={selectedActivityType}
                      options={activitySelector}
                      onSelect={this.handleActivitySelectorSearch}
                      component={'activity'}
                      smallDevice={smallDevice}
                    />
                  </div>
                  {smallDevice && (
                    <div className={s.filterMobile}>
                      <div>
                        {
                          mobileSearch && !mobileSearch.searchForm && this.mobileNavigation()
                        }
                        {
                          //   <div className={s.mapIcon}>
                          //   <img onClick={() => openFilterModal()} src={FilterIcon} alt="filter" />
                          // </div>
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  personalized: state.personalized,
  activityTypeList: state.activityType.data.results,
  moods: selector(state, 'moods'),
  singleDate: selector(state, 'singleDate'),
  activityType: selector(state, 'activityType'),
  amenities: selector(state, 'amenities'),
  mobileSearch: state.mobileSearch.data
});

const mapDispatch = {
  change,
  setPersonalizedValues,
  submitForm,
  setSelectedActivityType,
  setFilterActivityType,
  openFilterModal,
  showMap,
  showResults
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SearchHeader)));