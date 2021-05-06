import {
  CHECK_AVAILABLE_DATES_START,
  CHECK_AVAILABLE_DATES_SUCCESS,
  CHECK_AVAILABLE_DATES_ERROR,
  GET_LISTING_SPECIFIC_FIELDS_DATA_SUCCESS,
  IMAGE_LIGHTBOX_OPEN,
  IMAGE_LIGHTBOX_CLOSE,
  GET_LISTING_SPECIAL_PRICING_START,
  GET_LISTING_SPECIAL_PRICING_SUCCESS,
  GET_LISTING_SPECIAL_PRICING_ERROR,
  GET_TIMES_LOOKUP_START,
  GET_TIMES_LOOKUP_SUCCESS,
  GET_TIMES_LOOKUP_ERROR,
} from '../constants';

export default function viewListing(state = {}, action) {
  switch (action.type) {
    case CHECK_AVAILABLE_DATES_START:
      return {
        ...state,
        isLoading: action.isLoading,
        maximumStay: action.payload.maximumStay,
      };

    case CHECK_AVAILABLE_DATES_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        availability: action.availability,
        maximumStay: action.payload.maximumStay,
      };

    case CHECK_AVAILABLE_DATES_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        availability: action.availability,
      };

    case GET_LISTING_SPECIFIC_FIELDS_DATA_SUCCESS:
      return {
        ...state,
        settingsData: action.settingsData,
      };

    case IMAGE_LIGHTBOX_OPEN:
      return {
        ...state,
        imageLightBox: action.imageLightBox,
      };

    case IMAGE_LIGHTBOX_CLOSE:
      return {
        ...state,
        imageLightBox: action.imageLightBox,
      };

    case GET_LISTING_SPECIAL_PRICING_START:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        specialPricing: [],
      };

    case GET_LISTING_SPECIAL_PRICING_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        specialPricing: action.payload.specialPricing,
      };

    case GET_LISTING_SPECIAL_PRICING_ERROR:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        specialPricing: [],
      };

    case GET_TIMES_LOOKUP_START:
      return {
        ...state,
        lookupIsLoading: action.payload.isLoading,
        lookupIndex: action.payload.index,
      };

    case GET_TIMES_LOOKUP_SUCCESS:
      return {
        ...state,
        lookupIsLoading: action.payload.isLoading,
        lookupIndex: action.payload.index,
      };

    case GET_TIMES_LOOKUP_ERROR:
      return {
        ...state,
        lookupIsLoading: action.payload.isLoading,
        lookupIndex: action.payload.index,
      };

    default:
      return state;
  }
}
