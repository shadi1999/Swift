import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { initWebrtc, startPublishingAction, stopPublishing } from '../../actions/stream';
import PropTypes from 'prop-types';
import { Button, Radio, Tooltip } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined, VideoCameraOutlined, DesktopOutlined, AudioOutlined, AudioFilled, AudioMutedOutlined } from '@ant-design/icons';

const Stream = ({ streamState, publishToken, initWebrtc, startPublishingAction, stopPublishing }) => {
    const { id } = useParams();

    useEffect(() => {
        initWebrtc(id);
    }, []);

    const startSharing = () => {
        startPublishingAction(publishToken, id);
    }

    const stopSharing = () => {
        stopPublishing(id);
    }

    return (
        <>
            <Radio.Group defaultValue="webcam">
                <Radio.Button value="webcam"><VideoCameraOutlined /> Webcam</Radio.Button>
                <Radio.Button value="screen"><DesktopOutlined /> Screen</Radio.Button>
                <Radio.Button value="audio"><AudioOutlined /> Audio Only</Radio.Button>
            </Radio.Group>
            {!streamState.isSharing ? (<Button onClick={startSharing} disabled={!streamState.webrtcConnected} icon={<PlayCircleOutlined />} type="primary">Start Sharing</Button>) : (<Button onClick={stopSharing} icon={<PauseCircleOutlined />} type="danger">Stop Sharing</Button>)}
            <Tooltip title={streamState.micMuted ? 'Unmute mic' : 'Mute mic'}>
                <Button shape="circle" icon={streamState.micMuted ? (<AudioFilled />) : (<AudioMutedOutlined />)} />
            </Tooltip>
        </>
    );
}

Stream.propTypes = {
    streamState: PropTypes.object.isRequired,
    initWebrtc: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    streamState: state.stream,
    publishToken: state.lecture.publishToken
});

export default connect(mapStateToProps, { initWebrtc, startPublishingAction, stopPublishing })(Stream);