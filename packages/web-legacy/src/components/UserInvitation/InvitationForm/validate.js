import messages from '../../../locale/messages';

const validate = (values) => {
    const errors = {};

    if (!values.invitedList || values.invitedList.toString().trim() === '') errors.invitedList = messages.required;
    else if (values.invitedList) {
        let invitedUser = values.invitedList && values.invitedList.split(',');
        if (!invitedUser || invitedUser.length === 0) {
            errors.invitedList = messages.emailInvalid;
        }
        else {
            let invalidEmail = invitedUser.filter(email => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email)))
            if (invalidEmail && invalidEmail.length > 0) errors.invitedList = messages.emailInvalid;
        }
    }

    return errors;
};

export default validate;