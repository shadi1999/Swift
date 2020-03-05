import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import {useParams} from 'react-router-dom';
import ChatContainer from './chat/ChatContainer';
import {connect} from 'react-redux';
import {joinClassroom} from '../../actions/chat';
import PropTypes from 'prop-types';


const Classroom = ({user, joinClassroom}) => {
    const {id} = useParams();

    useEffect(() => {
        joinClassroom(id);
    }, [id]);

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
    user:PropTypes.object.isRequired,
    joinClassroom:PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    user:state.auth.user  
});

export default connect(mapStateToProps,{joinClassroom})(Classroom);