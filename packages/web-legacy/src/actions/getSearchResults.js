import {
  LOADING_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_START,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_ERROR,
} from '../constants';
import { change } from 'redux-form';

export function getSearchResults(data) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: FETCH_SEARCH_RESULTS_START,
    });

    try {
      if (data) {
        // Dispatch a success action
        dispatch({
          type: FETCH_SEARCH_RESULTS_SUCCESS,
          payload: {
            data,
            isResultLoading: false,
          },
        });
      } else {
        dispatch({
          type: FETCH_SEARCH_RESULTS_ERROR,
          payload: {
            isResultLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_SEARCH_RESULTS_ERROR,
        payload: {
          error,
          isResultLoading: false,
        },
      });
      return false;
    }

    return true;
  };
}

export function loadingSearchResults() {
  return dispatch => {
    dispatch({
      type: LOADING_SEARCH_RESULTS,
      payload: {
        isResultLoading: true,
      },
    });
  };
}

export function getToCurrency() {
  return async (dispatch, getState) => {
    try {
      let currency = getState().currency.to;
      await dispatch(change('SearchForm', 'currency', currency));
    } catch (error) {
      return false;
    }
  };
}
