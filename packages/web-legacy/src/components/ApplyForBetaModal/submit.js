import { applyForBeta } from '../../actions/applyForBeta';
async function submit(values, dispatch) {
    dispatch(applyForBeta(values));
}

export default submit;