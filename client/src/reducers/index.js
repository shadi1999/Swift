import {
    combineReducers
} from 'redux';

import alert from './alert';
import auth from './auth';
import admin from './adminReducer';
import lecture from './lecture';
import stream from './stream';
import tutor from './tutorReducer';
import student from './studentReducer';

export default combineReducers({
    alert,
    auth,
    admin,
    tutor,
    student,
    lecture,
    stream
});