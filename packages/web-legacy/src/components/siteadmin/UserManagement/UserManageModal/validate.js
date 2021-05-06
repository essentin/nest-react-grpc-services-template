import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.maxInviteCount) {
    errors.maxInviteCount = messages.required;
  } else if (values.maxInviteCount.toString().trim() == "") {
    errors.maxInviteCount = messages.required;
  } else if (isNaN(values.maxInviteCount)) {
    errors.maxInviteCount = messages.limitNumericValue;
  } else if (values.maxInviteCount <= 0) {
    errors.maxInviteCount = messages.greaterThanZero;
  }
  
  return errors
}
export default validate
