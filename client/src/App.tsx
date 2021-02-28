import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";

import { MessageItem } from "./components";
import "./App.css";
import * as dotenv from "dotenv";
dotenv.config();
const socket = socketIO("http://127.0.0.1:8080");

interface chatState {
  id: string;
  [index: string]: any | undefined;
}

function App() {
  const [room, setRoom] = useState<chatState | undefined>(undefined);
  const [text, setText] = useState("");
  const [roomId, setRoomId] = useState("#general");
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(
    process.env.REACT_APP_USERNAME || "React-user"
  );
  useEffect(() => {
    socket.emit("start", username);
    socket.on("update room", (update: any) => {
      setRoom({
        ...room,
        ...update
      });
      setRoomId(update.id);
    });
    socket.on("welcome", (data: any) => {
      console.log("welcome");
      setRoom(data.surface);
      socket.emit("join", roomId);
    });
    socket.on("/username", (newUsername: string) => setUsername(newUsername))
    socket.on("!emit", (cmd: string, args: any[] | undefined) => {
      switch (cmd) {
        case "join":
          if (!args) {
            break;
          }
          console.log("leaving ", roomId);
          socket.emit("leave");
          break;
        default:
          break;
      }
      socket.emit(cmd, args);
    });
    socket.on("/users", (userList: any)=> setUsers(userList))
    socket.on("/rooms", (roomsList: any) => setRooms(roomsList));
  }, []); //eslint-disable-line
  const handleUpdateText = (e: any) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("say", text, roomId);
    setText("");
  };
  function handleClickAndJoin(roomName: string) {
    const nextRoom = '#' + roomName.split('#')[1];
    socket.emit("leave", roomId);
    setRoomId(nextRoom);
    socket.emit("join", nextRoom);
  }
  return (
    <div className="App">
      <div className="left-side">
        <ul className="rooms">
          {rooms.map((roomName: string, key: number) => (
            <li key={key} className="li-room" onClick={()=>handleClickAndJoin(roomName)}>{roomName}</li>
          ))}
        </ul>
      </div>
      <div className="chat">
        <input
          style={{ width: "12ch" }}
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <ul className="ul-chat">
          {room?.buffer &&
            room?.buffer.map((txt: string, key: number) =>
              MessageItem({
                txt,
                key,
                name: txt.split(",")[0] || undefined
              })
            )}
        </ul>
        <hr className="fat-10"/>
        <form onSubmit={handleSubmit}>
          <input
            className="chat-input"
            name="say"
            value={text}
            onChange={handleUpdateText}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
