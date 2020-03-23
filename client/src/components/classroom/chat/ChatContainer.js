import React, {
    useState,
    useEffect
} from 'react';
import {
    useParams
} from 'react-router-dom';
import {
    Button,
    Input,
    Spin,
    Upload,
    message
} from 'antd';
import {
    LoadingOutlined
} from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import {
    connect
} from 'react-redux';
import {
    sendMessage,
    loadMessages
} from '../../../actions/lecture';
import PropTypes from 'prop-types';
import {
    UploadOutlined
} from '@ant-design/icons';
import config from '../../../Config';

const ChatContainer = ({
    messages,
    sendMessage,
    loadMessages,
    onlineUsers,
    loading,
    token
}) => {
    const { id } = useParams();
    const [msg, setMsg] = useState('');

    const onClick = () => {
        sendMessage(msg);
    }

    useEffect(() => {
        loadMessages(id);
    }, []);

    const props = {
        name: 'file',
        action: `${config.URL.Server}/api/files/upload/${id}`,
        headers: {
            "x-auth-token": token
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                // After the file is successfully uploaded to the server, send a message to the
                // chat to the other users.
                let type;
                if (info.file.response.mimetype.startsWith('image')) {
                    type = 'image';
                } else {
                    type = 'file';
                }

                let lectureId = /([^\/]+$)/.exec(info.file.response.destination)[0];
                let text = `${id}/${lectureId}/${info.file.response.filename}`;
                sendMessage({ text, type });
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    const btns = (
        <>
            <Button type="submit" onClick={onClick}>
                Send</Button>
            <Upload {...props}>
                <Button>
                    <UploadOutlined />
                </Button>
            </Upload>
        </>
    );


    // TODO: submit on clicking enter.

    return (
        <div>
            {!loading ? messages.map((m, i) => {
                let user = onlineUsers.find(u => m.sender === u._id);
                if (user === undefined) return;
                return <ChatMessage key={i} message={m.text} senderFirstName={user.name} color={user.color} type={m.type} />
            }) : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}></Spin>
            }
            <Input onChange={e => setMsg({ text: e.target.value, type: 'text' })} addonAfter={btns} />
        </div>
    )
}

ChatContainer.propTypes = {
    messages: PropTypes.array,
    sendMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    messages: state.lecture.messages,
    onlineUsers: state.lecture.onlineUsers,
    loading: state.lecture.loading,
    token: state.auth.token
});

export default connect(mapStateToProps, {
    sendMessage,
    loadMessages
})(ChatContainer);
