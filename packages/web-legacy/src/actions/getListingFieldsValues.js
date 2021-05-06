import { gql } from 'react-apollo';

import {
  GET_LISTING_FIELDS_INTIAL_VALUES_START,
  GET_LISTING_FIELDS_INTIAL_VALUES_SUCCESS,
  GET_LISTING_FIELDS_INTIAL_VALUES_ERROR,
} from '../constants';

import { initialize } from 'redux-form';

const query = gql`
  query($step: String) {
    getListingSettings(step: $step) {
      id
      typeName
      fieldType
      typeLabel
      step
      isEnable
      isMultiValue
      listSettings {
        id
        typeId
        itemName
        otherItemName
        maximum
        minimum
        startValue
        endValue
        isEnable
        thumbnail
      }
    }
  }
`;

export function getListingFieldsValues(step, listId, isOtherPage) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_FIELDS_INTIAL_VALUES_START,
    });

    try {
      const step1DataIsLoaded = getState().location.step1DataIsLoaded;
      const step2DataIsLoaded = getState().location.step2DataIsLoaded;
      const step3DataIsLoaded = getState().location.step3DataIsLoaded;
      const activityType = getState().activityType.data;

      // Get Base Currency from Redux Store
      const baseCurrency = getState().currency.base;
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { step },
        fetchPolicy: 'network-only',
      });

      let listingFieldsValues = {};
      let activity = [];

      if (!data && !data.getListingSettings) {
        dispatch({
          type: GET_LISTING_FIELDS_INTIAL_VALUES_ERROR,
        });
      } else {
        data.getListingSettings.map((item, key) => {
          if (item.fieldType === 'numberType') {
            listingFieldsValues[item.typeName] =
              item.listSettings.length > 0
                ? item.listSettings[0].startValue
                : null;
          } else {
            if (item.isMultiValue === true) {
              listingFieldsValues[item.typeName] = [];
            } else {
              let unSelectIndex =
                item.listSettings.length > 0
                  ? item.listSettings.findIndex(o => o.isEnable == 1)
                  : null;
              listingFieldsValues[item.typeName] =
                item.listSettings[unSelectIndex].id;
            }
          }
        });

        // Prepare for Activity
        if (activityType && activityType.results.length > 0) {
          activityType.results.map((item, index) => {
            if (item.isEnable == 1) {
              activity.push({
                activityType: item.id,
                isSelected: item.id === 2, // Having only Lounge activity, so make it as a selected option
                isReadMore: false,
                isCleaningIncluded: true,
              });
            }
          });
        }

        // Prepare for SpaceAvailability
        let spaceAvailableSettings = [
          { listId: listId, day: 'Sunday', isOpen: true, isWholeDay: 'true' },
          { listId: listId, day: 'Monday', isOpen: true, isWholeDay: 'true' },
          { listId: listId, day: 'Tuesday', isOpen: true, isWholeDay: 'true' },
          {
            listId: listId,
            day: 'Wednesday',
            isOpen: true,
            isWholeDay: 'true',
          },
          { listId: listId, day: 'Thursday', isOpen: true, isWholeDay: 'true' },
          { listId: listId, day: 'Friday', isOpen: true, isWholeDay: 'true' },
          { listId: listId, day: 'Saturday', isOpen: true, isWholeDay: 'true' },
        ];

        // Reinitialize the form values
        if (step === '2' && !step2DataIsLoaded) {
          let updatedValuesStep2 = Object.assign({}, listingFieldsValues, {
            id: listId,
            isAllAge: 'false',
          });
          dispatch(initialize('ListPlaceStep2', updatedValuesStep2, true));
          dispatch({
            type: GET_LISTING_FIELDS_INTIAL_VALUES_SUCCESS,
            initialValuesLoadedStep2: true,
          });
        } else if (step === '3' && !step3DataIsLoaded) {
          let updatedValuesStep3 = Object.assign(
            {},
            listingFieldsValues,
            { id: listId },
            { currency: baseCurrency },
            { bookingType: 'instant' },
            { maxDaysNotice: 'available' },
            { activity: activity },
            { spaceAvailability: spaceAvailableSettings },
            { cancellationPolicy: '1' },
          );
          dispatch(initialize('ListPlaceStep3', updatedValuesStep3, true));
          dispatch({
            type: GET_LISTING_FIELDS_INTIAL_VALUES_SUCCESS,
            initialValuesLoadedStep3: true,
          });
        } else {
          if (!step1DataIsLoaded || isOtherPage) {
            let updatedValuesStep1 = Object.assign({}, listingFieldsValues);
            dispatch(initialize('ListPlaceStep1', updatedValuesStep1, true));
            dispatch({
              type: GET_LISTING_FIELDS_INTIAL_VALUES_SUCCESS,
              initialValuesLoaded: true,
            });
          }
        }
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_FIELDS_INTIAL_VALUES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
