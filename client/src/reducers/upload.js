import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL, DOWNLOAD_FILE } from './types';

const initState = {
    loading: true,
    files: []
}

export default function(state = initState, action) {
    const {type, payload} = action;
    switch (type) {
        case UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, payload]
            }
        default:
            return state;
    }
}