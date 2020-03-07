import React, {useState} from 'react';
import {Button,Input} from 'antd';
import ChatMessage from './ChatMessage';
import {connect} from 'react-redux';
import {sendMessage} from '../../../actions/chat';
import PropTypes from 'prop-types';

const ChatContainer = ({messages, sendMessage}) => {
    const [msg, setMsg] = useState('');


    const onClick = () => {
        sendMessage(msg);
    }

    return(
        <div>
            <ChatMessage message="sk;dfjldjf" senderFirstName="sdfgegegswf" />
            <div>
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
    messages: state.chat.messages  
});

export default connect(mapStateToProps, {sendMessage})(ChatContainer);