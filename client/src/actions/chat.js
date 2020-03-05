import { RECEIVE_MESSAGE, ADD_MESSAGE, SEND_MESSAGE, GET_MESSAGES, SET_MESSAGES, JOIN_CLASSROOM, JOIN_CLASSROOM_FAIL, JOIN_CLASSROOM_SUCCESS } from '../actions/types';
import io from 'socket.io-client';
import config from '../Config';
import { connect } from 'react-redux';

let socket;

export const joinClassroom = (classroomId, userId) => async (dispatch, getState) => {
  socket = io(config.URL.Server);
  socket.emit('join', {
    _id: userId,
    classroom: classroomId});

  socket.on('message', msg => {
    addMessage(msg);
  });
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