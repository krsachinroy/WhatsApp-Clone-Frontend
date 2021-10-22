import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './sidebar/Side-bar';
import Chat from './Chat/Chat';
//import axios from './axios';
import Login from './Login/Login';
import Cookies from 'js-cookie'
import {io} from 'socket.io-client'


function App() {

  const [login, setLogin] = useState(false);
  const [convDetail, setconvDetails] = useState(null);
  const [chatBool, setChatBool] = useState(false)
  const [socket, setSocket] = useState(null);

  const setData = () => {
    setLogin(true);
  }
  const getConvDetails = (data) => {
    setChatBool(true);
    setconvDetails(data)
  }
  useEffect(() => {
    let user;
    setSocket(io("ws://localhost:8008"));
    if(login)
    user = JSON.parse(Cookies.get('User'));
    socket?.emit("addUser",user._id);
    if (Cookies.get('User')) {
      setLogin(true);
    }
  },[])

  return (
    <div className="App">
      {login ? <div className="app_body">
        <Sidebar setConvId={getConvDetails} />
        {chatBool ? <Chat convDetails={convDetail} socket={socket} /> : <span className="chatCon">Select person to chat</span>}
      </div> : <div className="app_body">
          <Login setData={setData} />
        </div>}
    </div>
  );
}

export default App;
