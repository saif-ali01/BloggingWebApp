import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import "./singlepost.css"

const Singlepost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const pf = "https://bloagsaif.herokuapp.com/images/"
    const [title, setTittle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const [user,setUser]= useState({});

    useEffect(()=>{
        const fetchUser= async()=>{
            const _id =localStorage.getItem("_id");
        const res = await axios.get(`https://bloagsaif.herokuapp.com/api/users/${_id}`);
            setUser(res.data)
        } 
        fetchUser();
    },[])

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("https://bloagsaif.herokuapp.com/api/posts/" + path)
            setPost(res.data);
            setTittle(res.data.title);
            setDesc(res.data.desc)
        }
        getPost()
    }, [path])
    const handleDelete = async () => {
        try {
            await axios.delete("https://bloagsaif.herokuapp.com/api/posts/" + path, { data: { username: user.username } })
            window.location.replace("/");

        } catch (error) {}
    }
const handleUpdate =async()=>{
    try {
        await axios.patch(`https://bloagsaif.herokuapp.com/api/posts/${post._id}`,{
            username:user.username,
             title,
             desc
        })
        setUpdateMode(false);

    } catch (error) {}

}
    return (
        <div className="singlepost">
            <div className="singlePostWrapper">
                {post.photo &&
                    (
                        <img src={pf + post.photo} alt="" className="singlePostImg" />
                    )}
                {
                    updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => { setTittle(e.target.value) }} /> : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === localStorage.getItem("username") && (
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => { setUpdateMode(true) }}></i>
                                    <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                                </div>)}
                        </h1>

                    )
                }

                <div className="singlePostInfo">
                    <span className='singlepostAuthor'>Author:
                        <Link className='link' to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlepostDate'>{new Date(post.createdAt).toDateString()} </span>
                </div>

                {
                    updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={(e) => { setDesc(e.target.value) }} /> : (

                        

                        <p className='singlePostDesc'>{desc}</p>
                    )
                }
                {updateMode && (<button className="singlePostButton" onClick={handleUpdate}>Update</button>)}
            </div>
        </div>
    )
}

export default Singlepost