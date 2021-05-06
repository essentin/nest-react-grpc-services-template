import { createInvites } from '../../../actions/siteadmin/Invites/createInvites';

async function submit(values, dispatch) {
  
  dispatch(createInvites(values));
}

export default submit;
