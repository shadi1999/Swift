import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import admin from './adminReducers';
import lecture from './lecture';

export default combineReducers({
    alert,
    auth,
    admin,
    lecture
});
