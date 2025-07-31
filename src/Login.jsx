import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
// import { login } from "./api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    // const response = await login(username, password);
    const response = {ok: true}
    
    // const responseData = await response.json();
    const responseData = {user_id: username}
    if (response.ok) {
      localStorage.setItem('username', username)
      localStorage.setItem('user_id', responseData.user_id)
      navigate("/")
    } else {
      alert(responseData.message)
    }
  }

  return (
    <div className="wrapper-login">
      <div className="login">
        <br/>


        <div className="login-signin-text">Sign in to X</div>
        <br/>
        <span>Username</span>
        <input
          autoComplete="off"
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>

        <span>Password</span>
        <input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>

        <button
          onClick={() => loginUser()}
        >
          Login
        </button>
        <br/>

        <span style={{color: "blue", cursor: 'pointer'}} onClick={() => navigate('/register')}>Create user</span>

        <br/>
      </div>
    </div>
  );
}

export default Login;