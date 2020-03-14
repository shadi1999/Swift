import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Input, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import {connect} from 'react-redux';
import {sendMessage,loadMessages} from '../../../actions/lecture';
import PropTypes from 'prop-types';

const ChatContainer = ({messages, sendMessage, loadMessages, onlineUsers, loading}) => {
    const {id} = useParams();
    const [msg, setMsg] = useState('');

    const onClick = () => {
        sendMessage(msg);
    }

    useEffect(
        ()=>{
            loadMessages(id);
        }
    ,[]);

    return(
        <div>
            <div>
            {!loading ? messages.map((m, i) => {
                let user = onlineUsers.find(u => m.sender === u._id);
                if(user === undefined) return;
            return <ChatMessage key={i} message={m.text} senderFirstName={user.name} color={user.color} />
            }) : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}></Spin>
            }
                <Input onChange={e => setMsg(e.target.value)} />
                <Button type="submit" onClick={onClick}>
                Send</Button>
            </div>
        </div>
    )
}

ChatContainer.propTypes = {
    messages: PropTypes.array,
    sendMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) =>({
    messages: state.lecture.messages,
    onlineUsers: state.lecture.onlineUsers,
    loading: state.lecture.loading
});

export default connect(mapStateToProps, {sendMessage,loadMessages})(ChatContainer);