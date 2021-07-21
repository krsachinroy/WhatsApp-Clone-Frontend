import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Sidebar from './sidebar/Side-bar';
import Chat from './Chat/Chat';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, []);

  useEffect(() => {
    var pusher = new Pusher('7a91eac3b74c2aa64953', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      setMessages([...messages, newMessage])
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages])

  console.log(messages);
  return (
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
