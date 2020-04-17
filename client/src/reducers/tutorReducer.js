import {
    GET_TUTOR_LECTURES,
    GET_TUTOR_CLASSROOMS,
    ADD_STUDENT_TO_CLASSROOM,
    DELETE_STUDENT_FROM_CLASSROOM,
    GET_STUDENT_CLASSROOMS,
    ADD_STUDENT_TO_CLASSROOM_SUCCESS,
    GET_STUDENTS_OF_CLASSROOM_SUCCESS,
    DELETE_STUDENT_FROM_CLASSROOM_SUCCESS,
    GET_STUDENTS_OF_CLASSROOM_FAIL,
    ADD_STUDENT_TO_CLASSROOM_FAIL,
    DELETE_STUDENT_FROM_CLASSROOM_FAIL
} from '../actions/types';

const initialState = {
    loading: true,
    lectures: [],
    classrooms: [],
    students: []
};

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case GET_TUTOR_LECTURES:
            return {
                loading: false,
                lectures: payload,
                classrooms: [],
                students: []
            }
        case GET_TUTOR_CLASSROOMS:
            return {
                loading: false,
                lectures: [],
                classrooms: payload,
                students: []
            }
        case ADD_STUDENT_TO_CLASSROOM:
        case DELETE_STUDENT_FROM_CLASSROOM:
        case GET_STUDENT_CLASSROOMS:
            return {
                ...state
            }
        case ADD_STUDENT_TO_CLASSROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                students: [...state.students, payload]
            }
        case GET_STUDENTS_OF_CLASSROOM_SUCCESS:
        case DELETE_STUDENT_FROM_CLASSROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                students: payload
            }
        case GET_STUDENTS_OF_CLASSROOM_FAIL:
        case ADD_STUDENT_TO_CLASSROOM_FAIL:
        case DELETE_STUDENT_FROM_CLASSROOM_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return initialState;
    }
}