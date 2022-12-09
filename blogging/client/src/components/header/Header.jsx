import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>

        </div>
        <img className="headerImg" src="https://p4.wallpaperbetter.com/wallpaper/1006/739/740/aerial-view-of-city-at-sunset-and-cloudy-skies-paris-montparnasse-tower-paris-montparnasse-tower-wallpaper-preview.jpg" alt="not found"  />
    </div>
  )
}

export default Header