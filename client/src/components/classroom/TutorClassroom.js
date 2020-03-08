import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import {initSocket, joinClassroom, startLecture} from '../../actions/chat';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import {HistoryOutlined} from '@ant-design/icons';

const TutorClassroom = ({initSocket, joinClassroom, token, lectureStarted, startLecture}) => {
    const {id} = useParams();    
    console.log(id);
    
    useEffect(() => {
        initSocket(token, id);
    }, [token, id]);

    useEffect(() => {
        if(lectureStarted) {
            joinClassroom();
        }
    }, [lectureStarted, id]);

    const onClick = () => {
        startLecture(id);
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
                     </Col>
                 </Row>
                 </>
                 ) : (
                <Result
                icon={<HistoryOutlined />}
                title="The lecture has not started yet."
                extra={<Button type="primary" onClick={onClick}>Start a Lecture</Button>}
                />
            )}
        </Layout.Content>
    )
}

TutorClassroom.propTypes={
    token: PropTypes.string.isRequired,
    lectureStarted: PropTypes.bool.isRequired,
    joinClassroom: PropTypes.func.isRequired,
    startLecture: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    lectureStarted: state.chat.lectureStarted
});

export default connect(mapStateToProps, {initSocket, joinClassroom, startLecture})(TutorClassroom);