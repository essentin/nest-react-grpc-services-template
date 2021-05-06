/* eslint-disable import/prefer-default-export */

import { SET_FEATURE_FLAG } from '../constants';

export function setFeatureFlag(value) {
    return {
        type: SET_FEATURE_FLAG,
        payload: value,
    };
}
