import React from 'react'
import './CSS/Chat.css'
function ChatMessage({ message }) {
    return (
        <p className="chat_message">
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
        </p>
    )
}

export default ChatMessage
