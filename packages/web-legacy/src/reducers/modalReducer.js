import {
  OPEN_LONGIN_MODAL,
  CLOSE_LONGIN_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_WISH_LIST_GROUP_MODAL,
  CLOSE_WISH_LIST_GROUP_MODAL,
  OPEN_WISH_LIST_MODAL,
  CLOSE_WISH_LIST_MODAL,
  OPEN_SMS_VERIFICATION_MODAL,
  CLOSE_SMS_VERIFICATION_MODAL,
  OPEN_BOOKING_MODAL,
  CLOSE_BOOKING_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL,
  OPEN_HEADER_MODAL,
  CLOSE_HEADER_MODAL,
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
  OPEN_CANCELLATION_MODAL,
  CLOSE_CANCELLATION_MODAL,
  OPEN_FILTER_MODAL,
  CLOSE_FILTER_MODAL,
  SET_ACTIVE_MENU,
  OPEN_SCANNER_MODAL,
  CLOSE_SCANNER_MODAL,
  OPEN_APPLY_FOR_BETA_MODAL,
  CLOSE_APPLY_FOR_BETA_MODAL,
  OPEN_WORKPLACE_SUGGEST_MODAL,
  CLOSE_WORKPLACE_SUGGEST_MODAL
} from '../constants';

export default function modalStatus(state = {}, action) {
  switch (action.type) {
    case OPEN_LONGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: action.isLoginModalOpen,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
      };

    case CLOSE_LONGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
      };

    case OPEN_WISH_LIST_GROUP_MODAL:
      return {
        ...state,
        wishListGroupModalOpen: true,
      };

    case CLOSE_WISH_LIST_GROUP_MODAL:
      return {
        ...state,
        wishListGroupModalOpen: false,
      };

    case OPEN_WISH_LIST_MODAL:
      return {
        ...state,
        wishListModalOpen: action.payload.wishListModalOpen,
        listId: action.payload.listId,
      };

    case CLOSE_WISH_LIST_MODAL:
      return {
        ...state,
        wishListModalOpen: false,
      };

    case OPEN_SMS_VERIFICATION_MODAL:
      return {
        ...state,
        smsVerificationModalOpen: action.payload.smsVerificationModalOpen,
        formType: action.payload.formType,
      };

    case CLOSE_SMS_VERIFICATION_MODAL:
      return {
        ...state,
        smsVerificationModalOpen: false,
        formType: undefined,
      };

    case OPEN_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: true,
      };

    case CLOSE_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: false,
      };

    case OPEN_SOCIAL_SHARE_MODAL:
      return {
        ...state,
        isSocialShareModal: action.payload.isSocialShareModal,
      };
    case CLOSE_SOCIAL_SHARE_MODAL:
      return {
        ...state,
        isSocialShareModal: action.payload.isSocialShareModal,
      };

    case OPEN_HEADER_MODAL:
      return {
        ...state,
        [action.payload.modalType]: action.payload.actionValue,
      };

    case CLOSE_HEADER_MODAL:
      return {
        ...state,
        [action.payload.modalType]: action.payload.actionValue,
      };

    case OPEN_HOME_BOOKING_MODAL:
      return {
        ...state,
        homeBookingModalStatus: true,
        homepageListId: action.listId
      };

    case CLOSE_HOME_BOOKING_MODAL:
      return {
        ...state,
        homeBookingModalStatus: false,
        homepageListId: null
      };

    case OPEN_PAYMENT_BOOKING_MODAL:
      return {
        ...state,
        paymentBookingModalStatus: true,
      };

    case CLOSE_PAYMENT_BOOKING_MODAL:
      return {
        ...state,
        paymentBookingModalStatus: false,
      };

    case OPEN_CARD_MODAL:
      return {
        ...state,
        cardModalStatus: true,
      };

    case CLOSE_CARD_MODAL:
      return {
        ...state,
        cardModalStatus: false,
      };

    case OPEN_HOME_ADD_CARD_MODAL:
      return {
        ...state,
        homeCardModalStatus: true,
      };

    case CLOSE_HOME_ADD_CARD_MODAL:
      return {
        ...state,
        homeCardModalStatus: false,
      };

    case OPEN_VIEW_LIST_ADD_CARD_MODAL:
      return {
        ...state,
        viewListCardModalStatus: true,
      };

    case CLOSE_VIEW_LIST_ADD_CARD_MODAL:
      return {
        ...state,
        viewListCardModalStatus: false,
      };


    case OPEN_CANCELLATION_MODAL:
      return {
        ...state,
        cancellationModal: true,
      };

    case CLOSE_CANCELLATION_MODAL:
      return {
        ...state,
        cancellationModal: false,
      };

    case OPEN_FILTER_MODAL:
      return {
        ...state,
        filterModal: true,
      };

    case CLOSE_FILTER_MODAL:
      return {
        ...state,
        filterModal: false,
      };

    case SET_ACTIVE_MENU:
      return {
        ...state,
        selectedMenu: action.selectedMenu,
      };

    case OPEN_SCANNER_MODAL:
      return {
        ...state,
        scannerModal: true,
      };

    case CLOSE_SCANNER_MODAL:
      return {
        ...state,
        scannerModal: false,
      };

    case OPEN_WORKPLACE_SUGGEST_MODAL:
      return {
        ...state,
        workplaceSuggestModal: true,
      };

    case CLOSE_WORKPLACE_SUGGEST_MODAL:
      return {
        ...state,
        workplaceSuggestModal: false,
      };

    case OPEN_APPLY_FOR_BETA_MODAL:
      return {
        ...state,
        applyForBetaModal: true,
      };

    case CLOSE_APPLY_FOR_BETA_MODAL:
      return {
        ...state,
        applyForBetaModal: false,
      };

    default:
      return {
        ...state,
      };
  }
}
