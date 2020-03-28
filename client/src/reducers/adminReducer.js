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
    GET_CLASSROOMS,
    EDIT_CLASSROOM_SUCCESS,
    EDIT_CLASSROOM_FAIL,
    DELETE_CLASSROOM_FAIL,
    DELETE_CLASSROOM,
    EDIT_CLASSROOM,
    DELETE_STUDENT,
    DELETE_TUTOR,
    DELETE_TUTOR_FAIL,
    DELETE_STUDENT_FAIL,
    DELETE_CLASSROOM_SUCCESS,
    DELETE_STUDENT_SUCCESS,
    DELETE_TUTOR_SUCCESS,
    DELETE_ADMIN_FAIL,
    EDIT_ADMIN_FAIL,
    DELETE_ADMIN_SUCCESS,
    EDIT_ADMIN_SUCCESS,
    DELETE_ADMIN,
    EDIT_ADMIN
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
        case EDIT_CLASSROOM:
        case DELETE_CLASSROOM:
        case DELETE_STUDENT:
        case DELETE_TUTOR:
        case DELETE_ADMIN:
        case EDIT_ADMIN:
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
        case EDIT_CLASSROOM_SUCCESS:
            return {
                loading: false,
                classrooms: action.payload
            }
        case DELETE_TUTOR_SUCCESS:
            return {
                loading: false,
                tutors: action.payload
            }
        case DELETE_STUDENT_SUCCESS:
            return {
                loading: false,
                students: action.payload
            }
        case DELETE_CLASSROOM_SUCCESS:
            return {
                loading: false,
                classrooms: action.payload
            }
        case DELETE_STUDENT_FAIL:
        case DELETE_TUTOR_FAIL:
        case DELETE_CLASSROOM_FAIL:
        case DELETE_ADMIN_FAIL:
        case EDIT_TUTOR_FAIL:
        case EDIT_STUDENT_FAIL:
        case EDIT_CLASSROOM_FAIL:
        case EDIT_ADMIN_FAIL:
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
                loading: true,
                classrooms: [...state.classrooms, action.payload]
            }
        case DELETE_ADMIN_SUCCESS:
        case EDIT_ADMIN_SUCCESS:
            return {
                loading: false
            }
        default:
            return initialState;
    }
}