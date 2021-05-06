import messages from '../../../locale/messages';

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

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  } else if (values.zipcode && !values.zipcode.toString().match(/^\d{3}(\s)?\d{2}$/i)) {
    errors.zipcode = messages.invalid;
  }

  if (values.companyName && values.companyName.toString().trim() == "") {
    errors.companyName = messages.invalid;
  }


  return errors
}

export default validate
