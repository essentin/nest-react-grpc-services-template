import { closeCreateHostModal } from '../../../../actions/siteadmin/modalActions';
import { createHostUser } from '../../../../actions/siteadmin/UserManagement/createHostUser'

export default (values, dispatch, ) => {
    dispatch(createHostUser(values))
    dispatch(closeCreateHostModal())
}