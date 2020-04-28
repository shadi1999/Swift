import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import { replayLecture } from '../../actions/lecture';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import VideoPlayer from "./VideoPlayer";
import Slides from "./Slides";

const ReplayClassroom = ({playToken, currentStreamerId, replayLecture, currentReplayUrl, replayDuration, replayTime}) => {
    const mediaServerApp = "WebRTCApp";
    
    const { classroomId, lectureId } = useParams();
    
    useEffect(() => {
        replayLecture(classroomId, lectureId);
    }, [classroomId, lectureId]);

    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds;
    }

    const getProgress = () => {
        // let timeString = `${replayTime / 360000}:${replayTime / 60000}:${replayTime / 60000}`;
        // let durationString = `${replayDuration / 360000}:${replayDuration / 60000}`;
        return `${msToTime(replayTime)} / ${msToTime(replayDuration)}`;
    }

    return (
        <Layout.Content>
            <>
                <Progress percent={(replayTime / replayDuration) * 100} format={getProgress} />
                <Row justify="space-around" className="classroom">
                    <Col span={11}>
                        <ChatContainer />
                        <VideoPlayer className="play-vid" source={`https://${window.location.hostname}:5443/${mediaServerApp}/streams/${currentReplayUrl}`} live={false} />
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
    playToken: state.lecture.playToken,
    currentStreamerId: state.lecture.currentStreamerId,
    currentReplayUrl: state.lecture.currentReplayUrl,
    replayDuration: state.lecture.replayDuration,
    replayTime: state.lecture.replayTime
});

export default connect(mapStateToProps, {replayLecture})(ReplayClassroom);
