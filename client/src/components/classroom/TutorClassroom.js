import React, {
    useEffect
} from 'react';
import {
    Layout,
    Row,
    Col
} from 'antd';
import {
    useParams
} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {
    connect
} from 'react-redux';
import {
    initSocket,
    joinClassroom,
    startLecture,
    stopLecture
} from '../../actions/lecture';
import PropTypes from 'prop-types';
import {
    Result,
    Button,
    List,
    Avatar,
    Radio,
    Tooltip
} from 'antd';
import {
    HistoryOutlined
} from '@ant-design/icons';
import Stream from './Stream';

const TutorClassroom = ({
    initSocket,
    joinClassroom,
    token,
    lectureStarted,
    startLecture,
    stopLecture,
    onlineUsers,
    streamState
}) => {
    const {
        id
    } = useParams();

    useEffect(() => {
        initSocket(token, id);

    }, [token, id]);

    useEffect(() => {
        if (lectureStarted) {
            joinClassroom();
        }

        // return leave()... socket.io leaves automatically
    }, [lectureStarted, id]);

    const StartLecture = () => {
        startLecture(id);
    }

    const StopLecture = () => {
        stopLecture(id);
    }

    return (

        <Layout.Content>
            {lectureStarted ? (
                <>
                    <Row>
                        <Col span={8}>
                            <ChatContainer />
                        </Col>
                        <Col span={16}>
                            <Button type="danger" onClick={StopLecture}>Stop Lecture</Button>
                            <List
                                bordered
                                header={<Stream />}
                                dataSource={onlineUsers}
                                renderItem={item => (
                                    <List.Item key={item._id} actions={[<a key="options">...</a>]}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar style={{ backgroundColor: item.color, verticalAlign: 'middle' }} size="large">
                                                    {item.name}
                                                </Avatar>
                                            }
                                            title={item.name}
                                            description={item.kind}
                                        />
                                    </List.Item>
                                )}
                            />
                            <video id="localVideo"></video>
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
    streamState: state.stream
});

export default connect(mapStateToProps, {
    initSocket,
    joinClassroom,
    startLecture,
    stopLecture
})(TutorClassroom);