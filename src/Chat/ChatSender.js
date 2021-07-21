import React from 'react'
import './CSS/Chat.css'

function ChatSender({ message }) {
    return (
        <p className="chat_message chat_sender">
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
        </p>
    )
}

export default ChatSender
