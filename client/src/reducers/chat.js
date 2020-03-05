import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE, GET_MESSAGES, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS } from '../actions/types';

const initState = {
    loading: true,
    messages: []
}

export default function(state = initState, action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        default:
            return state;
    }
}