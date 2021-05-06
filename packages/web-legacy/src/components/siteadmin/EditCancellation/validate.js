const validate = values => {

  const errors = {}

  if (!values.policyName) {
    errors.policyName = 'Policy Name is Required';
  } else if (values.policyName && values.policyName.trim() == "") {
    errors.policyName = 'Policy Name is Required';
  }

  if (!values.policyContent) {
    errors.policyContent = 'Policy Content is Required';
  } else if (values.policyContent && values.policyContent.trim() == "") {
    errors.policyContent = 'Policy Content is Required';
  }

  if (!values.subTitle) {
    errors.subTitle = 'Sub Title is Required';
  } else if (values.subTitle && values.subTitle.trim() == "") {
    errors.subTitle = 'Sub Title is Required';
  }

  if (!values.subContent) {
    errors.subContent = 'Detailed Content is Required';
  } else if (values.subContent && values.subContent.trim() == "") {
    errors.subContent = 'Detailed Content is Required';
  }

  return errors
}

export default validate
