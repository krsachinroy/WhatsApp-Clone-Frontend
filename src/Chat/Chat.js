import React, { useState, useEffect,useRef } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import './CSS/Chat.css';
import ChatReciver from './ChatReciver';
import ChatSender from './ChatSender';
import axios from '../axios';
import Cookies from 'js-cookie';
import {io} from 'socket.io-client';


function Chat({ convDetails,socket }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [reciver, setReciver] = useState({});
    //const [socket, setSocket] = useState();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const user = JSON.parse(Cookies.get('User'));
    const scrollRef = useRef(null);

    const sendMessage = async (e) => {
        e.preventDefault();
        const mess = {
            conversationId: convDetails?._id,
            senderId: user._id,
            message: input
        }
        await axios.post('/messages/new', mess).then((response) =>{
            setMessages([...messages, response.data]);
        });

        const receiverId = convDetails.members.find(
            (member) => member !== user._id
          );
      
          socket?.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: input,
          });
        
        setInput("");
    }
    useEffect( () => {
       //setSocket(io("ws://localhost:8008"));
       socket?.emit('addUser',user._id);
        socket?.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              message: data.text,
              createdAt: Date.now(),
            });
          });
    },[])

    useEffect(() => {
        arrivalMessage &&
          convDetails?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, convDetails]);

      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    useEffect( () => {
        const getConvMessage = async ()=>{
            await axios.get(`/messages/${convDetails._id}`)
            .then(response => {
                setMessages(response.data)
            })
        }
        getConvMessage();
    }, [convDetails._id]);
    
    useEffect(() => {
        let reciverId = convDetails.members.filter(m => m !== user._id)
        reciverId = reciverId == null ? null : reciverId[0];
        const getReciverDetails = async () => {
            await axios.get(`/messages/getReciverDetails/${reciverId}`).then(response => {
                if (!response.data)
                    console.log("No data found.")
                setReciver(response.data)
            })
        }
        getReciverDetails();
    }, [convDetails._id])
    return (
        <div className="Chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{reciver.Username}</h3>
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
                    return message.senderId!==user._id ? <ChatReciver message={message}/> : <ChatSender message={message}/>
                })}
                <div ref={scrollRef}/>
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
