import axios from 'axios';
import {React,useState} from 'react'
import "./write.css"
const Write = () => {
  const [title,setTitle]=  useState("");
  const [desc,setDesc]=useState ("");
  const [file,setFile]=useState(null);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const newPost ={
      username:localStorage.getItem("username"),
      title,
      desc,
    };
    if(file){
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename)
      data.append("file",file);
      newPost.photo =filename;
      try{
        await axios.post("https://bloagsaif.herokuapp.com/api/upload",data)
      }catch(error){

      }

    }
    const res =await  axios.post("https://bloagsaif.herokuapp.com/api/posts/",newPost)
    
  }
  return (
    <div className="write">
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
      )}
        <form  className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id='fileInput' onChange={(e)=>setFile(e.target.files[0])} style={{display:"none"}} />
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>

            <div className="writeFormGroup">
                <textarea placeholder='Tell Your Story' type="text" className='writeInput writeText' onChange={(e)=>{setDesc(e.target.value)}}></textarea>
            </div>
            <button className='writeSubmit' type='submit'> Publish</button>
        </form>
     </div>
  )
}

export default Write