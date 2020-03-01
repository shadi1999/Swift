import {GET_TUTORS, GET_STUDENTS, EDIT_TUTOR, EDIT_STUDENT, EDIT_TUTOR_SUCCESS, EDIT_TUTOR_FAIL} from '../actions/types';

const initialState = {
    loading: true,
    tutors: [],
    students: []
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_TUTORS:
            return {
                loading: false,
                tutors: action.payload
            }
        case EDIT_TUTOR:
            return {
                ...state,
                loading: true
            }
        case EDIT_TUTOR_SUCCESS:
            return {
                loading: false,
                tutors: action.payload
            }
        case EDIT_TUTOR_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_STUDENTS:
        case EDIT_STUDENT:        
            return {
                loading: false,
                students: action.payload
            }
        default:
            return initialState;
    }
}