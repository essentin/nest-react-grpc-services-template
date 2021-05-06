import messages from '../../../locale/messages';

const validateStep2 = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  } else if (values.title && values.title.trim() == "") {
    errors.title = messages.required;
  } else if (values.title && values.title.length > 30) {
    errors.title = messages.maxThirtyCharacter;
  }

  if (!values.description) {
    errors.description = messages.required;
  } else if (values.description && values.description.trim() == "") {
    errors.description = messages.required;
  } else if (values.description && values.description.length < 50) {
    errors.description = messages.descriptionMinLen;
  }

  // if (!values.houseRuleDesc) {
  //   errors.houseRuleDesc = messages.required;
  // } else if (values.houseRuleDesc && values.houseRuleDesc.trim() == "") {
  //   errors.houseRuleDesc = messages.required;
  // } else if (values.houseRuleDesc && values.houseRuleDesc.length < 30) {
  //   errors.houseRuleDesc = messages.houseRuleMinLen;
  // }

  if (values.arrivalInstruction && values.arrivalInstruction.trim() == "") {
    errors.arrivalInstruction = messages.invalid;
  }

  return errors
}

export default validateStep2
