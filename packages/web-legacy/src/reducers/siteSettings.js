import {
  SET_SITE_SETTINGS_SUCCESS,
  GET_LOGO_SUCCESS,
  LOGO_UPLOAD_LOADER_START,
  LOGO_UPLOAD_SUCCESS,
  LOGO_UPLOAD_ERROR,
  REMOVE_LOGO_SUCCESS,
  REMOVE_LOGO_ERROR,
  HOME_LOGO_UPLOAD_LOADER_START,
  HOME_LOGO_UPLOAD_ERROR,
  HOME_LOGO_UPLOAD_SUCCESS,
  REMOVE_HOME_LOGO_SUCCESS,
  REMOVE_HOME_LOGO_ERROR,
  EMAIL_LOGO_UPLOAD_LOADER_START,
  EMAIL_LOGO_UPLOAD_SUCCESS,
  EMAIL_LOGO_UPLOAD_ERROR,
  REMOVE_EMAIL_LOGO_SUCCESS,
  REMOVE_EMAIL_LOGO_ERROR,
} from '../constants';

export default function siteSettings(state = {}, action) {
  switch (action.type) {
    case SET_SITE_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    case GET_LOGO_SUCCESS:
      return {
        ...state,
        logodata: action.payload.logodata,
      };

    case LOGO_UPLOAD_LOADER_START:
      return {
        ...state,
        logoUploaderLoading: action.payload.logoUploaderLoading,
      };

    case LOGO_UPLOAD_SUCCESS:
      return {
        ...state,
        logoUploaderLoading: action.payload.logoUploaderLoading,
      };

    case LOGO_UPLOAD_ERROR:
      return {
        ...state,
        logoUploaderLoading: action.payload.logoUploaderLoading,
      };

    case REMOVE_LOGO_SUCCESS:
      return {
        ...state,
        logoUploaderLoading: action.payload.logoUploaderLoading,
        logodata: null,
      };

    case REMOVE_LOGO_ERROR:
      return {
        ...state,
        logoUploaderLoading: action.payload.logoUploaderLoading,
      };

    case HOME_LOGO_UPLOAD_LOADER_START:
      return {
        ...state,
        homeLogoUploaderLoading: action.payload.homeLogoUploaderLoading,
      };

    case HOME_LOGO_UPLOAD_ERROR:
      return {
        ...state,
        homeLogoUploaderLoading: action.payload.homeLogoUploaderLoading,
      };

    case HOME_LOGO_UPLOAD_SUCCESS:
      return {
        ...state,
        homeLogoUploaderLoading: action.payload.homeLogoUploaderLoading,
      };

    case REMOVE_HOME_LOGO_SUCCESS:
      return {
        ...state,
        homeLogoUploaderLoading: action.payload.homeLogoUploaderLoading,
        logodata: null,
      };

    case REMOVE_HOME_LOGO_ERROR:
      return {
        ...state,
        homeLogoUploaderLoading: action.payload.homeLogoUploaderLoading,
      };

    case EMAIL_LOGO_UPLOAD_LOADER_START:
      return {
        ...state,
        emailLogoUploaderLoading: action.payload.emailLogoUploaderLoading,
      };

    case EMAIL_LOGO_UPLOAD_ERROR:
      return {
        ...state,
        emailLogoUploaderLoading: action.payload.emailLogoUploaderLoading,
      };

    case EMAIL_LOGO_UPLOAD_SUCCESS:
      return {
        ...state,
        emailLogoUploaderLoading: action.payload.emailLogoUploaderLoading,
      };

    case REMOVE_EMAIL_LOGO_SUCCESS:
      return {
        ...state,
        emailLogoUploaderLoading: action.payload.emailLogoUploaderLoading,
        logodata: null,
      };

    case REMOVE_EMAIL_LOGO_ERROR:
      return {
        ...state,
        emailLogoUploaderLoading: action.payload.emailLogoUploaderLoading,
      };

    default:
      return state;
  }
}
