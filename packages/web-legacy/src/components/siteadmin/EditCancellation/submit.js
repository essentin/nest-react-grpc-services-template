// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../../core/history';
async function submit(values, dispatch) {

  const mutation = `
  mutation updateCancellation(
    $id: Int,
    $policyName: String,
    $policyContent: String,
    $subTitle: String,
    $subContent: String,
    $image: String,
  ) {
    updateCancellation(
      id: $id,
      policyName: $policyName,
      policyContent: $policyContent,
      subTitle: $subTitle,
      subContent: $subContent,
      image: $image,
    ) {
        status
    }
  }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: mutation,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateCancellation.status === "success") {
    toastr.success("Update Cancellation", "Changes are updated!");
    history.push('/siteadmin/cancellation/management');
  } else {
    toastr.error("Update Cancellation", "Updating Cancellation failed");
  }

}

export default submit;
