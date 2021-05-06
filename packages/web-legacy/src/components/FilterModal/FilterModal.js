import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  reduxForm,
  change,
  submit as submitForm,
  formValueSelector,
} from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Modal, Button, FormGroup, Checkbox } from 'react-bootstrap';
import { setPersonalizedValues } from '../../actions/personalized';
import s from './FilterModal.css';

import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

import { closeFilterModal } from '../../actions/modalActions';

import submit from '../SearchListing/SearchForm/submit';

import messages from '../../locale/messages';

import closeIcon from '../../../public/NewIcon/cross.svg';

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  // Refetch the count when filter change
  // componentWillReceiveProps({ activityType: activity, moods, dates, amenities }) {
  //   const { activityType: NactivityType, moods: Nmoods, dates: Ndates, amenities: Namenities, FilterCount: { refetch } } = this.props
  //   if (activity !== NactivityType
  //     || Nmoods !== moods
  //     || Ndates !== dates
  //     || Namenities !== amenities) {
  //     refetch({
  //       activity,
  //       moods,
  //       dates,
  //       amenities
  //     })
  //   }
  // }

  checkboxGroup = ({ options, input }) => (
    <ul className={s.listContainer}>
      {options.map((option, index) => {
        return +option.isEnable == true ? (
          <li className={s.checkboxPadding} key={index}>
            <span className={cx(s.checkBoxLabel)}>
              <label className={cx(s.labelText, s.noPadding)}>
                {option.itemName}
              </label>
              <label className={cx(s.labelNumberText, s.noPadding)}>
                {option.amenitiesListId && option.amenitiesListId.length}
              </label>
            </span>
            <span className={s.checkBoxSection}>
              <CustomCheckbox
                name={`${input.name}[${index}]`}
                className={'icheckbox_square-green'}
                value={option.id}
                checked={input.value.indexOf(option.id) !== -1}
                onChange={(event) => {
                  const newValue = [...input.value];
                  if (event === true) {
                    newValue.push(option.id);
                  } else {
                    newValue.splice(newValue.indexOf(option.id), 1);
                  }
                  return input.onChange(newValue);
                }}
              />
            </span>
          </li>
        ) : null;
      })}
    </ul>
  );
  checkBox({ input }) {
    return (
      <div>
        <Checkbox
          checkboxClass={'icheckbox_square'}
          increaseArea="20%"
          {...input}
          checked={input.value}
        />
      </div>
    );
  }
  async onHandleClick() {
    const {
      submitForm,
      change,
      closeFilterModal,
      setPersonalizedValues,
      singleDate,
      activityType,
      amenities,
      moods,
    } = this.props;
    await change('currentPage', 1);
    await submitForm('SearchForm');
    let showClearFilter =
      singleDate || activityType || amenities && amenities.length > 0 || moods;
    await setPersonalizedValues({
      name: 'showClearFilter',
      value: showClearFilter,
    });
    closeFilterModal();
  }

  render() {
    const {
      modalStatus,
      closeFilterModal,
      data: { loading, getListingSettings },
      account,
      change,
      moods,
      // FilterCount: { getFilterCount }
    } = this.props;
    let amenities, moodsOptionList;
    if (getListingSettings && getListingSettings.length > 0) {
      amenities = getListingSettings.filter((data) => data.id === 10);
      moodsOptionList = getListingSettings.filter((data) => data.id === 20);
    }
    return (
      <div>
        <Modal
          show={modalStatus}
          animation={false}
          onHide={this.onHandleClick}
          className={cx('filterModal', 'customRatioButton')}
        >
          <div className={cx(s.space4, s.mainPadding)}>
            <span className={s.filterText}>
              <FormattedMessage {...messages.filter} />
            </span>
            <span
              onClick={this.onHandleClick}
              className={cx(s.pullRight, s.curserPointer)}
            >
              <img src={closeIcon} />
            </span>
          </div>
          {/* {(account && account.userId) && <div>
                        <div>
                            <p className={s.titleText}><FormattedMessage {...messages.favorites} /></p>
                        </div>
                        <hr />
                        <div><FormattedMessage {...messages.onlyShowYourFavorites} />
                            <FormGroup className={s.formGroup}>
                                <Field name={'showWhishList'} component={this.checkBox} />
                            </FormGroup>
                        </div>
                        <hr />
                    </div>} */}
          {loading && (
            <div>
              <FormattedMessage {...messages.loadingLabel} />
            </div>
          )}
          {moodsOptionList &&
            moodsOptionList.length > 0 &&
            moodsOptionList[0].listSettings.length > 0 && (
              <div className={s.space4}>
                <h1 className={cx(s.titleText, s.spaceTop4)}>
                  <FormattedMessage {...messages.mood} />
                </h1>
                <FormGroup className={s.noMargin}>
                  {moodsOptionList[0].listSettings.map((item, index) => {
                    return +item.isEnable == true ? (
                      <ul className={s.listContainer}>
                        <li className={s.checkboxPadding} key={index}>
                          <span className={cx(s.checkBoxLabel)}>
                            <label className={cx(s.labelText, s.noPadding)}>
                              {item.itemName}
                            </label>
                            <label className={cx(s.labelNumberText, s.noPadding)}>
                              {item.moodsListId && item.moodsListId.length}
                            </label>
                          </span>
                          <span className={s.checkBoxSection}>
                            <Field
                              name="moods"
                              component="input"
                              type="radio"
                              value={item.id}
                              checked={moods == item.id ? true : false}
                              onChange={(e) =>
                                change('SearchForm', 'moods', e.target.value)
                              }
                            />
                          </span>
                        </li>
                      </ul>
                    ) : null;
                  })}
                </FormGroup>
                <hr className={s.noMarginTop} />
              </div>
            )}
          {amenities &&
            amenities.length > 0 &&
            amenities[0].listSettings.length > 0 && (
              <div>
                <h1 className={s.titleText}>
                  {' '}
                  <FormattedMessage {...messages.aminities} />
                </h1>
                <FormGroup className={s.noMargin}>
                  <Field
                    name={'amenities'}
                    component={this.checkboxGroup}
                    options={amenities[0].listSettings}
                  />
                </FormGroup>
                <hr className={s.noMarginTop} />
              </div>
            )}
          <div
            onClick={this.onHandleClick}
            className={cx(s.btnPadding, s.space2)}
          >
            <Button className={s.btn}>
              <FormattedMessage {...messages.show} />{' '}
              {
                // getFilterCount && getFilterCount.result 
              }
              <FormattedMessage {...messages.results1} />
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

FilterModal = reduxForm({
  form: 'SearchForm',
  onSubmit: submit,
  destroyOnUnmount: false,
})(FilterModal);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  modalStatus: state.modalStatus.filterModal,
  account: state.account.data,
  moods: selector(state, 'moods'),
  singleDate: selector(state, 'singleDate'),
  activityType: selector(state, 'activityType'),
  amenities: selector(state, 'amenities'),
  dates: selector(state, 'dates'),
});

