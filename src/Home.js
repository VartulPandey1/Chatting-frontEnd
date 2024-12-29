import { useNavigate } from "react-router-dom"
import "./login.css"
const Home=()=>{
   const navigate=useNavigate()
    return(
        <div className="login">
                <button onClick={()=>navigate("/signup")}>signup</button>
                <button onClick={()=>navigate("/login")}>login</button>
        </div>
    )
}


export default Home