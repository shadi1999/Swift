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
    GET_CLASSROOMS,
    EDIT_CLASSROOM_FAIL,
    EDIT_CLASSROOM,
    EDIT_CLASSROOM_SUCCESS,
    DELETE_CLASSROOM,
    DELETE_CLASSROOM_FAIL,
    DELETE_CLASSROOM_SUCCESS,
    DELETE_STUDENT,
    DELETE_STUDENT_FAIL,
    DELETE_STUDENT_SUCCESS,
    DELETE_TUTOR,
    DELETE_TUTOR_SUCCESS,
    DELETE_TUTOR_FAIL,
    DELETE_ADMIN,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,
    EDIT_ADMIN,
    EDIT_ADMIN_SUCCESS,
    EDIT_ADMIN_FAIL
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

export const deleteTutor = (id, history, redirectPath) => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        dispatch({
            type: DELETE_TUTOR
        })
        await axios.delete(URL + `/api/tutors/${id}`, config);
        let tutors = getState().admin.tutors.filter(t => t._id !== id);
        setTimeout(() => {
            dispatch({
                type: DELETE_TUTOR_SUCCESS,
                payload: tutors
            });
            history.push(redirectPath);
        }, 2000)
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));

        dispatch({
            type: DELETE_TUTOR_FAIL
        })
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

export const deleteStudent = (id, history, redirectPath) => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        dispatch({
            type: DELETE_STUDENT
        })
        await axios.delete(URL + `/api/students/${id}`, config);
        let students = getState().admin.students.filter(t => t._id !== id);
        setTimeout(() => {
            dispatch({
                type: DELETE_STUDENT_SUCCESS,
                payload: students
            });
            history.push(redirectPath);
        }, 2000)
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));

        dispatch({
            type: DELETE_STUDENT_FAIL
        })
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




export const addAdmin = ({ name, email, password }, history, redirectPath) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password });

    try {

        const res = await axios.post(URL + '/api/administrators', body, config);
        setTimeout(() => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            history.push(redirectPath);
        }, 2000)

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

export const deleteAdmin = (id, history, redirectPath) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: DELETE_ADMIN
        })
        await axios.delete(URL + `/api/administrators/${id}`, config);
        setTimeout(() => {
            dispatch({
                type: DELETE_ADMIN_SUCCESS
            });
            history.push(redirectPath);
        }, 2000)

        dispatch(loadUser());
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));

        dispatch({
            type: DELETE_ADMIN_FAIL
        });
    }
}

export const editAdmin = ({ name, email, password }, history, redirectPath) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, email, password });

    try {
        dispatch({
            type: EDIT_ADMIN
        })
        await axios.put(URL + `/api/administrators/`, body, config);
        setTimeout(() => {
            dispatch({
                type: EDIT_ADMIN_SUCCESS
            });
            history.push(redirectPath);
        }, 2000)

        dispatch(loadUser());
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));

        dispatch({
            type: EDIT_ADMIN_FAIL
        });
    }
}

export const addClassroom = ({ id, tutor, Private, record }, history, redirectPath) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ id, tutor, Private, record });

    try {
        const res = await axios.post(URL + '/api/classrooms', body, config);
        dispatch({
            type: ADD_CLASSROOM,
            payload: res.data
        });
        setTimeout(() => {
            history.push(redirectPath);
        }, 2000)
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));
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
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));
    }
}

export const editClassroom = (classroom, newid, history, redirectPath) => async (dispatch, getState) => {
    const { id, Private, email, record } = classroom;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ newid, id, Private, email, record });
    try {
        dispatch({
            type: EDIT_CLASSROOM
        });
        await axios.put(URL + '/api/classrooms', body, config);
        let classrooms = getState().admin.classrooms.filter(t => t.id !== id);
        classrooms = [...classrooms, classroom];
        setTimeout(() => {
            dispatch({
                type: EDIT_CLASSROOM_SUCCESS,
                payload: classrooms
            });
            history.push(redirectPath);
        }, 2000)
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));
        dispatch({
            type: EDIT_CLASSROOM_FAIL
        });
    }
}

export const deleteClassroom = (id, history, redirectPath) => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        dispatch({
            type: DELETE_CLASSROOM
        });
        await axios.delete(URL + `/api/classrooms/${id}`, config);
        let classrooms = await getState().admin.classrooms.filter(t => t.id !== id);
        setTimeout(() => {
            dispatch({
                type: DELETE_CLASSROOM_SUCCESS,
                payload: classrooms
            });
            history.push(redirectPath);
        }, 2000)
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));
        dispatch({
            type: DELETE_CLASSROOM_FAIL
        });
    }
}





