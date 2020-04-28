import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import { connect } from 'react-redux';
import { initSocket, joinClassroom, startLecture, stopLecture, allowStudent, banStudentFromChat } from '../../actions/lecture';
import PropTypes from 'prop-types';
import { Result, Button, List, Avatar, Menu, Dropdown } from 'antd';
import { HistoryOutlined, MoreOutlined, StopOutlined, VideoCameraAddOutlined, MessageOutlined } from '@ant-design/icons';
import Stream from './Stream';
import VideoPlayer from "./VideoPlayer";
import axios from 'axios';
import config from '../../Config';
import Slides from "./Slides";

const TutorClassroom = ({
    initSocket,
    joinClassroom,
    token,
    lectureStarted,
    startLecture,
    stopLecture,
    onlineUsers,
    streamState,
    playToken,
    currentStreamerId,
    allowStudent,
    banStudentFromChat
}) => {
    let [mediaServerApp, setMediaServerApp] = useState("");
    const { id } = useParams();

    useEffect(() => {
        initSocket(token, id);

    }, [token, id]);

    useEffect(() => {
        if (lectureStarted) {
            joinClassroom();
        }

        // return leave()... socket.io leaves automatically
    }, [lectureStarted, id]);

    useEffect(() => {
        async function getClassroom() {
            try {
                // TODO: move mediaServerApp to lecture redux state.
                const { data } = await axios.get(`${config.URL.Server}/api/classrooms/${id}`, {headers: {"x-auth-token": token}});
                setMediaServerApp(data.mediaServerApp);
            } catch (e) {
                console.log(e);
            }    
        }
        getClassroom();
    }, []);

    const StartLecture = () => {
        startLecture(id);
    }

    const StopLecture = () => {
        stopLecture(id);
    }

    const generateOptions = (userId) => (
        <Menu>
          <Menu.Item key="0" onClick={() => allowStudent(userId)}>
            <VideoCameraAddOutlined />
            Allow to speak
          </Menu.Item>
          <Menu.Item key="1">
            <MessageOutlined />
            Private message
          </Menu.Item>
          <Menu.Item key="2" onClick={() => banStudentFromChat(userId)}>
            <StopOutlined />
            Ban from chat
          </Menu.Item>
        </Menu>
      );

    return (
        <Layout.Content>
            {lectureStarted ? (
                <>
                    <Row justify="space-around" className="classroom">
                        <Col span={6}>
                            <ChatContainer />
                            <video id="localVideo" className={streamState.isSharing ? "clappr-vid" : "hide"} autoPlay muted playsInline></video>
                            {!streamState.isSharing && mediaServerApp ? (<VideoPlayer className="play-vid" source={`https://${window.location.hostname}:5443/${mediaServerApp}/streams/${id}.m3u8`} live={true} classroomId={id} />) : ""}
                        </Col>
                        <Col span={11}>
                            <Slides />
                        </Col>
                        <Col span={5}>
                            <Button type="danger" onClick={StopLecture}>Stop Lecture</Button>
                            <List
                                bordered
                                header={<Stream />}
                                dataSource={onlineUsers}
                                renderItem={item => (
                                    <List.Item key={item._id} actions={[<Dropdown overlay={generateOptions(item._id)} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}><MoreOutlined /></a>
                                        </Dropdown>]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar className={currentStreamerId === item._id ? "currentStreamer" : ""} style={{ backgroundColor: item.color, verticalAlign: 'middle' }} size="large">
                                                    {item.name}
                                                </Avatar>
                                            }
                                            title={item.name}
                                            description={item.kind}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </>
            ) : (
                    <Result
                        icon={<HistoryOutlined />}
                        title="The lecture has not started yet."
                        extra={<Button type="primary" onClick={StartLecture}>Start a Lecture</Button>}
                    />
                )}
        </Layout.Content>)
}

TutorClassroom.propTypes = {
    token: PropTypes.string.isRequired,
    lectureStarted: PropTypes.bool.isRequired,
    joinClassroom: PropTypes.func.isRequired,
    startLecture: PropTypes.func.isRequired,
    stopLecture: PropTypes.func.isRequired,
    onlineUsers: PropTypes.array.isRequired,
    streamState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    lectureStarted: state.lecture.lectureStarted,
    onlineUsers: state.lecture.onlineUsers,
    streamState: state.stream,
    playToken: state.lecture.playToken,
    currentStreamerId: state.lecture.currentStreamerId,
});

export default connect(mapStateToProps, {
    initSocket,
    joinClassroom,
    startLecture,
    stopLecture,
    allowStudent,
    banStudentFromChat
})(TutorClassroom);