import {v4} from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
import { message } from 'antd';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  // Alert message pop up.

  switch(alertType) {
    case 'success':
      message.success(msg, timeout / 1000);
      break;
    case 'error':
      message.error(msg, timeout / 1000);
      break;
    case 'info':
      message.info(msg, timeout / 1000);
      break;
    case 'loading':
      message.loading(msg, timeout / 1000);
      break;
    case 'warning':
    default:
      message.warning(msg, timeout / 1000);
  }
};

export const setAlert2 = (msg, alertType, timeout = 5000) => dispatch => {
  // Normal alert element.

  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
