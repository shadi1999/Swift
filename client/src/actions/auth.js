import axios from 'axios';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

const url = "http://localhost:5000";

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      const body = JSON.stringify({ name, email, password });
    
      try {
        const res = await axios.post(url + '/api/students', body, config);
    
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

export const addTutor = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      const body = JSON.stringify({ name, email, password });
    
      try {
        const res = await axios.post(url + '/api/tutors', body, config);
    
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

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(url + '/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const login = (email, password) => async dispatch => {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(url + '/api/auth/', body, {headers});

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch(err) {
        const errors = err.response.data.errors;

        if (errors)
            for (let error of errors)
                dispatch(setAlert(error.msg, 'error', 100000));

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
}