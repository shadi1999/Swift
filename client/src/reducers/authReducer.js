import {
    GUEST_LOADED,
    GUEST_LOADING,
    ADMINSTRATOR_LOADED,
    ADMINSTRATOR_LOADING,
    TUTOR_LOADED,
    TUTOR_LOADING,
    STUDENT_LOADING,
    STUDENT_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    guset: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case STUDENT_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case STUDENT_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          student: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          guset: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
  }
  