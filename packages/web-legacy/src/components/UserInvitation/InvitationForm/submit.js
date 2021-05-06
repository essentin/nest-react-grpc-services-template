import createUserInvitation from '../../../actions/UserInvitation/createUserInvitation';

async function submit(values, dispatch) {
    let invitedList = values.invitedList && values.invitedList.split(',') || [];
    await dispatch(createUserInvitation({ invitedList }));
}

export default submit;