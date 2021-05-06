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

import { initialize } from 'redux-form';

export function openListSettingsModal(initialData, formName) {

  return (dispatch) => {

    // Reinitialize the form values
    dispatch(initialize(formName, initialData, true));

    dispatch({
      type: OPEN_LIST_SETTINGS_MODAL,
      listSettingsModal: true,
    });
  };

}

export function openEditListSettingsModal(initialData) {

  return (dispatch) => {

    // Reinitialize the form values
    dispatch(initialize("EditListSettingsForm", initialData, true));

    dispatch({
      type: OPEN_LIST_SETTINGS_MODAL,
      listSettingsModal: true,
    });
  };

}

export function closeListSettingsModal() {

  return (dispatch) => {
    dispatch({
      type: CLOSE_LIST_SETTINGS_MODAL,
      listSettingsModal: false
    });
  };
}

export function openAdminRolesModal(type, formData) {
  return (dispatch) => {
    if (type === 'edit') {
      dispatch(initialize("AdminRolesForm", formData, true));
    }

    dispatch({
      type: OPEN_ADMIN_ROLES_MODAL,
      payload: {
        adminRolesModal: true,
        adminRolesModalType: type
      }
    });
  }
}

export function closeAdminRolesModal() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_ADMIN_ROLES_MODAL,
      payload: {
        adminRolesModal: false
      }
    });
  }
}

export function openAdminUserModal(type, formData) {
  return (dispatch) => {
    if (type === 'edit') {
      dispatch(initialize("AdminUserForm", formData, true));
    }

    dispatch({
      type: OPEN_ADMIN_USER_MODAL,
      payload: {
        adminUserModal: true,
        adminUserModalType: type
      }
    });
  }
}

export function closeAdminUserModal() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_ADMIN_USER_MODAL,
      payload: {
        adminUserModal: false
      }
    });
  }
}

export function openCancelModal(formData) {
  return (dispatch) => {
    dispatch({
      type: OPEN_CANCEL_MODAL,
      payload: {
        cancelModal: true,
      }
    });
  }
}

export function closeCancelModal() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_CANCEL_MODAL,
      payload: {
        cancelModal: false
      }
    });
  }
}

export function openMangeUserModal(maxInviteCount, profileId, currentPage, userType, searchList) {
  return (dispatch) => {
    dispatch(initialize("UserManagementForm", { maxInviteCount, profileId, currentPage, userType, searchList }, true));
    dispatch({
      type: OPEN_MANAGE_USER_MODAL,
      payload: {
        manageUserModal: true,
      }
    });
  }
}

export function closeManageUserModal() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MANAGE_USER_MODAL,
      payload: {
        manageUserModal: false
      }
    });
  }
}

export function openCreateHostModal({ currentPage, userType, searchList }) {
  return (dispatch) => {
    dispatch(initialize("CreateHostForm", { currentPage, userType, searchList }, true));
    dispatch({
      type: OPEN_CREATE_HOST_MODAL,
      payload: {
        createHostModal: true,
      }
    });
  }
}

export function closeCreateHostModal() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_CREATE_HOST_MODAL,
      payload: {
        createHostModal: false
      }
    });
  }
}