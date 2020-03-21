import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const ChatMessage = ({ message, senderFirstName, color, type }) => {
    return (
        <div className="chat-message">
            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
                {senderFirstName}
            </Avatar>
            <div className="talk-bubble tri-right left-in round">
                <div className="talktext">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired,
    senderFirstName: PropTypes.string.isRequired
}

export default ChatMessage;