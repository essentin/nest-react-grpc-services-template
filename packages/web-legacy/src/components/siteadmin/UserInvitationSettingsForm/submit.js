import { updateUserInvitationSettings } from '../../../actions/siteadmin/updateUserInvitationSettings'

async function submit(values, dispatch) {
    dispatch(updateUserInvitationSettings(values.maxInvites))
}

export default submit;
