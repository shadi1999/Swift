import axios from 'axios';
import {
    GET_TUTORS,
    GET_STUDENTS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    EDIT_STUDENT,
    EDIT_TUTOR,
    EDIT_TUTOR_SUCCESS,
    EDIT_TUTOR_FAIL,
    EDIT_STUDENT_SUCCESS,
    EDIT_STUDENT_FAIL,
    ADD_CLASSROOM,
    GET_CLASSROOMS
} from './types';
import { setAlert } from './alert';
import { loadUser } from './auth';
import Config from '../Config';

const URL = Config.URL.Server;

export const getTutors = () => async dispatch => {
    try {
        const tutors = await axios.get(URL + '/api/tutors');
        dispatch({
            type: GET_TUTORS,
            payload: tutors.data
        })
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);
    }
}

export const editTutor = (tutor, history, redirectPath) => async (dispatch, getState) => {
    const { name, email, _id } = tutor;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, _id });
    try {
        dispatch({
            type: EDIT_TUTOR
        });
        await axios.put(URL + '/api/tutors', body, config);

        let tutors = getState().admin.tutors.filter(t => t._id !== _id);
        tutors = [...tutors, tutor];

        // Fake delay to test the Spin component.
        // TODO: remove fake delay.
        setTimeout(() => {
            dispatch({
                type: EDIT_TUTOR_SUCCESS,
                payload: tutors
            });
            history.push(redirectPath);
        }, 2000)

        // dispatch({
        //     type: EDIT_TUTOR,
        //     payload: tutors
        // });
        // history.push(redirectPath);
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);

        dispatch({
            type: EDIT_TUTOR_FAIL
        });
    }
}

export const editStudent = (student, history, redirectPath) => async (dispatch, getState) => {
    const { name, email, _id } = student;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, _id });
    try {
        dispatch({
            type: EDIT_STUDENT
        });
        await axios.put(URL + '/api/students', body, config);

        let students = getState().admin.students.filter(t => t._id !== _id);
        students = [...students, student];

        // Fake delay to test the Spin component.
        // TODO: remove fake delay.
        setTimeout(() => {
            dispatch({
                type: EDIT_STUDENT_SUCCESS,
                payload: students
            });
            history.push(redirectPath);
        }, 2000)

        // dispatch({
        //     type: EDIT_STUDENT,
        //     payload: students
        // });
        // history.push(redirectPath);
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);

        dispatch({
            type: EDIT_STUDENT_FAIL
        });
    }
}



export const getStudents = () => async dispatch => {
    try {
        const students = await axios.get(URL + '/api/students');
        dispatch({
            type: GET_STUDENTS,
            payload: students.data
        })
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);
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
    } catch (err) {
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

export const addClassroom = ({ id, tutor, Private, recordLectures }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ id, tutor, Private, recordLectures });

    try {
        const res = await axios.post(URL + '/api/classrooms', body, config);
        dispatch({
            type: ADD_CLASSROOM,
            payload: res.data
        })
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);
    }
}

export const getClassrooms = () => async dispatch => {
    try {
        const classrooms = await axios.get(URL + '/api/classrooms');
        dispatch({
            type: GET_CLASSROOMS,
            payload: classrooms.data
        })
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 12000));
        }

        console.log('Error', err);
    }
}





