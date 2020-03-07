import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import {initSocket, joinClassroom} from '../../actions/chat';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import {HistoryOutlined} from '@ant-design/icons';

const Classroom = ({initSocket, joinClassroom, user, lectureStarted}) => {
    const {id} = useParams();

    useEffect(() => {
        initSocket(user.token);
    }, [user.token]);

    useEffect(() => {
        if(lectureStarted) {
            joinClassroom(id);
        } else {
            return (
                <Result
                    icon={<HistoryOutlined />}
                    title="The lecture has not started yet."
                    extra={<Button type="primary">Do Something</Button>}
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

Classroom.propTypes={
    user: PropTypes.object.isRequired,
    joinClassroom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    lectureStarted: state.chat.lectureStarted
});

export default connect(mapStateToProps, {initSocket, joinClassroom})(Classroom);