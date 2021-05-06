import {
    ADMIN_LOAD_ACTIVITY_TYPE_SUCCESS,
    GET_LISTING_ACTIVITY_RESET,
    GET_LISTING_ACTIVITY_SUCCESS,
    GET_SELECTED_ACTIVITY_RESET,
    GET_SELECTED_ACTIVITY_SUCCESS,
    SET_ACTIVITY_TYPE_SUCCESS,
    SET_ACTIVITY_TYPE_RESET,
    SET_FILTER_ACTIVITY_TYPE_SUCCESS,
    SET_FILTER_ACTIVITY_TYPE_RESET,
} from '../../constants';

export default function activityType(state = {}, action) {

    switch (action.type) {

        case ADMIN_LOAD_ACTIVITY_TYPE_SUCCESS:
            return {
                ...state,
                data: action.activityType,
            };

        case GET_LISTING_ACTIVITY_RESET:
            return {
                ...state,
                listActivities: [],
            };

        case GET_LISTING_ACTIVITY_SUCCESS:
            return {
                ...state,
                listActivities: action.listActivities,
            };

        case GET_SELECTED_ACTIVITY_RESET:
            return {
                ...state,
                selectedActivity: null,
            };

        case GET_SELECTED_ACTIVITY_SUCCESS:
            return {
                ...state,
                selectedActivity: action.selectedActivity,
            };

        case SET_ACTIVITY_TYPE_SUCCESS:
            return {
                ...state,
                selectedActivityType: action.selectedActivityType,
            };

        case SET_ACTIVITY_TYPE_RESET:
            return {
                ...state,
                selectedActivityType: null,
            };

        case SET_FILTER_ACTIVITY_TYPE_SUCCESS:
            return {
                ...state,
                filterActivityType: action.filterActivityType,
            };

        case SET_FILTER_ACTIVITY_TYPE_RESET:
            return {
                ...state,
                filterActivityType: null,
            };

        default:
            return state;
    }
}
