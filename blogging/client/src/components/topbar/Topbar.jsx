import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Topbar.css"
const Topbar = () => {
  const logoutHandle = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    window.location.replace("/login");
  }
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const _id = localStorage.getItem("_id");
        const res = await axios.get(`https://bloagsaif.herokuapp.com/api/users/${_id}`);
        setUser(res.data)
      }
      catch (err) { }
    }
    fetchUser();
  }, [])
  const _id = localStorage.getItem("_id");
  const pf = "https://bloagsaif.herokuapp.com/images/"

  return (
    <div className='topBar'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>HOME</Link>
          </li>
          <li className="topListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>ABOUT</Link>
          </li>
          <li className="topListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>CONTACT</Link>
          </li>
          <li className="topListItem">
            <Link to="/write" style={{ textDecoration: "none", color: "inherit" }}>WRITE</Link>
          </li>
          <li className="topListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {_id && <div onClick={logoutHandle} >LOGOUT</div>}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          _id ? (
            <Link to="/setting">
              <img
                className='topImage'
                src={user?("https://w7.pngwing.com/pngs/490/971/png-transparent-naruto-uzumaki-naruto-shipp%C5%ABden-kakashi-hatake-itachi-uchiha-naruto-hand-fictional-character-cartoon-thumbnail.png"):(pf + user.profilePicture)} alt="" />
            </Link>
          ) : (
            <ul className='topList'>
              <li className='topListItem'>
                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>LOGIN</Link>
              </li>
              <li className='topListItem'>
                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>REGISTER</Link>
              </li>
            </ul>
          )
        }

        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

export default Topbar