import React from "react";
import '../style/header.css'

function Header(){
    return(
        <header className="container--header">
            <img className="logoMeme" src="https://pngimg.com/uploads/trollface/trollface_PNG14.png" alt="logo" />
            <h1 className="title">Meme Generator</h1>
        </header>
    )
}

export default Header;