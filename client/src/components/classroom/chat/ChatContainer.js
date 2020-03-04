import React from 'react';
import {Button,Input} from 'antd';
import ChatMessage from './ChatMessage';

const ChatContainer = () => {


    const onClick = () =>{

    }

    return(
        <div>
            <ChatMessage/>
            <div>
                <Input/>
                <Button type="submit" onClick={onClick}>
                Send</Button>
            </div>
        </div>
    )
}

export default ChatContainer;