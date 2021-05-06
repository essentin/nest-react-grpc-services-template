import {
    ICON_SETTING_UPLOAD_LOADER_START,
    ICON_SETTING_UPLOAD_START,
    ICON_SETTING_UPLOAD_SUCCESS,
    ICON_SETTING_UPLOAD_ERROR,
} from '../../constants';

export default function iconUploadLoader(state = {}, action) {
    switch (action.type) {
        case ICON_SETTING_UPLOAD_LOADER_START:
            return {
                ...state,
                iconUploadLoader: true,
            };

        case ICON_SETTING_UPLOAD_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                iconUploadLoader: action.payload.iconUploadLoader,
            };

        case ICON_SETTING_UPLOAD_ERROR:
            return {
                ...state,
                data: action.payload.data,
                iconUploadLoader: action.payload.iconUploadLoader
            };

        case ICON_SETTING_UPLOAD_START:
            return {
                ...state,
                iconUploadLoader: action.payload.iconUploadLoader,
            };

        default:
            return state;
    }
}
