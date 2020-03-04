import React from 'react';
import { Layout, Row, Col } from 'antd';
import ChatContainer from './chat/ChatContainer';

const Classroom = () => {
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

export default Classroom;