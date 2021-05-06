import { gql } from 'react-apollo';

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
          maxInviteCount
        }
        userBanStatus
        userType
      }
    }
  }
`;

export function updateUserMaxInvites(variables) {

  return async (dispatch, getState, { client }) => {
    try {
      const mutation = gql`
            mutation updateUserMaxInvites($profileId: Int!, $maxInviteCount: Int!) {
              updateUserMaxInvites(profileId: $profileId, maxInviteCount: $maxInviteCount) {
                status
                errorMessage
              }
            }`;

      const { data } = await client.mutate({
        mutation,
        variables,
        refetchQueries: [{
          query,
          variables: {
            currentPage: variables.currentPage,
            userType: variables.userType,
            searchList: variables.searchList
          }
        }]
      });

      if (data && data.updateUserMaxInvites && data.updateUserMaxInvites.status) {
        let status = data.updateUserMaxInvites.status;
        let errorMessage = data.updateUserMaxInvites.errorMessage;

        if (status === 200) {
          toastr.success("User Manage", "User maximum invites updated successfully!");
        } else if (status === 401) {
          toastr.error("User Manage", "Please login and continue!");
        } else {
          toastr.error("User Manage", errorMessage ? errorMessage : "Something went wrong, try again later");
        }
      } else {
        toastr.error("User Manage", "Something went wrong, try again later");
      }
    } catch (error) {
      toastr.error("User Manage", "Something went wrong, try again later");
      return false;
    }
    return true;
  };
}