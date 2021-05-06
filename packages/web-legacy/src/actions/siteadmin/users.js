import { gql } from 'react-apollo';

import {
  ADMIN_DELETE_USER_START,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
query userManagement($currentPage: Int, $searchList: String, $userType: String) {
  userManagement(currentPage: $currentPage, searchList: $searchList, userType: $userType) {
    count
    usersData {
      id
      email
      profile {
        profileId
        firstName
        lastName
        gender
        dateOfBirth
        phoneNumber
        preferredLanguage
        preferredCurrency
        location
        info
        createdAt
      }
      userBanStatus
      userType
    }
  }
}
`;

export function deleteUser(userId, profileId) {

  const mutation = gql`
    mutation deleteUser ($userId:String!) {
        deleteUser (userId:$userId) {
          status
        }
      }
    `;

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_DELETE_USER_START,
      data: userId
    });

    try {

      const { data } = await client.mutate({
        mutation,
        variables: { userId },
        refetchQueries: [{ query, variables: { currentPage: 1 } }]
      });

      if (data.deleteUser.status == "success") {
        dispatch({
          type: ADMIN_DELETE_USER_SUCCESS,
        });
        toastr.success("Delete User", "User deleted successfully!");
        history.push('/siteadmin/users');
      } else {
        toastr.error("Delete User", "User deletion failed!");
      }

    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_USER_ERROR,
        payload: {
          error
        }
      });

    }

  };
}

export function updateUserType(id, userType, currentPage, searchList, searchUserType) {

  if (!userType) {
    toastr.error("Select Guest/Host", 'You have to select either Guest or Host');
    return ;
  }

  const mutation = gql`
    mutation UpdateUserType($id: String!, $userType: Int!) {
      updateUserType(id: $id, userType: $userType) {
        status
        errorMessage
      }
    }
  `

  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation,
        variables: { id, userType },
        fetchPolicy: 'network-only',
        refetchQueries: [{ query, variables: { currentPage, searchList, userType: searchUserType } }]
      });

      if (data.updateUserType.status == 200)
        toastr.success("Update User Type", "User Type updated successfully!");
      else
        toastr.error("Error", data.updateUserType.errorMessage || "User Type updation failed");
    } catch (error) {
      toastr.error("Error", 'Oops! something went wrong. Please try again.');
    }
  };
}