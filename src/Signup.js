import "./login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function Clicked() {
    if (username) {
      const result = await fetch("http://localhost:5000/signup", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const sol = await result.json();
      console.log(sol);
      if (sol.exist){
        alert("user already exist");
      }else{
        localStorage.setItem("UserDetail",JSON.stringify({ name: sol.username, id: sol._id }));
        navigate("/main");
      }
    } 
    else 
    {
      alert("please enter the values");
    }
  }
  return (
    <>
      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            placeholder="enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <button onClick={Clicked}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
