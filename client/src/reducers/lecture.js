import {
    RECEIVE_MESSAGE,
    ADD_MESSAGE,
    SEND_MESSAGE,
    USER_LEFT,
    GET_MESSAGES,
    USER_JOINED,
    SET_MESSAGES,
    JOIN_CLASSROOM,
    JOIN_CLASSROOM_FAIL,
    JOIN_CLASSROOM_SUCCESS,
    START_LECTURE,
    STOP_LECTURE,
    LOAD_LECTURE,
    GET_PUBLISH_TOKEN,
    GET_PLAY_TOKEN
} from '../actions/types';

const initState = {
    loading: true,
    messages: [],
    lectureStarted: false,
    onlineUsers: [],
    publishToken: '',
    playToken: ''
}

export default function (state = initState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
            case START_LECTURE:
                return {
                    ...state,
                    lectureStarted: true
                }
                case STOP_LECTURE:
                    return {
                        ...state,
                        lectureStarted: false,
                            publishToken: '',
                            playToken: ''
                    }
                    case GET_MESSAGES:
                        return {
                            ...state,
                            messages: payload.data,
                                loading: false
                        }
                        case LOAD_LECTURE:
                            return {
                                ...state,
                                lectureStarted: payload.hasStarted,
                                    onlineUsers: payload.onlineUsers
                            }
                            case USER_JOINED:
                                if (!state.onlineUsers.find(u => u._id === payload._id)) {
                                    return {
                                        ...state,
                                        onlineUsers: [...state.onlineUsers, payload]
                                    }
                                } else {
                                    return state;
                                }
                                case USER_LEFT:
                                    let users = state.onlineUsers.filter(u => u._id !== payload._id);
                                    return {
                                        ...state,
                                        onlineUsers: users
                                    }
                                    case GET_PUBLISH_TOKEN:
                                        return {
                                            ...state,
                                            publishToken: payload
                                        }
                                        case GET_PLAY_TOKEN:
                                            return {
                                                ...state,
                                                playToken: payload
                                            }
                                            case SEND_MESSAGE:
                                            default:
                                                return state;
    }
}