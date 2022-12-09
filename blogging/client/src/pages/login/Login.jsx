import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login.css"
const Login = () => {

  const userRef =useRef()
  const passwordRef =useRef()
const navigate = useNavigate();    
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const res =await axios.post("https://bloagsaif.herokuapp.com/api/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      res.data._id && navigate("/")

      localStorage.setItem("_id",res.data._id)
      
      if(res.data){
        localStorage.setItem("user",true);
        localStorage.setItem("username",res.data.username);

        
      }


    } catch (error) {
      
    }
  }
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username.." ref={userRef}/>          
            <label>Password</label>
            <input type="password" required placeholder="Enter your password.." ref={passwordRef} /> 
            <button className="loginButton" type='submit'>Login</button>
        </form>   
        <Link to="/register">
        <button className="loginRegisterButton">Register</button>
        
      </Link>

    </div>
  )
}

export default Login