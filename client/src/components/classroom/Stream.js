import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { initWebrtc, startPublishingAction, stopPublishing, toggleMic, switchMode } from '../../actions/stream';
import { disallowStudent } from '../../actions/lecture';
import PropTypes from 'prop-types';
import { Button, Radio, Tooltip, Space } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined, VideoCameraOutlined, DesktopOutlined, AudioOutlined, AudioFilled, AudioMutedOutlined, SwapOutlined } from '@ant-design/icons';

const Stream = ({ streamState, publishToken, initWebrtc, startPublishingAction, stopPublishing, toggleMic, switchMode, currentStreamerId, user, disallowStudent }) => {
    const { id } = useParams();

    useEffect(() => {
        if(currentStreamerId === user._id) {
            initWebrtc(id);
        }
    }, [currentStreamerId, user]);

    const startSharing = () => {
        startPublishingAction(publishToken, id);
    }

    const stopSharing = () => {
        stopPublishing(id);
    }

    const disallow = () => {
        disallowStudent(id);
    }

    const switchStreamMode = e => {
        switchMode(id, e.target.value);
    }

    if (currentStreamerId === user._id) {
        return (
            <>
                <Radio.Group defaultValue="webcam" onChange={switchStreamMode}>
                    <Radio.Button value="webcam"><VideoCameraOutlined /> Webcam</Radio.Button>
                    <Radio.Button value="screen"><DesktopOutlined /> Screen</Radio.Button>
                    <Radio.Button value="audio"><AudioOutlined /> Audio Only</Radio.Button>
                </Radio.Group>
                <Space>
                    {!streamState.isSharing ? (<Button onClick={startSharing} disabled={!streamState.webrtcConnected} icon={<PlayCircleOutlined />} type="primary">Start Sharing</Button>) : (<Button onClick={stopSharing} icon={<PauseCircleOutlined />} type="danger">Stop Sharing</Button>)}
                    <Tooltip title={streamState.micMuted ? 'Unmute mic' : 'Mute mic'}>
                        <Button onClick={toggleMic} shape="circle" icon={streamState.micMuted ? (<AudioMutedOutlined />) : (<AudioFilled />)} />
                    </Tooltip>
                </Space>
            </>
        );
    } else if (user.kind === "Tutor") {
        return (
            <Tooltip title="Stop student from streaming to share your own stream">
                <Button onClick={disallow} danger icon={<SwapOutlined />}>Share your stream and stop student</Button>
            </Tooltip>
        );
    } else {return null;}
}

Stream.propTypes = {
    streamState: PropTypes.object.isRequired,
    initWebrtc: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    streamState: state.stream,
    publishToken: state.lecture.publishToken,
    currentStreamerId: state.lecture.currentStreamerId,
    user: state.auth.user
});

export default connect(mapStateToProps, { initWebrtc, startPublishingAction, stopPublishing, toggleMic, switchMode, disallowStudent })(Stream);