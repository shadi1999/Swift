import {GET_ERRORS,CLEAR_ERRORS} from './types';

//GET_ERRORS
export const returnErrors = (msg,status,id =null) =>{
    return{
        type:GET_ERRORS,
        payload:{msg,status,id}
    };
};

//CLEAR_ERRORS
export const clearErrors = () =>{
    return{
        type:CLEAR_ERRORS
    };
};