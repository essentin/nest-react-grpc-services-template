import {
  SET_USER_DATA_START,
  SET_USER_DATA_SUCCESS,
  SET_USER_DATA_ERROR,
} from '../constants';

// Redirection
import history from '../core/history';

import getAllFeatureFlag from '../actions/getAllFeatureFlag';

const query = `
  query userAccount{
    userAccount {
      userId
      profileId
      firstName
      lastName
      displayName
      gender
      dateOfBirth
      email
      userBanStatus
      phoneNumber
      preferredLanguage
      preferredCurrency
      location
      info
      createdAt
      picture
      country
      countryCode
      countryName
      verification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
        isPhoneVerified
      }
      userData {
        type
      }
      hasCard
      myBookingsCount
      userType
      zipcode
      isPhotoSkipped
      stepTwo
      stepThree
      maxInviteCount
      inviteCode
      usedInvitesCount
      companyName
      isPartner
    }
  }
`;

export function loadAccount(loginScreen, refer) {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({
      type: SET_USER_DATA_START,
    });
    try {
      const { data } = await graphqlRequest(query);

      if (data && data.userAccount) {
        let dateOfBirth = data.userAccount.dateOfBirth;
        let updatedProfileData;
        if (dateOfBirth != null) {
          let dateOfBirthArray = dateOfBirth && dateOfBirth.split('-');
          let dateOfBirthObj = {
            month: Number(dateOfBirthArray[0] - 1),
            year: dateOfBirthArray[1],
            day: dateOfBirthArray[2],
          };
          updatedProfileData = Object.assign(
            {},
            data.userAccount,
            dateOfBirthObj,
          );
        } else {
          updatedProfileData = data.userAccount;
        }
        dispatch({
          type: SET_USER_DATA_SUCCESS,
          updatedProfileData,
        });
       await dispatch(getAllFeatureFlag());

        if (loginScreen) {
          let account = getState().account && getState().account.data;
          let isAdminAuthenticated = getState().runtime && getState().runtime.isAdminAuthenticated;

          if (!isAdminAuthenticated && account && (!account.stepTwo)) history.push('/register/step-two');
          else if (!isAdminAuthenticated && account && (!account.stepThree)) history.push('/register/step-three');
          else {
            if (refer) {
              history.push(refer);
            } else {
              history.push(`/user/edit/`);
            }
          }
        }
      }
    } catch (error) {
      dispatch({
        type: SET_USER_DATA_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}