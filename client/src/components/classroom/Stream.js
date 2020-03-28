import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import { connect } from 'react-redux';
import { initWebrtc } from '../../actions/stream';
import PropTypes from 'prop-types';
import { Result, Button, List, Avatar, Radio, Tooltip } from 'antd';
import { HistoryOutlined, PauseCircleOutlined, PlayCircleOutlined, VideoCameraOutlined, DesktopOutlined, AudioOutlined, AudioFilled, AudioMutedOutlined } from '@ant-design/icons';

const Stream = ({ classroomId, streamState, initWebrtc }) => {

    useEffect(() => {
        initWebrtc(classroomId);
    }, []);

    return (
        <>
            <Radio.Group defaultValue="webcam">
                <Radio.Button value="webcam"><VideoCameraOutlined /> Webcam</Radio.Button>
                <Radio.Button value="screen"><DesktopOutlined /> Screen</Radio.Button>
                <Radio.Button value="audio"><AudioOutlined /> Audio Only</Radio.Button>
            </Radio.Group>
            {!streamState.isSharing ? (<Button disabled={!streamState.webrtcConnected} icon={<PlayCircleOutlined />} type="primary">Start Sharing</Button>) : (<Button icon={<PauseCircleOutlined />} type="danger">Stop Sharing</Button>)}
            <Tooltip title={streamState.micMuted ? 'Unmute mic' : 'Mute mic'}>
                <Button shape="circle" icon={streamState.micMuted ? (<AudioFilled />) : (<AudioMutedOutlined />)} />
            </Tooltip>
        </>
    );
}

Stream.propTypes = {
    classroomId: PropTypes.string.isRequired,
    streamState: PropTypes.object.isRequired,
    initWebrtc: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    streamState: state.stream
});

export default connect(mapStateToProps, { initWebrtc })(Stream);