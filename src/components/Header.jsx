import React from "react";
import "../style/header.css";
import "../style/darkMode.css";

function Header(props) {
  console.log(props);
  return (
    <header className={`container--header ${props.darkMode ? "modeDark" : ""}`}>
      <img
        className="logoMeme"
        src="https://pngimg.com/uploads/trollface/trollface_PNG14.png"
        alt="logo"
      />
      <h1 className="title">Meme Generator</h1>
    </header>
  );
}

export default Header;