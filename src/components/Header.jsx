import React from "react";
import { NavLink } from "react-router-dom";

import "../style/header.css";
import '../style/darkMode.css'

function Header(props) {
  return (
    <header className={`container--header ${props.darkMode ? "modeDark" : ""}`}>
      <div className="container--meme-logo-and-text">
        <img
          className="logoMeme"
          src="https://pngimg.com/uploads/trollface/trollface_PNG14.png"
          alt="logo"
        />
        <h1 className="title">Meme Generator</h1>
      </div>
      
      <nav className="primary-nav">
        <ul className="primary-list">
          <li>
            <NavLink 
              to="/"
              className={({ isActive }) => isActive ? "isActive" : ""}
            >Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/favoritememeimage"
              className={({ isActive }) => isActive ? "isActive" : ""}
              >Favorites memes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;