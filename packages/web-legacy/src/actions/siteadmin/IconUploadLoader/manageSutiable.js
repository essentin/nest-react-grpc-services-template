import { gql } from 'react-apollo';

import {
    ICON_SETTING_UPLOAD_LOADER_START,
    ICON_SETTING_UPLOAD_START,
    ICON_SETTING_UPLOAD_SUCCESS,
    ICON_SETTING_UPLOAD_ERROR
} from '../../../constants';

export function startUserProfilePhotoLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: ICON_SETTING_UPLOAD_LOADER_START,
            payload: {
                iconUploadLoader: true
            }
        });
    };
}

export function doUploadTempPhoto(fileName, sutiableId) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: ICON_SETTING_UPLOAD_START,
            payload: {
                iconUploadLoader: true
            }
        });

        let mutation = gql`
        mutation updateIconUploadLoader (
            $id: Int,
            $thumbnail: String
        ) {
            updateIconUploadLoader (
                id: $id,
                thumbnail: $thumbnail
            ) {
                status
            }
        }
        `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id: sutiableId,
                    thumbnail: fileName
                },
            });


            if (data.updateIconUploadLoader.status === "success") {
                dispatch({
                    type: ICON_SETTING_UPLOAD_SUCCESS,
                    payload: {
                        iconUploadLoader: false
                    }
                });
            } else {
                dispatch({
                    type: ICON_SETTING_UPLOAD_ERROR,
                    payload: {
                        status,
                        iconUploadLoader: false
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: ICON_SETTING_UPLOAD_ERROR,
                payload: {
                    error,
                    iconUploadLoader: false
                }
            });
        }
    };
}

export function startPhotoLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: ICON_SETTING_UPLOAD_SUCCESS,
            payload: {
                iconUploadLoader: true
            }
        });
    };
}

export function stopPhotoLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: ICON_SETTING_UPLOAD_SUCCESS,
            payload: {
                iconUploadLoader: false
            }
        });
    };
}