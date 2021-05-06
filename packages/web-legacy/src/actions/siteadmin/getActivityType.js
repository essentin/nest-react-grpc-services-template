import { gql } from 'react-apollo';

import {
    ADMIN_LOAD_ACTIVITY_TYPE_START,
    ADMIN_LOAD_ACTIVITY_TYPE_SUCCESS,
    ADMIN_LOAD_ACTIVITY_TYPE_ERROR
} from '../../constants';

const query = gql`
  query {
    getActivityType{
        results{
          id
          name
          image
          isEnable
        }
          status
       }
  	}
`;

export function getActivityType() {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: ADMIN_LOAD_ACTIVITY_TYPE_START,
        });

        try {
            const { data } = await client.query({
                query,
                fetchPolicy: 'network-only'
            });

            if (!data && !data.getActivityType) {
                dispatch({
                    type: ADMIN_LOAD_ACTIVITY_TYPE_ERROR,
                });
            } else {
                dispatch({
                    type: ADMIN_LOAD_ACTIVITY_TYPE_SUCCESS,
                    activityType: data.getActivityType,
                });
            }

        } catch (error) {
            dispatch({
                type: ADMIN_LOAD_ACTIVITY_TYPE_ERROR,
                payload: {
                    error
                }
            });
            return false;
        }
        return true;
    };
}
