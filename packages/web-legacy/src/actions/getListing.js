import { gql } from 'react-apollo';
import {
  GET_LISTING_DATA_START,
  GET_LISTING_DATA_SUCCESS,
  GET_LISTING_DATA_ERROR,
} from '../constants';
import { initialize } from 'redux-form';
const query = gql`
  query($listId: String!, $preview: Boolean) {
    UserListing(listId: $listId, preview: $preview) {
      id
      userId
      country
      street
      buildingName
      city
      state
      zipcode
      lat
      lng
      isMapTouched
      personCapacity
      isParking
      parkingDescription
      contactName
      contactEmail
      contactPhoneNumber
      countryCode
      contactDialCode
      user {
        id
        email
        userBanStatus
        profile {
          firstName
          lastName
          dateOfBirth
        }
      }
      userAmenities {
        amenitiesId
        listsettings {
          itemName
          settingsType {
            typeName
          }
        }
      }
      userSafetyAmenities {
        safetyAmenitiesId
        listsettings {
          itemName
          settingsType {
            typeName
          }
        }
      }
      parkingOptions {
        spacesId
        listsettings {
          itemName
          settingsType {
            typeName
          }
        }
      }
      moodsOptions {
        moodsId
        listsettings {
          itemName
          settingsType {
            typeName
          }
        }
      }
    }
  }
`;
export function getListingData(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_START,
    });
    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });
      let formValues = null;
      let settingFieldsData = {};
      const amenities = [];
      const safetyAmenities = [];
      const parkingOptions = [];
      const moods = [];

      if (data && data.UserListing) {
        // Preparing for user amenities
        if (data.UserListing.userAmenities.length > 0) {
          data.UserListing.userAmenities.map((item, value) => {
            amenities.push(parseInt(item.amenitiesId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, {
            amenities,
          });
        }
        // Preparing for user safety amenities
        if (data.UserListing.userSafetyAmenities.length > 0) {
          data.UserListing.userSafetyAmenities.map((item, value) => {
            safetyAmenities.push(parseInt(item.safetyAmenitiesId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, {
            safetyAmenities,
          });
        }

        // Preparing for User Spaces parkingOptions
        if (data.UserListing.parkingOptions.length > 0) {
          data.UserListing.parkingOptions.map((item, value) => {
            parkingOptions.push(parseInt(item.spacesId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, {
            parkingOptions,
          });
        }

         // Preparing for User Moods moodsOptions
         if (data.UserListing.moodsOptions.length > 0) {
          data.UserListing.moodsOptions.map((item, value) => {
            moods.push(parseInt(item.moodsId));
          });
          settingFieldsData = Object.assign({}, settingFieldsData, {
            moods,
          });
        }

        settingFieldsData = Object.assign(
          {},
          settingFieldsData
        );
        // Combining values for initializing the edit form
        formValues = Object.assign({}, data.UserListing, settingFieldsData);
        if (formValues != null) {
          // Reinitialize the form values
          dispatch(initialize('ListPlaceStep1', formValues, true));
          // Dispatch a success action
          dispatch({
            type: GET_LISTING_DATA_SUCCESS,
            step1DataIsLoaded: true,
            isExistingList: true,
            initialValuesLoaded: false,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
