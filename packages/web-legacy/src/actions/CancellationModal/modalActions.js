import {
    OPEN_CANCELLATION_MODAL,
    CLOSE_CANCELLATION_MODAL,
} from '../../constants';
import { initialize } from 'redux-form';
import { getCancellationData } from '../CancellationModal/getCancellationData';


export function openCancellationModal(initialData, userType, currentPage, dateFilter) {
    return async (dispatch) => {
        dispatch(getCancellationData(initialData.id, userType, currentPage, dateFilter))
        dispatch({
            type: OPEN_CANCELLATION_MODAL,
            payload: {
                cancellationModal: true
            }
        });
        return true;
    };
}

export function closeCancellationModal() {
    return async (dispatch) => {
        dispatch(initialize('CancellationForm', ''));
        dispatch({
            type: CLOSE_CANCELLATION_MODAL,
            payload: {
                cancellationModal: false
            }
        });
        return true;
    };
}