const validate = values => {

  const errors = {}

  if (!values.cancellationInfo) {
    errors.cancellationInfo = 'Cancellation Info is Required';
  } else if (values.cancellationInfo && values.cancellationInfo.trim() == "") {
    errors.cancellationInfo = 'Cancellation Info is Required';
  }

  return errors
}

export default validate
