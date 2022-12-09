import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "./setting.css"

const Setting = () => {

    const [user,setUser]= useState({});

    useEffect(()=>{
        const fetchUser= async()=>{
            const _id =localStorage.getItem("_id");
        const res = await axios.get(`https://bloagsaif.herokuapp.com/api/users/${_id}`);
            setUser(res.data)
        } 
        fetchUser();
    },[])


    const [username,setUsername]=  useState("");
    const [email,setEmail]=useState ("");
    const [password,setPassword]=useState ("");
    const [file,setFile]=useState(null);
    const [success,setSuccess]=useState (false);
  
    const handleSubmit= async(e)=>{
      e.preventDefault();
      const updatedUser ={
        userId:user._id,
        username,email,password
      };
      if(file){
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name",filename)
        data.append("file",file);
        updatedUser.profilePicture =filename;
        try{
          await axios.post("https://bloagsaif.herokuapp.com/api/upload",data);
        }catch(error){ }
        window.location.reload(false);
    }
    try {
        await  axios.patch(`https://bloagsaif.herokuapp.com/api/users/${user._id}`,updatedUser)
        setSuccess(true)
        
      } catch (error) {}
      console.log(user._id===updatedUser.userId)
    }
    const pf = "https://bloagsaif.herokuapp.com/images/"
   


  return (
    <div className="setting">
        <div className="settingWrapper">
            <div className="settingTitle">
                <span className="settingUpdateTitle">Update Your Account</span>
                <span className="settingDeleteTitle">Delete Account</span>
            </div>
            <form  className="settingForm" onSubmit={handleSubmit}>
                <label htmlFor="">Profile Picture</label>
                <div className="settingPP">
                    <img src={pf +user.profilePicture} alt="" />
                    <label htmlFor="FileInput">
                    <i className="settingPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file"  id='FileInput' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <label >Username</label>
                <input type="text" required placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}} />
                <label >Email</label>
                <input type="text" required placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label >Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="settingSubmit" type='submit'>Update</button>
                {success &&<span style={{color:"green"}}>Profile has been Updated</span>}
            </form>
        </div>
        <Sidebar />
    </div>
  )
}

export default Setting