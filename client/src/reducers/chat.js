import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE, GET_MESSAGES, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS, START_LECTURE, STOP_LECTURE } from '../actions/types';

const initState = {
    loading: true,
    messages: [],
    lectureStarted: false
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
        default:
            return state;
    }
}