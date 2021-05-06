import { toastr } from 'react-redux-toastr';

import fetch from '../../core/fetch';

import { setRuntimeVariable } from '../../actions/runtime';
import { loadAccount } from '../../actions/account';

async function submit(values, dispatch) {

  const query = `
  query (
    $firstName:String,
    $lastName:String,
  	$gender: String,
    $dateOfBirth: String,
    $email: String!,
  	$phoneNumber: String,
  	$preferredLanguage: String,
  	$preferredCurrency: String,
  	$location: String,
    $info: String,
    $loggedinEmail: String,
    $countryCode: String,
    $countryName: String,
    $zipcode: String,
    $companyName: String
  ) {
      userEditProfile (
        firstName:$firstName,
        lastName:$lastName,
        gender: $gender,
        dateOfBirth: $dateOfBirth,
        email: $email,
        phoneNumber: $phoneNumber,
        preferredLanguage: $preferredLanguage,
        preferredCurrency: $preferredCurrency,
        location: $location,
        info: $info,
        loggedinEmail: $loggedinEmail,
        countryCode: $countryCode,
        countryName: $countryName,
        zipcode: $zipcode,
        companyName: $companyName
      ) {
        status
      }
    }
    `;

  let firstNameValue = values.firstName ? values.firstName.trim() : values.firstName,
    lastNameValue = values.lastName ? values.lastName.trim() : values.lastName,
    loggedinEmailValue = values.loggedinEmail ? values.loggedinEmail.trim() : values.loggedinEmail,
    countryCode = values.phoneDialCode ? values.phoneDialCode : values.dialCode,
    countryName = values.phoneCountryCode ? values.phoneCountryCode : null,
    zipcode = values.zipcode ? values.zipcode.trim() : values.zipcode;

  const params = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: values.email,
    preferredLanguage: 'sv-SV',
    loggedinEmail: loggedinEmailValue,
    countryCode: countryCode,
    countryName: countryName,
    zipcode,
    companyName: values.companyName
  };
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.userEditProfile.status == "success") {
    await dispatch(loadAccount());
    toastr.success("Update Profile", "Your changes are updated!");
  } else if (data.userEditProfile.status == "email") {
    toastr.error("Update Profile Failed", "Email already exist, please try another email address!");
  } else if (data.userEditProfile.status == "notLoggedIn") {
    dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: false,
    }));
    toastr.error("Update Profile Failed", "You are not logged in, please login and try again!");
  } else {
    toastr.error("Update Profile Failed", "Sorry, something went wrong! Reload this page and try again!");
  }

}

export default submit;