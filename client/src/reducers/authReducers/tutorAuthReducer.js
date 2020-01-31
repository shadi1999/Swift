import {
    TUTOR_LOADING,
    TUTOR_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    tutor: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case TUTOR_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case TUTOR_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          tutor: action.payload
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
          tutor: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
  }
  