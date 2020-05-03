import React from "react";
import io from "socket.io-client";
import "./App.css";
import MessageForm from './MessageForm'

const socket = io("http://localhost:4000");

function App() {
  

  return (
    <div className="card">
      <MessageForm socket={socket}/>
    </div>
  );
}

export default App;
