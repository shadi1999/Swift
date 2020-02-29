import {GET_TUTORS, GET_STUDENTS} from '../actions/types';

const initialState = {
    loading: true,
    data: null
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_TUTORS:
            return {
                loading: false,
                ...action.payload
            }
        case GET_STUDENTS:
            return {
                loading: false,
                ...action.payload
            }
        default:
            return initialState;
    }
}