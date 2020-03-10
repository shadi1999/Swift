import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE,USER_LEFT, GET_MESSAGES, USER_JOINED, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS, START_LECTURE, STOP_LECTURE, LOAD_LECTURE } from '../actions/types';
import io from 'socket.io-client';
import config from '../Config';
import axios from 'axios';

let socket;

export const initSocket = (token, classroomId) => dispatch => {
  socket = io(`${config.URL.Server}?token=${token}&classroom=${classroomId}`);

  socket.on('connect', () => {
    socket.emit('loadLecture', null, (hasStarted, onlineUsers) => {
      dispatch({
        type: LOAD_LECTURE,
        payload: {hasStarted, onlineUsers}
      });
    });
  });

  socket.on('message', msg => {
    dispatch({
      type: ADD_MESSAGE,
      payload: msg
    });
  });

  socket.on('startLecture', () => {
    dispatch({
      type: START_LECTURE
    });
  });

  socket.on('stopLecture', () => {
    dispatch({
      type: STOP_LECTURE
    });
  });

  socket.on('userJoined', user => {
    dispatch({
      type: USER_JOINED,
      payload: user
    })
  });
  
  socket.on('userLeft', user => {
    dispatch({
      type: USER_LEFT,
      payload: user
    })
  });

}


export const loadMessages = (classroomId) => async dispatch =>{
  const M=await axios.get(`${config.URL.Server}/api/classrooms/${classroomId}/getlivechat`);

  dispatch({
    type:GET_MESSAGES,
    payload:M
  });
}

export const joinClassroom = () => async (dispatch, getState) => {
  socket.emit('join');
}

export const sendMessage = (m) => dispatch => {
  socket.emit('sendMessage', m);
}

export const startLecture = (id) => async dispatch => {
  await axios.post(`${config.URL.Server}/api/classrooms/${id}/start`);
  socket.emit('startLecture');
}

export const stopLecture = (id) => async dispatch => {
  await axios.post(`${config.URL.Server}/api/classrooms/${id}/stop`);
  socket.emit('stopLecture');
}