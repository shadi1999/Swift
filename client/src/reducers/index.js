import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import studentAuthReducer from './authReducers/studentAuthReducer';
import administratorAuthReducer from './authReducers/administratorAuthReducer';
import tutorAuthReducer from './authReducers/tutorAuthReducer';
export default combineReducers({
  error: errorReducer,
  auth: {studentAuthReducer,administratorAuthReducer,tutorAuthReducer}
});
