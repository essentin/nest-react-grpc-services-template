import { gql } from 'react-apollo';
import fetch from '../../core/fetch';

import {
  CANCELLATION_UPLOAD_LOADER_START,
  CANCELLATION_UPLOAD_START,
  CANCELLATION_UPLOAD_SUCCESS,
  CANCELLATION_UPLOAD_ERROR,
  REMOVE_CANCELLATION_START,
  REMOVE_CANCELLATION_SUCCESS,
  REMOVE_CANCELLATION_ERROR,
} from '../../constants';
import { change } from 'redux-form';

const query = gql`
query getSpecificCancellation($cancellationId: Int!){
  getSpecificCancellation(cancellationId: $cancellationId) {
    id
    policyName
    policyContent
    subTitle
    subContent
    image
  }
}
`;

export function startCancellationLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: CANCELLATION_UPLOAD_LOADER_START,
      payload: {
        cancellationLoading: true
      }
    });
  };
}

export function endCancellationLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: CANCELLATION_UPLOAD_LOADER_START,
      payload: {
        cancellationLoading: false
      }
    });
  };
}

export function doUploadCancellation(image, filePath, oldPicture, id) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: CANCELLATION_UPLOAD_START });

    try {


      let mutation = gql`
      mutation updateCancellation(
        $id: Int,
        $image: String,
      ) {
        updateCancellation(
          id: $id,
          image: $image,
        ) {
            status
        }
      }
        `;

      // Send Request to create a record for location
      const { data } = await client.mutate({
        mutation,
        variables: { image, id },
        refetchQueries: [{ query, variables: { cancellationId: id } }]
      });

      if (data) {
        dispatch({
          type: CANCELLATION_UPLOAD_SUCCESS,
          payload: {
            cancellationLoading: false
          }
        });
        if (oldPicture != null) {
          await removeCancellationFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: CANCELLATION_UPLOAD_ERROR,
        payload: {
          error,
          cancellationLoading: false
        }
      });

      return false;
    }

    return true;
  };

}


export function doRemoveCancellation(image, id) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_CANCELLATION_START });
    dispatch(startCancellationLoader());

    try {

      let mutation = gql`
      mutation updateCancellation(
        $id: Int,
        ) {
        updateCancellation(
          id: $id
        ) {
            status
        }
      }
      `;
      let image = null;
      // Send Request to create a record for location
      const { data } = await client.mutate({
        mutation,
        variables: {
          id
        },
        refetchQueries: [{ query, variables: { cancellationId: id } }]
      });

      if (data) {
        dispatch(change('EditCancellationForm', 'image', null));
        dispatch({
          type: REMOVE_CANCELLATION_SUCCESS,
          payload: {
            cancellationLoading: false
          }
        });
        await removeCancellationFile(image);
      }

    } catch (error) {
      dispatch({
        type: REMOVE_CANCELLATION_ERROR,
        payload: {
          error,
          cancellationLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

async function removeCancellationFile(image) {
  try {
    const resp = await fetch('/removeCancellation', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image
      }),
      credentials: 'include',
    });

    const { status } = await resp.json();

    if (status) {
      console.log('status from remove cancellation file', status);
    }

  } catch (error) {
    console.log('error from remove file', error);

    return false;
  }

  return true;
}