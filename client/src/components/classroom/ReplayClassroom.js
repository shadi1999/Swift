import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import { replayLecture } from '../../actions/lecture';
import PropTypes from 'prop-types';
import { Result, Button, List, Avatar, Menu, Dropdown } from 'antd';
import { HistoryOutlined, MessageOutlined, MoreOutlined } from '@ant-design/icons';
import VideoPlayer from "./VideoPlayer";
import axios from 'axios';
import config from '../../Config';
import Slides from "./Slides";

const ReplayClassroom = ({token, streamState, playToken, currentStreamerId, replayLecture, currentReplayUrl}) => {
    let mediaServerApp = "WebRTCApp";
    const {id} = useParams();    

    useEffect(() => {
        replayLecture();
    }, []);

    return (
        <Layout.Content>
            <>
                <Row justify="space-around" className="classroom">
                    <Col span={11}>
                        <ChatContainer />
                        <VideoPlayer className="play-vid" source={`https://${window.location.hostname}:5443/${mediaServerApp}/streams/${currentReplayUrl}`} />
                    </Col>
                    <Col span={11}>
                        <Slides />
                    </Col>
                </Row>
            </>
        </Layout.Content>
    );
}

ReplayClassroom.propTypes = {
    token: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    streamState: state.stream,
    playToken: state.lecture.playToken,
    currentStreamerId: state.lecture.currentStreamerId,
    currentReplayUrl: state.lecture.currentReplayUrl
});

export default connect(mapStateToProps, {replayLecture})(ReplayClassroom);
