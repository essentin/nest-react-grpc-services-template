import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
  GET_SERVICE_FEES_SUCCESS,
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR,
  GET_DEFAULT_CARD_START,
  GET_DEFAULT_CARD_SUCCESS,
  GET_DEFAULT_CARD_ERROR,
  BOOKING_PAYMENT_END,
  BOOKING_PROCESS_END
} from '../constants';

export default function book(state = {}, action) {
  switch (action.type) {
    case BOOKING_PROCESS_START:
      return {
        ...state,
        data: null,
        bookDetails: null,
        bookingLoading: action.payload.bookingLoading,
      };

    case BOOKING_PROCESS_END:
      return {
        ...state,
        bookingLoading: action.payload.bookingLoading,
      };

    case BOOKING_PROCESS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        bookDetails: action.payload.bookDetails,
        bookingLoading: action.payload.bookingLoading,
        customerId: action.payload.customerId,
        paymentMethodId: action.payload.paymentMethodId,
      };

    case BOOKING_PROCESS_ERROR:
      return {
        ...state,
        bookingLoading: action.payload.bookingLoading,
      };

    case BOOKING_PAYMENT_START:
      return {
        ...state,
        paymentLoading: action.payload.paymentLoading,
      };

    case BOOKING_PAYMENT_END:
      return {
        ...state,
        paymentLoading: action.payload.paymentLoading,
      };

    case BOOKING_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentLoading: action.payload.paymentLoading,
      };

    case BOOKING_PAYMENT_ERROR:
      return {
        ...state,
        paymentLoading: action.payload.paymentLoading,
      };

    case GET_SERVICE_FEES_SUCCESS:
      return {
        ...state,
        serviceFees: action.payload.serviceFees,
      };

    case GET_DEFAULT_CARD_START:
      return {
        ...state,
        defaultCardDetails: null,
      };

    case GET_DEFAULT_CARD_SUCCESS:
      return {
        ...state,
        defaultCardDetails: action.defaultCardDetails,
      };

    case GET_DEFAULT_CARD_ERROR:
      return {
        ...state,
        defaultCardDetails: null,
      };

    default:
      return state;
  }
}
