import {
    GET_TUTOR_LECTURES,
    GET_TUTOR_CLASSROOMS,
    GET_STUDENTS_OF_CLASSROOM,
    GET_STUDENTS_OF_CLASSROOM_FAIL,
    GET_STUDENTS_OF_CLASSROOM_SUCCESS,
    DELETE_STUDENT_FROM_CLASSROOM,
    DELETE_STUDENT_FROM_CLASSROOM_SUCCESS,
    DELETE_STUDENT_FROM_CLASSROOM_FAIL,
    ADD_STUDENT_TO_CLASSROOM,
    ADD_STUDENT_TO_CLASSROOM_SUCCESS,
    ADD_STUDENT_TO_CLASSROOM_FAIL
} from './types';
import { setAlert } from './alert';
import Config from '../Config';
import axios from 'axios';
const URL = Config.URL.Server;

export const getLectures = (user) => async dispatch => {
    try {
        const lectures = await axios.get(URL + `/api/classrooms/tutor/${user._id}/lectures`);
        dispatch({
            type: GET_TUTOR_LECTURES,
            payload: lectures.data
        });
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);
    }
}

export const getClassrooms = (user) => async dispatch => {
    try {
        const classrooms = await axios.get(URL + `/api/classrooms/tutor/${user._id}`);

        dispatch({
            type: GET_TUTOR_CLASSROOMS,
            payload: classrooms.data
        });
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);
    }
}

export const addStudentToClassroom = (email, id, history, redirectPath) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({
            type: ADD_STUDENT_TO_CLASSROOM
        })
        const student = await axios.post(URL + `/api/classroom/${id}/students/${email}`)
        dispatch({
            type: ADD_STUDENT_TO_CLASSROOM_SUCCESS,
            payload: student.data
        })
        history.push(redirectPath);
    } catch (err) {
        dispatch({
            type: ADD_STUDENT_TO_CLASSROOM_FAIL
        })
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors) {
                dispatch(setAlert(error.msg, 'error', 12000));
            }
            console.log('Error', err);
        }
    }
}

export const deleteStudentFromClassroom = (email, id, history, redirectPath) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({
            type: DELETE_STUDENT_FROM_CLASSROOM
        })
        const students = await axios.delete(URL + `/api/classroom/${id}/students/${email}`, config);
        dispatch({
            type: DELETE_STUDENT_FROM_CLASSROOM_SUCCESS,
            payload: students.data
        })
        history.push(redirectPath);
    } catch (err) {
        if (err.response) {
            dispatch({
                type: DELETE_STUDENT_FROM_CLASSROOM_FAIL
            })
            const errors = err.response.data.errors;
            for (let error of errors) {
                dispatch(setAlert(error.msg, 'error', 12000));
            }
            console.log('Error', err);
        }
    }
}

export const getStudentsFromClassroom = (id, history, redirectPath) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({
            type: GET_STUDENTS_OF_CLASSROOM
        })
        const students = await axios.get(URL + `/api/classroom/${id}/students`, config);
        dispatch({
            type: GET_STUDENTS_OF_CLASSROOM_SUCCESS,
            payload: students.data
        })
        history.push(redirectPath);
    } catch (err) {
        dispatch({
            type: GET_STUDENTS_OF_CLASSROOM_FAIL
        })
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors) {
                dispatch(setAlert(error.msg, 'error', 12000));
            }
            console.log('Error', err);
        }
    }
}