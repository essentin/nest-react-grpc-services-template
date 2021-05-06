import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  change,
  submit as submitForm,
  formValueSelector,
  reduxForm,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Row } from 'react-bootstrap';

import s from './SearchResults.css';

import CustomPagination from '../CustomPagination';
import ListingItem from '../ListingItem';
import NoResults from '../NoResults';
import BookButton from '../BookButton';
import WorkplaceSuggestModal from '../WorkplaceSuggestModal/WorkplaceSuggestModal';

import { openWorkplaceSuggestModal } from '../../../actions/modalActions';
import submit from '../SearchForm/submit';
import messages from '../../../locale/messages';

class SearchResults extends React.Component {
  static propTypes = {
    change: PropTypes.any,
    submitForm: PropTypes.any,
    results: PropTypes.array,
    currentPage: PropTypes.number,
    total: PropTypes.number,
    isResultLoading: PropTypes.bool,
  };

  static defaultProps = {
    results: [],
    showMap: false,
    showMapLoader: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.handlePagination = this.handlePagination.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(value) {
    const { change } = this.props;
    change('markerHighlight', { id: value, hover: 'true' });
  }

  handleMouseOut(value) {
    const { change } = this.props;
    change('markerHighlight', {});
  }

  componentDidMount() {
    const { currentPage } = this.props;
    if (currentPage != undefined) {
      this.setState({ page: currentPage });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentPage } = nextProps;
    if (currentPage != undefined) {
      this.setState({ page: currentPage });
    }
  }

  async handlePagination(currenctPage, size) {
    const { change, submitForm } = this.props;
    await change('currentPage', currenctPage);
    await submitForm('SearchForm');
  }

  render() {
    const { page } = this.state;
    const {
      results,
      total,
      isResultLoading,
      showMap,
      showMapLoader,
      openWorkplaceSuggestModal,
      suggestWorkplaceFeature
    } = this.props;

    if (results && results.length > 0) {
      return (
        <div
          className={cx(s.searchResults, {
            [s.listItemOnly]: showMap == false,
          })}
        >
          {suggestWorkplaceFeature && <WorkplaceSuggestModal />}

          {!showMapLoader && (
            <div className={cx(s.resultsContainer)}>
              {isResultLoading && <div className={s.loadingOverlay} />}
              <Row className={s.noMargin}>
                {results.map((item, listIndex) => {
                  return (
                    <div
                      className={cx(
                        s.listItem,
                        s.displayInlineBlock,
                        s.positionRelative,
                      )}
                      key={item.id}
                    >
                      <div
                        onMouseOver={() => this.handleMouseOver(item.id)}
                        onMouseOut={() => this.handleMouseOut(item.id)}
                      >
                        <ListingItem
                          id={item.id}
                          currency={item.listingData.currency}
                          title={item.title}
                          coverPhoto={item.coverPhoto}
                          listPhotos={item.listPhotos}
                          bookingType={item.bookingType}
                          reviewsCount={item.reviewsCount}
                          reviewsStarRating={item.reviewsStarRating}
                          wishListStatus={item.wishListStatus}
                          isListOwner={item.isListOwner}
                          spaceSize={item.spaceSize}
                          activity={item.activity}
                          city={item.city}
                          state={item.state}
                          country={item.country}
                        />
                        <BookButton listId={item.id} />
                      </div>
                    </div>
                  );
                })}
                {suggestWorkplaceFeature && <div onClick={openWorkplaceSuggestModal} className={s.missingBtn}>
                  <FormattedMessage {...messages.missingAPlace} />
                </div>}
              </Row>
              <Row>
                <div className={s.resultsFooter}>
                  <div className={s.resultsPagination}>
                    <div className={s.pagination}>
                      <CustomPagination
                        total={total}
                        current={page}
                        defaultCurrenct={1}
                        defaultPageSize={12}
                        handleChange={this.handlePagination}
                      />
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          {isResultLoading && <div className={s.loadingOverlay} />}
          <NoResults />
        </div>
      );
    }
  }
}

SearchResults = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(SearchResults);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state.search.data,
  currentPage: selector(state, 'currentPage'),
  total: state.search.count,
  isResultLoading: state.search.isResultLoading,
  showMap: state.personalized.showMap,
  showMapLoader: state.loader.showMapLoading,
  suggestWorkplaceFeature: state.featureFlag.suggestWorkspace
});

const mapDispatch = {
  change,
  submitForm,
  openWorkplaceSuggestModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(SearchResults));