import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE, GET_MESSAGES, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS, START_LECTURE, STOP_LECTURE } from '../actions/types';
import io from 'socket.io-client';
import config from '../Config';

let socket;

export const initSocket = (token) => dispatch => {
  socket = io(`${config.URL.Server}?token=${token}`);

  socket.on('message', msg => {
    addMessage(msg);
  });

  socket.on('startLecture', () => {
    dispatch({
      type: START_LECTURE
    });
  });
}

export const joinClassroom = (classroomId) => async (dispatch, getState) => {
  socket.emit('join', {classroom: classroomId});
}

const addMessage = (m) => async dispatch => {
  dispatch({
    type: ADD_MESSAGE,
    payload: m
  });
}

export const sendMessage = (m) =>{
  socket.emit('sendMessage',m,()=>{
    addMessage(m);
  });
}