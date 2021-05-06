import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.required;
  } else if (values.firstName && values.firstName.toString().trim() == "") {
    errors.firstName = messages.required;
  }

  if (!values.lastName) {
    errors.lastName = messages.required;
  } else if (values.lastName && values.lastName.toString().trim() == "") {
    errors.lastName = messages.required;
  }

  if (!values.email) {
    errors.email = messages.required;
  } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  } else if (values.zipcode && !values.zipcode.toString().match(/^\d{3}(\s)?\d{2}$/i)) {
    errors.zipcode = messages.invalid;
  }

  if (!values.password) {
    errors.password = messages.required;
  } else if (values.password && values.password.length < 8) {
    errors.password = messages.passwordInvalid;
  }
  
  return errors
}
export default validate
