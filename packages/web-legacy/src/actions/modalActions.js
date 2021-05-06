import {
  OPEN_LONGIN_MODAL,
  CLOSE_LONGIN_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL,
  OPEN_HOME_BOOKING_MODAL,
  CLOSE_HOME_BOOKING_MODAL,
  OPEN_PAYMENT_BOOKING_MODAL,
  CLOSE_PAYMENT_BOOKING_MODAL,
  OPEN_CARD_MODAL,
  CLOSE_CARD_MODAL,
  OPEN_HOME_ADD_CARD_MODAL,
  CLOSE_HOME_ADD_CARD_MODAL,
  OPEN_VIEW_LIST_ADD_CARD_MODAL,
  CLOSE_VIEW_LIST_ADD_CARD_MODAL,
  OPEN_FILTER_MODAL,
  CLOSE_FILTER_MODAL,
  OPEN_SCANNER_MODAL,
  CLOSE_SCANNER_MODAL,
  OPEN_APPLY_FOR_BETA_MODAL,
  CLOSE_APPLY_FOR_BETA_MODAL,
  OPEN_WORKPLACE_SUGGEST_MODAL,
  CLOSE_WORKPLACE_SUGGEST_MODAL
} from '../constants';
import { toggleClose } from './Menu/toggleControl';
import { initialize } from 'redux-form';

export function openLoginModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_LONGIN_MODAL,
      isLoginModalOpen: true,
      isForgotPasswordOpen: false,
    });
    dispatch(toggleClose());
  };
}

export function closeLoginModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LONGIN_MODAL,
      isLoginModalOpen: false,
    });
    dispatch(toggleClose());
  };
}

export function openForgotPasswordModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: true,
      isLoginModalOpen: false,
    });
  };
}

export function closeForgotPasswordModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: false,
    });
  };
}



export function openSocialShareModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModal: true,
      },
    });
  };
}

export function closeSocialShareModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModal: false,
      },
    });
  };
}

export function openHomeBookingModal(listId) {
  return (dispatch, getState) => {
    dispatch(initialize('BookingForm', {}))
    dispatch({
      type: OPEN_HOME_BOOKING_MODAL,
      listId
    });
  };
}

export function closeHomeBookingModal() {
  return (dispatch, getState) => {
    dispatch(closeHomeAddCardModal())
    dispatch({
      type: CLOSE_HOME_BOOKING_MODAL,
    });
  };
}

export function openPaymentBookingModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_PAYMENT_BOOKING_MODAL
    });
  };
}

export function closePaymentBookingModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_PAYMENT_BOOKING_MODAL,
    });
  };
}

export function openCardModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_CARD_MODAL
    });
  };
}

export function closeCardModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_CARD_MODAL,
    });
  };
}

export function openHomeAddCardModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_HOME_ADD_CARD_MODAL
    });
  };
}

export function closeHomeAddCardModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_HOME_ADD_CARD_MODAL,
    });
  };
}

export function openViewListAddCardModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_VIEW_LIST_ADD_CARD_MODAL
    });
  };
}

export function closeViewListAddCardModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_VIEW_LIST_ADD_CARD_MODAL,
    });
  };
}

export function openFilterModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_FILTER_MODAL
    });
  };
}

export function closeFilterModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_FILTER_MODAL,
    });
  };
}

export function openScannerModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SCANNER_MODAL
    });
  };
}

export function closeScannerModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SCANNER_MODAL
    });
  };
}

export function openWorkplaceSuggestModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_WORKPLACE_SUGGEST_MODAL
    });
  };
}

export function closeWorkplaceSuggestModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_WORKPLACE_SUGGEST_MODAL
    });
  };
}

export function openApplyForBetaModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_APPLY_FOR_BETA_MODAL
    });
  };
}

export function closeApplyForBetaModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_APPLY_FOR_BETA_MODAL
    });
  };
}