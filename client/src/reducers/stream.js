import {
    CONNECTION_SUCCESS,
    CONNECTION_CLOSE,
    START_SHARING,
    START_SHARING_SUCCESS,
    START_SHARING_FAIL,
    STOP_SHARING,
    TOGGLE_MIC
} from '../actions/types';

const initialState = {
    loading: false,
    // currentStreamUrl: "",
    // currentStreamerId: "",
    isSharing: false,
    webrtcConnected: false,
    micMuted: false
};

export default function (state = initialState, action) {
    const {
        payload,
        type
    } = action;

    switch (type) {
        case CONNECTION_SUCCESS:
            return {
                ...state,
                webrtcConnected: true
            }
            case CONNECTION_CLOSE:
                return {
                    ...state,
                    webrtcConnected: false,
                        isSharing: false
                }
                case START_SHARING:
                    return {
                        ...state,
                        loading: true,
                    }
                    case START_SHARING_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                                isSharing: true
                        }
                        case START_SHARING_FAIL:
                            return {
                                ...state,
                                loading: false,
                                    isSharing: false
                            }
                            case STOP_SHARING:
                                return {
                                    ...state,
                                    loading: false,
                                        isSharing: false
                                }
                                case TOGGLE_MIC:
                                    return {
                                        ...state,
                                        micMuted: !state.micMuted
                                    }
                                    default:
                                        return state;
    }
}