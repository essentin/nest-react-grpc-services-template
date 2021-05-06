import messages from '../../../locale/messages';

const validate = values => {

  let errors = {}

  if (!values.maxInvites) {
    errors.maxInvites = messages.required;
  } else if (values.maxInvites.toString().trim() == "") {
    errors.maxInvites = messages.required;
  }else if(isNaN(values.maxInvites)){
    errors.maxInvites = messages.limitNumericValue;
  } else if (values.maxInvites <= 0) {
    errors.maxInvites = messages.greaterThanZero;
  }

  return errors
}

export default validate;
