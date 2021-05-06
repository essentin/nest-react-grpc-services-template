import { SET_FEATURE_FLAG } from '../constants';

export default function featureFlag(state = {}, action) {

    switch (action.type) {
        case SET_FEATURE_FLAG: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}