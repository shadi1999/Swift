import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE, GET_MESSAGES, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS, START_LECTURE, STOP_LECTURE } from '../actions/types';
import io from 'socket.io-client';
import config from '../Config';
import axios from 'axios';

let socket;

export const initSocket = (token, classroomId) => dispatch => {
  socket = io(`${config.URL.Server}?token=${token}&classroom=${classroomId}`);

  socket.on('message', msg => {
    addMessage(msg);
  });

  socket.on('startLecture', () => {
    console.log('lecture has started...');
    
    dispatch({
      type: START_LECTURE
    });
  });
}

export const loadMessages = (classroomId) => async dispatch =>{
  const M=await axios.get(`${config.URL.Server}/classrooms/${classroomId}/get-live-chat`);

  dispatch({
    type:GET_MESSAGES,
    payload:M
  });
}

export const joinClassroom = () => async (dispatch, getState) => {
  socket.emit('join');
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

export const startLecture = (id) => async dispatch => {
  await axios.post(`${config.URL.Server}/api/classrooms/${id}/start`);
  socket.emit('startLecture');
}