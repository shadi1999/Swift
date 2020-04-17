import {
    GET_PUBLISH_TOKEN,
    GET_PLAY_TOKEN,
    CONNECTION_SUCCESS,
    CONNECTION_CLOSE,
    START_SHARING,
    START_SHARING_SUCCESS,
    START_SHARING_FAIL,
    STOP_SHARING,
    TOGGLE_MIC
} from './types';
import axios from 'axios';
import config from '../Config';
import {
    setAlert
} from './alert';
import WebRTCAdaptor from '../utils/webrtc_adaptor';

let webRTCAdaptor;

export const initWebrtc = (classroomId) => async (dispatch) => {
    try {
        const classroom = await axios.get(`${config.URL.Server}/api/classrooms/${classroomId}`);
        const websocketURL = `wss://${window.location.hostname}:5443/${classroom.data.mediaServerApp}/websocket`;

        webRTCAdaptor = new WebRTCAdaptor({
            websocket_url: websocketURL,
            mediaConstraints: {
                audio: true,
                video: true
            },
            peerconnection_config: null,
            sdp_constraints: {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            },
            localVideoId: "localVideo",
            debug: true,
            callback: function (info, obj) {
                if (info == "initialized") {
                    console.log("initialized");
                    dispatch({
                        type: CONNECTION_SUCCESS
                    });
                } else if (info == "publish_started") {
                    //stream is being published
                    console.log("publish started");
                    dispatch({
                        type: START_SHARING_SUCCESS
                    });
                } else if (info == "publish_finished") {
                    //stream is being finished
                    console.log("publish finished");
                    dispatch({
                        type: STOP_SHARING
                    });
                } else if (info == "closed") {
                    //console.log("Connection closed");
                    if (typeof obj != "undefined") {
                        console.log("Connecton closed: " + JSON.stringify(obj));
                    }
                    dispatch({
                        type: CONNECTION_CLOSE
                    });
                } else if (info == "refreshConnection") {
                    dispatch({
                        type: START_SHARING
                    });
                    startPublishing();
                } else if (info == "updated_stats") {
                    //obj is the PeerStats which has fields
                    //averageOutgoingBitrate - kbits/sec
                    //currentOutgoingBitrate - kbits/sec
                    console.log("Average outgoing bitrate " + obj.averageOutgoingBitrate + " kbits/sec" +
                        " Current outgoing bitrate: " + obj.currentOutgoingBitrate + " kbits/sec");

                }
            },
            callbackError: function (error, message) {
                console.log("error callback: " + JSON.stringify(error));
                var errorMessage = JSON.stringify(error);
                if (typeof message != "undefined") {
                    errorMessage = message;
                }

                if (error.indexOf("NotFoundError") != -1) {
                    errorMessage = "Camera or mic are not found or not allowed in your device.";
                } else if (error.indexOf("NotReadableError") != -1 || error.indexOf("TrackStartError") != -1) {
                    errorMessage = "Camera or mic is being used by some other program. Please, make sure and try again.";
                } else if (error.indexOf("OverconstrainedError") != -1 || error.indexOf("ConstraintNotSatisfiedError") != -1) {
                    errorMessage = "No device was found for audio/video."
                } else if (error.indexOf("NotAllowedError") != -1 || error.indexOf("PermissionDeniedError") != -1) {
                    errorMessage = "Please, allow the browser to access camera and mic.";
                } else if (error.indexOf("TypeError") != -1) {
                    errorMessage = "Connection error.";
                } else if (error.indexOf("ScreenSharePermissionDenied") != -1) {
                    errorMessage = "Please, allow screen sharing in the browser.";
                } else if (error.indexOf("WebSocketNotConnected") != -1) {
                    errorMessage = "Connection error.";
                    dispatch({
                        type: CONNECTION_CLOSE
                    });
                }
                alert(errorMessage);
            }
        });
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;

            if (errors)
                for (let error of errors)
                    dispatch(setAlert(error.msg, 'error', 5000));
        }
        console.log('Error', err);
    }
}

const startPublishing = (token, classroomId) => {
    const streamId = classroomId;
    webRTCAdaptor.publish(streamId, token);
}

export const startPublishingAction = (token, classroomId) => dispatch => {
    dispatch({
        type: START_SHARING
    });

    startPublishing(token, classroomId);
}

export const stopPublishing = (classroomId) => dispatch => {
    webRTCAdaptor.stop(classroomId);

    dispatch({
        type: STOP_SHARING
    });
}

export const switchMode = (classroomId, newMode) => dispatch => {
    console.log(newMode, classroomId);
    switch (newMode) {
        case 'webcam':
            webRTCAdaptor.turnOnLocalCamera();
            webRTCAdaptor.switchVideoCapture(classroomId);
            break;
        case 'screen':
            webRTCAdaptor.switchDesktopCapture(classroomId);
            break;
        case 'audio':
            webRTCAdaptor.turnOffLocalCamera();
    }
}

export const toggleMic = () => (dispatch, getState) => {
    if (getState().stream.micMuted) {
        webRTCAdaptor.unmuteLocalMic();
    } else {
        webRTCAdaptor.muteLocalMic();
    }

    dispatch({
        type: TOGGLE_MIC
    });
}