import {
  ADD_MESSAGE,
  USER_LEFT,
  GET_MESSAGES,
  USER_JOINED,
  START_LECTURE,
  STOP_LECTURE,
  LOAD_LECTURE,
  GET_PUBLISH_TOKEN,
  GET_PLAY_TOKEN,
  ALLOW_USER_STREAM,
  RECEIVE_SLIDE,
  CHANGE_SLIDE_PAGE,
  CHANGE_CURRENT_REPLAY,
  SET_ONLINE_USERS
} from './types';
import io from 'socket.io-client';
import config from '../Config';
import axios from 'axios';
import { stopPublishing } from './stream';

let socket;

export const initSocket = (token, classroomId) => (dispatch, getState) => {
  socket = io(`${config.URL.Server}?token=${token}&classroom=${classroomId}`);

  socket.on('connect', () => {
    socket.emit('loadLecture', null, (hasStarted, slideUrl, onlineUsers) => {
      onlineUsers = assignColors(onlineUsers);

      dispatch({
        type: LOAD_LECTURE,
        payload: {
          hasStarted,
          onlineUsers,
          slideUrl
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

  socket.on('slidesUploaded', url => {
    dispatch({
      type: RECEIVE_SLIDE,
      payload: url
    });
  });

  socket.on('slidesPageChanged', pageNumber => {
    dispatch({
      type: CHANGE_SLIDE_PAGE,
      payload: pageNumber
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

    if (getState().stream.isSharing && getState().auth.user._id !== newStreamer) {
      dispatch(stopPublishing(classroomId));
    }
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

// Disallow the student to share a stream & change the streamer back to the tutor.
export const disallowStudent = (userId) => async dispatch => {
  socket.emit('disallowStudent', {to: userId});
}

export const uploadSlides = (url) => async dispatch => {
  socket.emit('uploadSlides', url);
}

export const changeSlidesPage = pageNumber => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_SLIDE_PAGE,
    payload: pageNumber
  });

  if (getState().auth.user.kind === "Tutor")
    socket.emit('changeSlidesPage', pageNumber);
}


export const replayLecture = (classroomId, lectureId) => async (dispatch, getState) => {
    dispatch({type: STOP_LECTURE});

    try {
        const res = await axios.get(`${config.URL.Server}/api/lectures/${classroomId}/${lectureId}`);
        const { lecture, streamHistory } = res.data;
        let { chatMessages, slideHistory, onlineUsers } = lecture;

        // Add all attendants to onlineUsers array.
        dispatch({
          type: SET_ONLINE_USERS,
          payload: assignColors(onlineUsers)
        });

        // Time and duration in milliseconds.
        let duration = lecture.endedOn - lecture.startedOn;
        console.log('duration', duration)
        let time = 0;
        // Time in minutes.
        let min = 0;

        let timerId = setInterval(() => {
            if (time >= duration)
                clearInterval(timerId);

            // Get messages sent in this second of the lecture.
            for (let i = 0; i < chatMessages.length; i++) {
                let messageTime = chatMessages[i].time - lecture.startedOn;
                console.log(messageTime)
                if (messageTime >= time && messageTime <= (time + 1000)) {
                  	console.log("1")
                    dispatch({
                        type: ADD_MESSAGE,
                        payload: chatMessages[i]
                    });

                    chatMessages.splice(i, 1);
                    i--;
                } else {
					console.log(2)
                    break;
                }
            }

            // Get slides file and page changes in this second of the lecture.
            for (let i = 0; i < slideHistory.length; i++) {
                let messageTime = slideHistory[i].date - lecture.startedOn;
                if (messageTime >= time && messageTime <= (time + 1000)) {
                    if(slideHistory[i].slideUrl !== getState().lecture.slideUrl) {
                        dispatch({
                            type: RECEIVE_SLIDE,
                            payload: slideHistory[i].slideUrl
                        });
                    }

                    dispatch({
                        type: CHANGE_SLIDE_PAGE,
                        payload: slideHistory[i].slideNumber
                    });                    

                    slideHistory.splice(i, 1);
                    i--;
                } else {
                    break;
                }
            }

			console.log('time', time)
            time += 1000;
        }, 1000);

        // Check if the video replay url changed every minute.
        let minTimerId = setInterval(() => {
            if (min >= (duration / 60000))
                clearInterval(minTimerId);

            if (streamHistory[min.toString()]) {
                dispatch({
                    type: CHANGE_CURRENT_REPLAY,
                    payload: streamHistory[min.toString()]
                });
            }
                
            min++;
        }, 60000);
    } catch(e) {
        console.log(e);
    }
}
