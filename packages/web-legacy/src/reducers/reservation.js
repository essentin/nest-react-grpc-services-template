import {
  ADMIN_VIEW_RECEIPT_START,
  ADMIN_VIEW_RECEIPT_SUCCESS,
  ADMIN_RESERVATION_MODAL_SHOW,
  ADMIN_RESERVATION_MODAL_HIDE,
  ADMIN_REFUND_GUEST_START,
  ADMIN_REFUND_GUEST_SUCCESS,
  ADMIN_REFUND_GUEST_ERROR,
} from '../constants';

export default function reservation(state = {}, action) {
  switch (action.type) {
    case ADMIN_VIEW_RECEIPT_START:
      return {
        ...state,
        data: null,
      };

    case ADMIN_VIEW_RECEIPT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };

    case ADMIN_REFUND_GUEST_START:
      return {
        ...state,
        refundLoading: action.payload.refundLoading,
        reservationId: action.payload.reservationId,
      };

    case ADMIN_REFUND_GUEST_SUCCESS:
      return {
        ...state,
        refundLoading: action.payload.refundLoading,
        refundCompleted: action.payload.completed,
      };

    case ADMIN_REFUND_GUEST_ERROR:
      return {
        ...state,
        refundLoading: action.payload.refundLoading,
      };

    case ADMIN_RESERVATION_MODAL_SHOW:
      return {
        ...state,
        reservationModal: action.payload.reservationModal,
      };

    case ADMIN_RESERVATION_MODAL_HIDE:
      return {
        ...state,
        reservationModal: action.payload.reservationModal,
      };

    default:
      return state;
  }
}
