import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE,USER_LEFT, GET_MESSAGES, USER_JOINED, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS, START_LECTURE, STOP_LECTURE, LOAD_LECTURE } from '../actions/types';

const initState = {
    loading: true,
    messages: [],
    lectureStarted: false,
    onlineUsers: []
}

export default function(state = initState, action) {
    const {type, payload} = action;
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
            return{
                ...state,
                lectureStarted: false
            }
        case GET_MESSAGES:
            return{
                ...state,
                messages: payload.data
            }
        case LOAD_LECTURE:
            return{
                ...state,
                lectureStarted: payload.hasStarted,
                onlineUsers: payload.onlineUsers
            }
        case USER_JOINED:
            if(!state.onlineUsers.find(u => u._id === payload._id)) {
                return {
                    ...state,
                    onlineUsers: [...state.onlineUsers, payload]
                }
            }
        case USER_LEFT:
            let users = state.onlineUsers.filter(u => u._id !== payload._id);
            return{
                ...state,
                onlineUsers: users
            }
        case SEND_MESSAGE:
        default:
            return state;
    }
}