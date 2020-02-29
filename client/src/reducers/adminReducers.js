import {GET_TUTORS, GET_STUDENTS, EDIT_TUTOR, EDIT_STUDENT} from '../actions/types';

const initialState = {
    loading: true,
    data: null
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_TUTORS:
        case GET_STUDENTS:
        case EDIT_TUTOR:
        case EDIT_STUDENT:        
            return {
                loading: false,
                ...action.payload
            }
        default:
            return initialState;
    }
}