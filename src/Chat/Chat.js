import React, { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import './CSS/Chat.css';
import ChatReciver from './ChatReciver';
import ChatSender from './ChatSender';
import axios from '../axios';

function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new', {
            message: input,
            name: "sachin",
            timestamp: "just now",
            received: false
        })
        setInput("");;
    }
    return (
        <div className="Chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at....</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message => {
                    return message.received ? <ChatReciver message={message} /> : <ChatSender message={message} />
                })}
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage} type="submit" disabled={input.length === 0}><SendIcon /></button>
                </form>
                <MicIcon />
            </div>
        </div >
    )
}

export default Chat
