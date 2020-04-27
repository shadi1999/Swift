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
    GET_PLAY_TOKEN,
    ALLOW_USER_STREAM,
    RECEIVE_SLIDE,
    CHANGE_SLIDE_PAGE,
    CHANGE_CURRENT_REPLAY,
    SET_ONLINE_USERS
} from '../actions/types';

const initState = {
    loading: true,
    messages: [],
    lectureStarted: false,
    onlineUsers: [],
    publishToken: '',
    playToken: '',
    currentStreamerId: '',
    slideUrl: '',
    slidePage: 1,
    currentReplayUrl: ''
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
        case RECEIVE_SLIDE:
            return {
                ...state,
                slideUrl: payload
            }
        case CHANGE_SLIDE_PAGE:
            return {
                ...state,
                slidePage: payload
            }
        case START_LECTURE:
            return {
                ...state,
                lectureStarted: true
            }
        case STOP_LECTURE:
            return {
                ...initState
            };
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
                onlineUsers: payload.onlineUsers, 
                slideUrl: payload.slideUrl,
                slidesPage: payload.slidesPage
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
                publishToken: payload.publishToken,
                currentStreamerId: payload.currentStreamerId
            }
        case GET_PLAY_TOKEN:
            return {
                ...state,
                playToken: payload
            }
        case ALLOW_USER_STREAM:
            return {
                ...state,
                currentStreamerId: payload.currentStreamerId
            }
        case CHANGE_CURRENT_REPLAY:
            return {
                ...state,
                currentReplayUrl: payload
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: payload,
                loading: false
            }
        case SEND_MESSAGE:
        default:
            return state;
    }
}