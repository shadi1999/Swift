import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import admin from './adminReducers';
import chat from './chat';

export default combineReducers({
    alert,
    auth,
    admin,
    chat
});
