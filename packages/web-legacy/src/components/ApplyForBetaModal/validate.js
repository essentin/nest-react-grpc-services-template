import messages from '../../locale/messages';
const validate = values => {

    const errors = {};
    
    if (!values.firstName) {
        errors.firstName = messages.required;
    } else if (values.firstName.toString().trim() == "") {
        errors.firstName = messages.required;
    }

    if (!values.lastName) {
        errors.lastName = messages.required;
    } else if (values.lastName.toString().trim() == "") {
        errors.lastName = messages.required;
    }

    if (!values.email) {
        errors.email = messages.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
        errors.email = messages.emailInvalid;
    }

    return errors;
}

export default validate;