const mapDispatch = {
  closeFilterModal,
  submitForm,
  change,
  setPersonalizedValues,
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(
    gql`
      query getFilterSettings {
        getListingSettings(listOfId: [10, 20]) {
          id
          typeName
          typeLabel
          listSettings {
            itemName
            id
            itemDescription
            isEnable
            otherItemName
            moodsListId {
                id
            }
            amenitiesListId {
                id
            }
          }
        }
      }
    `,
    {
      options: {
        ssr: false,
        fetchPolicy: 'cache-first',
      },
    },
  ),
  // graphql(
  //   gql`
  //   query GetFilterCount(
  //     $amenities: [Int],
  //     $dates: String,
  //     $activity: Int,
  //     $moods: Int
  //   ){
  //     getFilterCount(
  //       amenities:$amenities, 
  //       dates: $dates,
  //       activity: $activity,
  //       moods: $moods,
  //     ) {
  //       status
  //       result
  //     }
  //   }
  //   `,
  //   {
  //     name: "FilterCount",
  //     options: (props) => ({
  //       // variables: {
  //       //   "amenities": props.amenities,
  //       //   "dates": props.dates,
  //       //   "activity": props.activityType,
  //       //   "moods": props.moods
  //       // },
  //       // ssr: false,
  //       fetchPolicy: 'cache-first'
  //     })
  //   }
  // )
)(FilterModal);
