import { closeManageUserModal } from '../../../../actions/siteadmin/modalActions';
import { updateUserMaxInvites } from '../../../../actions/siteadmin/UserManagement/updateUserMaxInvites'

export default (values, dispatch) => {
    dispatch(updateUserMaxInvites(values))
    dispatch(closeManageUserModal())
}