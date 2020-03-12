import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Button,Input} from 'antd';
import ChatMessage from './ChatMessage';
import {connect} from 'react-redux';
import {sendMessage,loadMessages} from '../../../actions/lecture';
import PropTypes from 'prop-types';
import {v1} from 'uuid';

const ChatContainer = ({messages, sendMessage,loadMessages,onlineUsers}) => {
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
            {messages.map((m, i) => {
                let user = onlineUsers.find(u => m.sender === u._id);
            return <ChatMessage key={i} message={m.text} senderFirstName={user.name} color={user.color} />
            })
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
    sendMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    messages: state.lecture.messages,
    onlineUsers: state.lecture.onlineUsers  
});

export default connect(mapStateToProps, {sendMessage,loadMessages})(ChatContainer);