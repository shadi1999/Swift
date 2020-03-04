import { RECEIVE_MESSAGE, ADD_MESSAGE, GET_MESSAGES } from '../actions/types';

function addMessage(message) {
    return {
      type: ADD_MESSAGE,
      message
    };
}
