import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import admin from './adminReducers';

export default combineReducers({
    alert,
    auth,
    admin
});
