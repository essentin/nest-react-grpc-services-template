import { gql } from 'react-apollo';

import { toastr } from 'react-redux-toastr';

const query = gql`
query GetUserInvitationSettings{
    getUserInvitationSettings {
      status
      result {
        id
        maxInvites
      }
      errorMessage
    }
  }
`;

export function updateUserInvitationSettings(maxInvites) {

    return async (dispatch, getState, { client }) => {
        try {
            const mutation = gql`
                mutation UpdateUserInvitationSettings($maxInvites: Int){
                    updateUserInvitationSettings(maxInvites:$maxInvites) {
                        status
                        errorMessage
                    }
                }`;

            const { data } = await client.mutate({
                mutation,
                variables: { maxInvites },
                refetchQueries: [{ query }]
            });

            if (data && data.updateUserInvitationSettings && data.updateUserInvitationSettings.status) {
                let status = data.updateUserInvitationSettings.status;
                if (status === 200) {
                    toastr.success("User Invite Settings!", "Invite Settings is updated successfully.");
                } else if (status === 401) {
                    toastr.error("User Invite Settings!", "Please login and continue!");
                } else {
                    toastr.error("User Invite Settings!", "Something went wrong, try again later");
                }
            }

        } catch (error) {
            toastr.error("User Invite Settings!", "Something went wrong, try again later");
            return false;
        }

        return true;
    };
}