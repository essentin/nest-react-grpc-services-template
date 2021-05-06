import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.required;
  } else if (values.firstName && values.firstName.trim() == "") {
    errors.firstName = messages.required;
  }

  if (!values.lastName) {
    errors.lastName = messages.required;
  } else if (values.lastName && values.lastName.trim() == "") {
    errors.lastName = messages.required;
  }

  if (!values.email) {
    errors.email = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required;
  } else if (values.phoneNumber && values.phoneNumber.trim() == "") {
    errors.phoneNumber = messages.required;
  } else if (isNaN(values.phoneNumber)) {
    errors.phoneNumber = messages.phoneNumberInvalid;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  } else if (values.zipcode && !values.zipcode.toString().match(/^\d{3}(\s)?\d{2}$/i)) {
    errors.zipcode = messages.required;
  }

  if (values.companyName && values.companyName.toString().trim() == "") {
    errors.companyName = messages.invalid;
  }

  return errors
}

export default validate;