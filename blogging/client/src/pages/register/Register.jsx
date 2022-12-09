import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./register.css"
const Register = () => {
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(false);
const navigate =useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://bloagsaif.herokuapp.com/api/auth/register",{
        username,
        email,
        password
      });
      res.data && navigate("/login")

    } catch (error) {
      setError(true);
      
    }

  }
  return (
    <div className='register'>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" required placeholder="Enter your username.."
        onChange={e=>setUsername(e.target.value)} />
        <label>Email</label>
        <input type="email" required placeholder="Enter your email.."
        onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" required placeholder="Enter your password.."
        onChange={e=>setPassword(e.target.value)} />
        <button className="registerButton" type='submit'>Register</button>
      </form>
      <Link to="/login">
        <button className="registerLoginButton">Login</button>
      </Link>
      {error && <span style={{color:"red",marginTop:"10px"}}> Try another Username & Email!</span>}

    </div>
  )
}

export default Register