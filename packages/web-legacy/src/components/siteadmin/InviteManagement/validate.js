import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.email) {
    errors.email = messages.required;
  } else if (values.email && values.email.trim() == "") {
    errors.email = messages.emailBlankSpace;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.firstName || values.firstName.trim() === "") {
    errors.firstName = messages.required;
  }

  return errors
}

export default validate