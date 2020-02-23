import axios from 'axios';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
  } from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const login = (email, password) => async dispatch => {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('/api/auth/', body, {headers});

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch(err) {
        const errors = err.response.data.errors;

        if (errors)
            for (error of errors)
                dispatch(setAlert(error.msg, 'danger'));

        dispatch({
            type: LOGIN_FAIL
        });
    }
}