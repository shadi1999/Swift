import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import config from '../../../Config';

const ChatMessage = ({ message, senderFirstName, color, type }) => {
    const m = () => {
        switch (type) {
            case "text":
                return (
                    <div className="talktext">
                        <p>{message}</p>
                    </div>
                );
            case "image":
                return (
                    <img className="img-attachment" src={`${config.URL.Server}/${message}`} />
                );
            case "file":
                let filename = /([^\/]+$)/.exec(message)[0];
                return (
                    <Button className="file-attachment" type="link" href={`${config.URL.Server}/${message}`} target="_blank">{filename} <DownloadOutlined /></Button>
                );
        }
    }

    return (
        <div className="chat-message">
            <div className="avatar">
                <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
                    {senderFirstName}
                </Avatar>
            </div>
            <div className="talk-bubble tri-right left-in round">
                {m()}
            </div>
        </div>
    )
}

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired,
    senderFirstName: PropTypes.string.isRequired
}

export default ChatMessage;