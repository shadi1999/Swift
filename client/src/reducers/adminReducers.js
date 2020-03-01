import {GET_TUTORS, GET_STUDENTS, EDIT_TUTOR, EDIT_STUDENT} from '../actions/types';

const initialState = {
    loading: true,
    tutors: [],
    students: []
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_TUTORS:
        case EDIT_TUTOR:
            return {
                loading: false,
                tutors: action.payload
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