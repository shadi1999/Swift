import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import {initSocket, joinClassroom} from '../../actions/lecture';
import PropTypes from 'prop-types';
import { Result, Button, List, Avatar, Menu, Dropdown } from 'antd';
import { HistoryOutlined, MessageOutlined, MoreOutlined } from '@ant-design/icons';
import Stream from './Stream';
import VideoPlayer from "./VideoPlayer";
import axios from 'axios';
import config from '../../Config';
import Slides from "./Slides";

const Classroom = ({initSocket, joinClassroom, token, lectureStarted, streamState, playToken, publishToken, onlineUsers, currentStreamerId}) => {
    let mediaServerApp = "WebRTCApp";
    const {id} = useParams();    

    useEffect(() => {
        initSocket(token, id);
    }, [token, id]);

    useEffect(() => {
        if(lectureStarted) {
            joinClassroom();
        }

        // return leave()... socket.io leaves automatically
    }, [lectureStarted, id]);

    useEffect(() => {
        async function getClassroom() {
            try {
                const { data } = await axios.get(`${config.URL.Server}/api/classrooms/${id}`, {headers: {"x-auth-token": token}});
                console.log(data);

                mediaServerApp = data.mediaServerApp;
            } catch (e) {
                console.log(e);
            }
        }
        getClassroom();
    }, []);

    const optionsMenu = (
        <Menu>
          <Menu.Item key="0">
            <MessageOutlined />
            Private message
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
                        <video id="localVideo" className={streamState.isSharing ? "clappr-vid" : "hide"} autoPlay muted></video>
                        {!streamState.isSharing && mediaServerApp ? (<VideoPlayer className="play-vid" source={`https://${window.location.hostname}:5443/${mediaServerApp}/streams/${id}.m3u8`} />) : ""}
                     </Col>
                     <Col span={11}>
                            <Slides />
                        </Col>
                     <Col span={5}>
                        <List
                            bordered
                            // header={publishToken ? <Stream /> : ""}
                            header={<Stream />}
                            dataSource={onlineUsers}
                            renderItem={item => (
                                <List.Item key={item._id} actions={[<Dropdown overlay={optionsMenu} trigger={['click']}>
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
                extra={<Button type="primary">Do Something</Button>}
                />
            )}
        </Layout.Content>
    )
}

Classroom.propTypes={
    token: PropTypes.string.isRequired,
    lectureStarted: PropTypes.bool.isRequired,
    joinClassroom: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    lectureStarted: state.lecture.lectureStarted,
    onlineUsers: state.lecture.onlineUsers,
    streamState: state.stream,
    playToken: state.lecture.playToken,
    currentStreamerId: state.lecture.currentStreamerId,
    publishToken: state.lecture.publishToken
});

export default connect(mapStateToProps, {initSocket, joinClassroom})(Classroom);
