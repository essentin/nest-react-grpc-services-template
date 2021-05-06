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

export function createHostUser(variables) {

  return async (dispatch, getState, { client }) => {
    try {
        const mutation = gql`mutation CreateHostUser($firstName: String!, $lastName: String, $email: String!, $password: String!, $zipcode: String) {
            createHostUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, zipcode: $zipcode) {
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

      if (data && data.createHostUser && data.createHostUser.status) {
        let status = data.createHostUser.status;
        let errorMessage = data.createHostUser.errorMessage;

        if (status === 200) {
          toastr.success("Success!", "Host user added successfully.");
        } else if (status === 401) {
          toastr.error("Error!", "Please login and continue.");
        } else {
          toastr.error("Error!", errorMessage ? errorMessage : "Something went wrong, try again later");
        }
      } else {
        toastr.error("Error!", "Something went wrong, try again later");
      }
    } catch (error) {
      toastr.error("Error!", "Something went wrong, try again later");
      return false;
    }
    return true;
  };
}