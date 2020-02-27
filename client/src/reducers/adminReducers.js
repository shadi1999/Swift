import {GET_TUTORS} from '../actions/types';

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
        default:
            return initialState;
    }
}