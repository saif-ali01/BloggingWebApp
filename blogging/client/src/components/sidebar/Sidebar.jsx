import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css"

const Sidebar = () => {
  const [cats,setCats] = useState([]);
  useEffect(()=>{
    const getCat = async ()=>{
      const res = await axios.get("https://bloagsaif.herokuapp.com/api/categories");
      setCats(res.data);
    }
    getCat();
  },[])
  return (
    <div className="sidebar">
       <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className='sidebarImg' src="https://images.unsplash.com/photo-1559863345-02eae058c2c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
        <p>Whether it's watching blue, rolling waves crash against the sandy shore or hearing birds chirping in a green, luscious forest, there is something so remarkable and beautiful about being immersed in nature. It’s easy to be swept away with today’s technology and fast-paced living, but no matter where you are, nature always has a way of bringing peace to the mind and grounding a person.</p>
       </div>
       <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            cats.map((c)=>(
              <Link className='link' to={`/?cat=${c.name}`}>
              <li className="sidebarListItem">{c.name}</li>
              </Link>

            ))
          }
           
        </ul>
       </div>
       <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
                <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
       </div>
    </div>
  )
}

export default Sidebar