import messages from '../../../locale/messages';
const validate = values => {

    const errors = {}
  
    if (!values.workplaceName || !values.workplaceName.toString().trim()) {
      errors.workplaceName = messages.required;
    }
    if (values.city && !values.city.toString().trim()) {
      errors.city = messages.invalid;
    }
    return errors;
  }
  
  export default validate;