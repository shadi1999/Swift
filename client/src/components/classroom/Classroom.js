import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import {initSocket, joinClassroom} from '../../actions/lecture';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import {HistoryOutlined} from '@ant-design/icons';

const Classroom = ({initSocket, joinClassroom, token, lectureStarted}) => {
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
                extra={<Button type="primary">Do Something</Button>}
                />
            )}
        </Layout.Content>
    )
}

Classroom.propTypes={
    token: PropTypes.string.isRequired,
    lectureStarted: PropTypes.bool.isRequired,
    joinClassroom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    lectureStarted: state.lecture.lectureStarted
});

export default connect(mapStateToProps, {initSocket, joinClassroom})(Classroom);