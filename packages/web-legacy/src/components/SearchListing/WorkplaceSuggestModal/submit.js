// import { makePaymentForCancel } from '../../actions/booking/makePaymentForCancel';
import { suggestWrokplace } from '../../../actions/suggestWorkplace';
async function submit(values, dispatch) {
    dispatch(suggestWrokplace(values));
}

export default submit;