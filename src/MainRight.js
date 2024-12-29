import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { socket } from "./screen.js"
import SendIcon from '@mui/icons-material/Send';

function MainRight({reload,setReload}){

const firstRender=useRef(true)
const[chatData,setchatData]=useState([])
const[liveMsg,setLiveMsg]=useState([])
const[receiverDetail, setReceiverDetail]= useState({})
const[sendersDetails,setSendersDetails]=useState({})
const[inputMsg,setInputMsg]=useState("")
const[ignore,forcedUpdate]=useState(0)
const navigate= useNavigate()
const scrollRef = useRef()



useEffect(()=>{
    getDetails()
},[reload])

useEffect(()=>{
    if(firstRender.current){
        firstRender.current=false}
        else{
        socket.on("receivingMessage",({receiverId,senderId,message,time})=>{
        const R_id=receiverId
        const S_id=senderId
        const chat=message
        const data={R_id,S_id,chat,time}
        setLiveMsg(data)
    })}
},[socket])

useEffect(()=>{
    setchatData([...chatData,liveMsg])
},[liveMsg])

async function getDetails(){
    const receiver= JSON.parse(localStorage.getItem('Receiver'))
    const senders= JSON.parse(localStorage.getItem('UserDetail'))
    console.log("receiver (get details)",receiver?._id)
    console.log("senders  (get details)",senders?.id)
    setReceiverDetail(receiver)
    setSendersDetails(senders)
    
    const result=await fetch(`http://localhost:5000/chat/${senders?.id}&${receiver?._id}`)
    const data= await result.json()

    console.log("getchat = ",data)
    setchatData(data)

    console.log("first set chatData = ", chatData)
}

async function sendClicked(){
    const S_id=sendersDetails?.id
    const R_id=receiverDetail?._id
    const chat=inputMsg
    const time=new Date()
    // const time=date.getHours+":"+date.getMinutes+date.getTimezoneOffset
    console.log("current time ",time)
    console.log("S_id = ",S_id,"   R_id = ",R_id)

    const result=await fetch("http://localhost:5000/chat",{
    method:"post",    
    headers:{"content-type":"application/json"},
    body:JSON.stringify({S_id,R_id,chat,time})
    })

    const data= await result.json()
    console.log(data)
    setInputMsg("")
    forcedUpdate(ignore+1)
    

    socket.emit("sendingMessage",{
                senderId: S_id,
                receiverId: R_id,
                message: chat,
                time:time
            })


}

useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: 'smooth'});
},[chatData])


    function ShowChat(chat,data,id,time){
        var date= new Date()
        var Time=new Date(time)
        var currentHour= date.getHours();
        var currentMinute= date.getMinutes();
        var msgHour=Time.getHours();
        var msgMinute=Time.getMinutes();
        var mindiff=Math.abs(currentMinute-msgMinute)
        var hrsdiff=Math.abs(currentHour-msgHour)
    
        // console.log("currentMinute   = ",currentMinute, "msgMinute   = ",msgMinute )
        console.log("mindiff   = ",mindiff , "hrsdiff  =  ",hrsdiff)
        var msg;

        if(hrsdiff>0 && mindiff>0  )
        { msg= hrsdiff+ " hrs ago"}
        else if(hrsdiff>0  && mindiff<=0)
        {msg = hrsdiff+ " hrs ago"}
        else if(hrsdiff<=0 && mindiff>0)
        {msg=mindiff +" minutes ago"}
        else
        {msg="just now"}
        
        
        return(
        <React.Fragment  key={id}>
            <div   className={chat?"chat-L" : "chat-R"}>
                <h3>{data}</h3>
            </div>
            <div  className={chat?"chat-L" : "chat-R"}>
                <h4>{msg}</h4>
            </div>
        </React.Fragment>)

    }

    function logout(){
        localStorage.removeItem("Receiver")
        localStorage.removeItem("UserDetail")
        localStorage.removeItem("sender")
        navigate("/")
    }
    

return(
    <>

                    <div className="main-right">
                     <div className="top">
    
                         <div>
                            {(reload)? 
                            
                            <><img alt="PP" src="https://redcoraluniverse.com/img/default_profile_image.png"></img>
                            <h2>
                                {
                                reload?.charAt(0).toUpperCase() + reload?.slice(1)
                                //data.some
                                }
                            </h2></>:null }
                
                         </div>
           
                         <div className="top-icon"><button onClick={logout}>logout</button>
                         </div>
                        </div>
              

                    {
                        (sendersDetails && receiverDetail&&chatData)
                        ?
                        (
                            <div className="bottom" >
                            
                            <div className="bottom-top">
                                {chatData.map((res, index )=>{


                                        const time= res.time
                                        const data=res.chat
                                        const id= index
                                        
                                        if(res.S_id===sendersDetails.id  && res.R_id===receiverDetail?._id)
                                            {
                                                return(ShowChat (false,data,id,time))
                                            }
                                        if(res.R_id===sendersDetails.id  && res.S_id===receiverDetail?._id)
                                            {
                                                return(ShowChat(true,data,id,time))
                                            }
                                     
                                    })}        
                                        <div ref={scrollRef} style={{height:"0px"}}></div>

                            </div>
                            {/* <div className="bottom-top-right">

                            </div> */}
                                <div className="bottom-down">
                                    <form  onSubmit={(e)=>{e.preventDefault()}}>
                                        <input placeholder="write message...." value={inputMsg} onChange={(e)=>{setInputMsg(e.target.value)}} ></input>
                                        <button type="submit" onClick={sendClicked} ><SendIcon/></button>
                                    </form>
                                </div>         


                    </div>
                        )
                        :
                        (
                            <div className="nothing"></div>
                        )
                    }
    
                 </div>

    </>
)



    }      
    
                
                 
        

export default MainRight