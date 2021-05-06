import {
    GET_LISTING_ACTIVITY_RESET,
    GET_LISTING_ACTIVITY_SUCCESS,
    GET_SELECTED_ACTIVITY_RESET,
    GET_SELECTED_ACTIVITY_SUCCESS,
    SET_ACTIVITY_TYPE_SUCCESS,
    SET_ACTIVITY_TYPE_RESET,
    SET_FILTER_ACTIVITY_TYPE_SUCCESS,
    SET_FILTER_ACTIVITY_TYPE_RESET,
} from '../../constants';

export function setListingActivities(listActivities) {

    return async (dispatch) => {

        dispatch({
            type: GET_LISTING_ACTIVITY_SUCCESS,
            listActivities
        });

    };
}

export function resetListingActivities() {

    return async (dispatch) => {

        dispatch({
            type: GET_LISTING_ACTIVITY_RESET
        });

    };
}

export function setSelectedActivity(selectedActivity) {
    return async (dispatch) => {

        dispatch({
            type: GET_SELECTED_ACTIVITY_SUCCESS,
            selectedActivity
        });

    };
}

export function resetSelectedActivity() {
    return async (dispatch) => {

        dispatch({
            type: GET_SELECTED_ACTIVITY_RESET
        });

    };
}

export function setSelectedActivityType(selectedActivityType) {
    return async (dispatch) => {

        dispatch({
            type: SET_ACTIVITY_TYPE_SUCCESS,
            selectedActivityType
        });

    };
}

export function resetSelectedActivityType() {
    return async (dispatch) => {

        dispatch({
            type: SET_ACTIVITY_TYPE_RESET
        });

    };
}

export function setFilterActivityType(filterActivityType) {
    return async (dispatch) => {

        dispatch({
            type: SET_FILTER_ACTIVITY_TYPE_SUCCESS,
            filterActivityType
        });

    };
}

export function resetFilterActivityType() {
    return async (dispatch) => {

        dispatch({
            type: SET_FILTER_ACTIVITY_TYPE_RESET
        });

    };
}
