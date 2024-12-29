import "./screen.css";
import Mainleft from "./Mainleft";
import MainRight from "./MainRight";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


export const socket=io.connect("http://localhost:5000")


function MainScreen() {
useEffect(()=>{
  let currentUserId= JSON.parse(localStorage.getItem("UserDetail"))
  currentUserId= currentUserId.id
  socket.emit("OnlineUserID",currentUserId)

  socket.on("allOnlineUsers",(onlineUsers)=>{
    console.log("all online users = ",onlineUsers)
    // usersOnline=onlineUsers
  })
},[socket])



    
const[reload,setReload]=useState(localStorage?.getItem("sender"))

  return (
    <>
      <div className="main">
          <Mainleft reload={reload} setReload={setReload}/>
          <MainRight reload={reload} setReload={setReload}/>
      </div>
    </>
  );
}

export default MainScreen;
