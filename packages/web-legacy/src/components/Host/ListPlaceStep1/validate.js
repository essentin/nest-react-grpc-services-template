import messages from '../../../locale/messages';


const validate = values => {

  const errors = {}

  if (!values.country) {
    errors.country = messages.required;
  } else if (values.country && values.country.trim() == "") {
    errors.country = messages.required;
  }


  if (!values.city) {
    errors.city = messages.required;
  } else if (values.city && values.city.trim() == "") {
    errors.city = messages.required;
  }

  if (!values.street) {
    errors.street = messages.required;
  } else if (values.street && values.street.trim() == "") {
    errors.street = messages.required;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  } else if (values.zipcode && values.zipcode.trim() == "") {
    errors.zipcode = messages.required;
  }

  if (values && values.isParking) {

    if (!values.parkingDescription) {
      errors.parkingDescription = messages.required;
    } else if (values.parkingDescription && values.parkingDescription.trim() == "") {
      errors.parkingDescription = messages.required;
    } else if (values.parkingDescription && values.parkingDescription.length < 35) {
      errors.parkingDescription = messages.parkingMinChar;
    }
    if (values && values.isParking && values.parkingOptions && values.parkingOptions.length == 0) {
      errors.parkingOptions = messages.required;
    }
  }
  
  if(!values.contactName) {
    errors.contactName = messages.required
  } else if(values.contactName.trim() === ''){
    errors.contactName = messages.invalid
  }

  if (!values.contactEmail) {
    errors.contactEmail = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(values.contactEmail)) {
    errors.contactEmail = messages.emailInvalid;
  }

  if(values.contactPhoneNumber) {
    let match = values.contactPhoneNumber.match(/^\d{5,10}$/g)
    if(!match){
      errors.contactPhoneNumber = messages.phoneNumberInvalid
    }
  }
  
  return errors
}

export default validate
