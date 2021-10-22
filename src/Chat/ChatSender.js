import React from 'react'
import './CSS/Chat.css'
import { format } from "timeago.js";

function ChatSender({ message, data }) {
    return (
        <p className="chat_message chat_sender">
            {message.message}
            <span className="chat_timestamp">{format(message.createdAt)}</span>
        </p>
    )
}

export default ChatSender
