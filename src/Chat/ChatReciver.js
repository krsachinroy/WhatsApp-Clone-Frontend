import React from 'react'
import './CSS/Chat.css'
import { format } from "timeago.js";
function ChatMessage({ message, data }) {
    return (
        <p className="chat_message">
            {message.message}
            <span className="chat_timestamp">{format(message.createdAt)}</span>
        </p>
    )
}

export default ChatMessage
