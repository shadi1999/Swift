import axios from 'axios';
import {GET_TUTORS, GET_STUDENTS, REGISTER_SUCCESS, REGISTER_FAIL,EDIT_STUDENT,EDIT_TUTOR} from './types';
import { setAlert } from './alert';
import {loadUser} from './auth';
import Config from '../Config';

const URL = Config.URL.Server;

export const getTutors = () => async dispatch => {
    try {
        const tutors = await axios.get(URL+'/api/tutors');
        dispatch({
            type:GET_TUTORS,
            payload: tutors.data
        })
    } catch(error) {
        dispatch(setAlert(error.msg, 'error', 100000));
    }
}

export const editTutor = (tutor) => async (dispatch, getState) => {
    const { name, email, id } = tutor;
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ name, email,id });
    try {
        await axios.put(URL+'/api/tutors', body, config);
        let tutors = getState().admin.data.filter(t => t._id !== id);
        tutors = [...tutors, tutor];
    } catch(error) {
        dispatch(setAlert(error.msg, 'error', 100000));
    }
}

export const editStudent = ({ name, email }) => async (dispatch, getState) => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ name, email });

    try {
        const student = await axios.put(URL+'/api/students', body, config);
        let students = getState().admin.data.filter(t => t._id !== student._id);
        students = [...students, student];
        dispatch({
            type:EDIT_STUDENT,
            payload:students
        })
    } catch(error) {
        dispatch(setAlert(error.msg, 'error', 100000));
    }
}

export const getStudents = () => async dispatch => {
    try {
        const students = await axios.get(URL+'/api/students');
        dispatch({
            type:GET_STUDENTS,
            payload:students
        })
    } catch(error) {
        dispatch(setAlert(error.msg, 'error', 100000));
    }
}

export const addAdmin = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      const body = JSON.stringify({ name, email, password });
    
      try {
        const res = await axios.post(URL + '/api/administrators', body, config);
    
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
      } catch(err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));

        dispatch({
            type: REGISTER_FAIL
        });
    }
}





