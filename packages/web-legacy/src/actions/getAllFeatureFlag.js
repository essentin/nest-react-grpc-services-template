import gql from 'graphql-tag';

import { setFeatureFlag } from '../actions/setFeatureFlag';
import { features } from '../config';

let featureFlagFields = '', query;

if (features.length > 0) {
    features.map(feature => featureFlagFields = featureFlagFields + feature.key + ' ');
    query = gql`
    query GetAllFeatureFlag {
        getAllFeatureFlag {
            status
            errorMessage
            result{
                ${featureFlagFields}
            }
        }
    }
  `;
} else {
    query = gql`
    query GetAllFeatureFlag {
        getAllFeatureFlag {
            status
            errorMessage
        }
    }
  `;
}



function getAllFeatureFlag() {

    return async (dispatch, getState, { client }) => {

        try {

            const { data } = await client.query({
                query,
                fetchPolicy: 'network-only',
            });

            if (data && data.getAllFeatureFlag && data.getAllFeatureFlag.status === 200 && data.getAllFeatureFlag.result)
                dispatch(setFeatureFlag(data.getAllFeatureFlag.result));

        } catch (error) {
            console.log(error);
            toastr.error('Error', "Oops! something went wrong. Please try again.");
        }
    }
}

export default getAllFeatureFlag;