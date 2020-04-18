import {
  RECEIVE_MESSAGE,
  ADD_MESSAGE,
  SEND_MESSAGE,
  USER_LEFT,
  GET_MESSAGES,
  USER_JOINED,
  SET_MESSAGES,
  JOIN_CLASSROOM,
  JOIN_CLASSROOM_FAIL,
  JOIN_CLASSROOM_SUCCESS,
  START_LECTURE,
  STOP_LECTURE,
  LOAD_LECTURE,
  GET_PUBLISH_TOKEN,
  GET_PLAY_TOKEN,
  ALLOW_USER_STREAM
} from './types';
import io from 'socket.io-client';
import config from '../Config';
import axios from 'axios';

let socket;

export const initSocket = (token, classroomId) => (dispatch, getState) => {
  socket = io(`${config.URL.Server}?token=${token}&classroom=${classroomId}`);

  socket.on('connect', () => {
    socket.emit('loadLecture', null, (hasStarted, onlineUsers) => {
      onlineUsers = assignColors(onlineUsers);

      dispatch({
        type: LOAD_LECTURE,
        payload: {
          hasStarted,
          onlineUsers
        }
      });
    });
  });

  socket.on('message', msg => {
    dispatch({
      type: ADD_MESSAGE,
      payload: msg
    });
  });

  socket.on('startLecture', async () => {
    dispatch({
      type: START_LECTURE
    });

    // Get a token from the media server to authorize for playing the stream.
    const playToken = await axios.get(`${config.URL.Server}/api/streams/playToken?classroomId=${classroomId}`);
    console.log(playToken);
    dispatch({
      type: GET_PLAY_TOKEN,
      payload: playToken
    });
  });

  socket.on('stopLecture', () => {
    socket.emit('leave');

    dispatch({
      type: STOP_LECTURE
    });
  });

  socket.on('userJoined', user => {
    user = assignColor(user, getState().lecture.onlineUsers);
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

  socket.on('sendPublishToken', ({token}) => {
    dispatch({
      type: GET_PUBLISH_TOKEN,
      payload: {
        publishToken: token,
        currentStreamerId: getState().auth.user._id
      }
    });
  });

  socket.on('streamerChanged', ({newStreamer}) => {
    dispatch({
      type: ALLOW_USER_STREAM,
      payload: {
        currentStreamerId: newStreamer
      }
    });
  });
}

// Does not work for more than two duplicate names.
const assignColors = (users) => {
  const deletedIndexes = [];

  for (const [i, user] of users.entries()) {
    if (deletedIndexes.includes(i))
      continue;

    if (users.some(other => user.name === other.name)) {
      let colorsCopy = [...colors]
      for (let other of users) {
        if (user.name === other.name) {
          other.color = colorsCopy.pop();
          deletedIndexes.push(users.indexOf(other));
        }
      }
      user.color = colorsCopy.pop();
    } else {
      user.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }

  return users;
}

const assignColor = (user, users) => {
  let sameName = users.find(other => user.name === other.name);

  if (sameName !== undefined) {
    do {
      user.color = colors[Math.floor(Math.random() * colors.length)];
      console.log(user.color, sameName.color);
    } while (user.color === sameName.color);
  } else {
    user.color = colors[Math.floor(Math.random() * colors.length)];
  }

  return user;
}

const colors = ['#000', '#ccc', '#aaa', '#0ec']

// TODO: add error handling for axios requests.
export const loadMessages = (classroomId) => async dispatch => {
  const M = await axios.get(`${config.URL.Server}/api/classrooms/${classroomId}/getlivechat`);

  dispatch({
    type: GET_MESSAGES,
    payload: M
  });
}

export const joinClassroom = () => async (dispatch, getState) => {
  socket.emit('join');
}

export const sendMessage = (m) => dispatch => {
  socket.emit('sendMessage', m);
}

export const startLecture = (id) => async (dispatch, getState) => {
  try {
    await axios.post(`${config.URL.Server}/api/classrooms/${id}/start`);
    socket.emit('startLecture');

    // Get a token from the media server to authorize for publishing a stream.
    const publishToken = await axios.get(`${config.URL.Server}/api/streams/publishToken?classroomId=${id}`);
    
    dispatch({
      type: GET_PUBLISH_TOKEN,
      payload: {
        publishToken,
        currentStreamerId: getState().auth.user._id
      }
    });
  } catch (error) {
    console.error('Error starting the lecture', error);
  }
}

export const stopLecture = (id) => async dispatch => {
  await axios.post(`${config.URL.Server}/api/classrooms/${id}/stop`);
  socket.emit('stopLecture');
}

// Allow a student to share video/audio stream.
export const allowStudent = (userId) => async dispatch => {
  try {
    // Get a token from the media server and send it to the student.
    const publishToken = await axios.get(`${config.URL.Server}/api/streams/publishToken?classroomId=${userId}`);
    socket.emit('allowStudent', {to: userId, token: publishToken});
  } catch(e) {
    console.log(e);
  }
}

export const disallowStudent = (userId) => async dispatch => {
  socket.emit('disallowStudent', {to: userId});
}