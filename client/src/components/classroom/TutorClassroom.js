import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import {joinClassroom} from '../../actions/chat';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import {HistoryOutlined} from '@ant-design/icons';

const TutorClassroom = ({joinClassroom, lectureStarted}) => {
    const {id} = useParams();

    useEffect(() => {
        if(lectureStarted) {
            joinClassroom(id);
        } else {
            return (
                <Result
                    icon={<HistoryOutlined />}
                    title="The lecture has not started yet."
                    extra={<Button type="primary">Start a Lecture</Button>}
                />
            )
        }
    }, [lectureStarted, id]);

    return (
        <Layout.Content>
            <>
            <Row>
                <Col span={8}>
                    <ChatContainer />
                </Col>
                <Col span={16}>
                </Col>
            </Row>
            </>
        </Layout.Content>
    )
}

TutorClassroom.propTypes={
    user:PropTypes.object.isRequired,
    joinClassroom:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    lectureStarted: state.chat.lectureStarted
});

export default connect(mapStateToProps, {joinClassroom})(TutorClassroom);