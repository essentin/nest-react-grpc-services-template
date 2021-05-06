import {
  OPEN_LIST_SETTINGS_MODAL,
  CLOSE_LIST_SETTINGS_MODAL,
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL,
  OPEN_CANCEL_MODAL,
  CLOSE_CANCEL_MODAL,
  OPEN_MANAGE_USER_MODAL,
  CLOSE_MANAGE_USER_MODAL,
  OPEN_CREATE_HOST_MODAL,
  CLOSE_CREATE_HOST_MODAL
} from '../../constants';

export default function adminModalStatus(state = {}, action) {
  switch (action.type) {

    case OPEN_LIST_SETTINGS_MODAL:
      return {
        ...state,
        listSettingsModal: action.listSettingsModal
      };

    case CLOSE_LIST_SETTINGS_MODAL:
      return {
        ...state,
        listSettingsModal: action.listSettingsModal
      };

    case OPEN_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: action.payload.adminRolesModalType
      };

    case CLOSE_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: null
      };

    case OPEN_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: action.payload.adminUserModalType
      };

    case CLOSE_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: null
      };

    case OPEN_CANCEL_MODAL:
      return {
        ...state,
        cancelModal: action.payload.cancelModal
      };

    case CLOSE_CANCEL_MODAL:
      return {
        ...state,
        cancelModal: action.payload.cancelModal
      };

    case OPEN_MANAGE_USER_MODAL:
      return {
        ...state,
        manageUserModal: action.payload.manageUserModal
      };

    case CLOSE_MANAGE_USER_MODAL:
      return {
        ...state,
        manageUserModal: action.payload.manageUserModal
      };

    case OPEN_CREATE_HOST_MODAL:
      return {
        ...state,
        createHostModal: action.payload.createHostModal
      };

    case CLOSE_CREATE_HOST_MODAL:
      return {
        ...state,
        createHostModal: action.payload.createHostModal
      };

    default:
      return {
        ...state,
      };
  }
}
