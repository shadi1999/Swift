import {
    GET_TUTORS,
    GET_STUDENTS,
    EDIT_TUTOR,
    EDIT_STUDENT,
    EDIT_TUTOR_SUCCESS,
    EDIT_TUTOR_FAIL,
    EDIT_STUDENT_SUCCESS,
    EDIT_STUDENT_FAIL,
    ADD_CLASSROOM,
    GET_CLASSROOMS
} from '../actions/types';

const initialState = {
    loading: true,
    tutors: [],
    students: [],
    classrooms: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TUTORS:
            return {
                loading: false,
                tutors: action.payload
            }
        case GET_STUDENTS:
            return {
                loading: false,
                students: action.payload
            }
        case EDIT_TUTOR:
        case EDIT_STUDENT:
            return {
                ...state,
                loading: true
            }
        case EDIT_TUTOR_SUCCESS:
            return {
                loading: false,
                tutors: action.payload
            }
        case EDIT_STUDENT_SUCCESS:
            return {
                loading: false,
                students: action.payload
            }
        case EDIT_TUTOR_FAIL:
        case EDIT_STUDENT_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_CLASSROOMS:
            return {
                loading: false,
                classrooms: action.payload
            }
        case ADD_CLASSROOM:
            return {
                loading: false,
                classrooms: [...state.classrooms, action.payload]
            }
        default:
            return initialState;
    }
}