import "./login.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){
    const[username,setUsername]=useState("")
    const navigate=useNavigate()

    async function Clicked(){
        
        console.log("username",username)
       const result=await fetch("http://localhost:5000/login",{
        method:"post"    ,
        headers:{"content-type":"application/json"},
        body:JSON.stringify({username})})

        const sol= await result.json()
        if(sol.exist)
        alert("User not exist")
        else{
        localStorage.setItem("UserDetail",JSON.stringify({name:sol[0].username,id:sol[0]._id}))
        navigate('/main')}
    }
    return(
        <div className="login">
           <form  onSubmit={(e)=>{e.preventDefault()}}>
                <input placeholder="enter username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <button type="submit" onClick={Clicked}>Submit</button>
            </form>
        </div>
    )
}

export default Login