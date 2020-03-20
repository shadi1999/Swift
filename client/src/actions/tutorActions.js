import {
    GET_TUTOR_LECTURES,
    GET_TUTOR_CLASSROOMS
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