import { sendForgotLink } from '../../../actions/ForgotPassword/sendForgotLink';

async function submit(values, dispatch) {
  dispatch(sendForgotLink(values.email, values.userType));
}

export default submit;
