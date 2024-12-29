import { useEffect, useState } from "react"
import { socket } from "./screen.js"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import useGetUser from "./utils/useGetUser.js";





    



function Mainleft({relaod,setReload}){
    // const[data,setData]=useState({})
    const[usersOnline,setUsersOnline]=useState([])
    const[selectedUser, setSelectedUser] = useState(null)
    
    const data=useGetUser()

    useEffect(()=>{
        let currentUserId= JSON.parse(localStorage.getItem("UserDetail"))
        currentUserId= currentUserId.id
        socket.emit("OnlineUserID",currentUserId)
        
        socket.on("allOnlineUsers",(onlineUsers)=>{
            // console.log("all online users = ",onlineUsers)
            setUsersOnline(onlineUsers)
          })
      },[socket])


    const UserDetail=JSON.parse(localStorage.getItem("UserDetail"))

    if(data){
    return(
        <>
        <div className="main-left">
          <div className="up">
            <div className="up-left">
              <img alt="Profile pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWa96swybPrXPLWgpRTWWawAhiMPbr98y5Q&usqp=CAU"></img>
            </div>
            <div className="up-right">CHATTING</div>
          </div>

          <div className="down">
            {/* <input placeholder="Search"></input> */}
            <h2 style={{height:"auto"}}>Users</h2>
            {data.map((res,key)=>{
                if(UserDetail?.id!==res?._id){
                return(
                    <ul id={key} className="sidebar-item" onClick={()=>setSelectedUser(key)} style={ selectedUser === key ?{background:"black"}:{background:"#29292A"} }>
                        <li  onClick={()=>{  return(localStorage.setItem("sender",res.username),
                                                    setReload(res.username),
                                                    localStorage.setItem("Receiver",JSON.stringify(res))
                                            )
                                         }}>
                             {<img alt="PP" src="https://redcoraluniverse.com/img/default_profile_image.png"></img>}
                             {
                                (usersOnline.some((ans)=>ans.userId===res._id))?
                                (<div>
                                    <h3>{ (res.username)} <FiberManualRecordIcon sx={{ fontSize: 15 }} color="success"/> </h3>   
                                    <h5>I am using chatting</h5>     
                                </div>):(<div>
                                            <h3>{ (res.username[0].toUpperCase() + res.username.slice(1,))}  </h3>   
                                            <h5>I am using chatting</h5>     
                                        </div>)
                             }
                                {/* {usersOnline.map((ans)=>
                                {
                                    if(ans.userId==res._id)
                                    {
                                        return(<div>
                                            {console.log("if")}
                                            <h3>{ (res.username)} online </h3>   
                                            <h5>I am using chatting</h5>     
                                        </div>)
                                    }
                                    else
                                    {
                                        return(<div>
                                            {console.log("else")}
                                            <h3>{ (res.username)}  offline </h3>   
                                            <h5>I am using chatting</h5>     
                                        </div>)
                                    } */}
                                {/* })} */}
                                    
                                    
                        </li>
                    </ul>
                )
             }})} 
            

          </div>
            
                    <div className="CurrentUser" >
                        {<img alt="PP" src="https://redcoraluniverse.com/img/default_profile_image.png"></img>}
                        <h1>{(UserDetail.name).charAt(0).toUpperCase()+(UserDetail.name).slice(1)}</h1> 
                </div>
        </div>
        </>
    )}
    else{
        return <h1>loading</h1>
    }
}

export default Mainleft