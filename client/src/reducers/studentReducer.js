import {
    GET_STUDENT_LECTURES,
    GET_STUDENT_CLASSROOMS
} from '../actions/types';

const initialState = {
    loading: true,
    lectures: [],
    classrooms: []
};

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case GET_STUDENT_LECTURES:
            return {
                loading: false,
                lectures: payload,
                classrooms: []
            }
        case GET_STUDENT_CLASSROOMS:
            return {
                loading: false,
                lectures: [],
                classrooms: payload
            }
        default:
            return initialState;
    }
}