import React from "react";
import { useState, useEffect, useRef } from "react";

import "../style/Form.css"
import "../style/darkMode.css"

export default function Form(props) {
  const divRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [allMemes, setAllMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState({
    id: 0,
    textTop: "",
    textBottom: "",
    url: "http://i.imgflip.com/1bij.jpg",
  });

  function handleChangeValueOfInput(Event) {
    const { value, name } = Event.target;

    if (value.length <= containerWidth / 20 - 4) {
      setCurrentMeme((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      alert("max");
    }
  }

  // Adapt the meme container width
  useEffect(() => {
    const updateMemeContainerWidth = () => {
      if(divRef.current) {
        setContainerWidth(divRef.current.offsetWidth);
      }
    }

    window.addEventListener('resize', updateMemeContainerWidth)

    updateMemeContainerWidth();
    
    return () => {
      window.removeEventListener('resize', updateMemeContainerWidth);
    }
  }, []);

  // Accessing the API to get meme
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getNewMemeImageRandomly() {
    const RANDOM_NUMBER = Math.floor(Math.random() * allMemes.length);
    const NEW_URL = allMemes[RANDOM_NUMBER].url;
    const ID = allMemes[RANDOM_NUMBER].id;

    setCurrentMeme((prevMeme) => ({
      ...prevMeme,
      id: ID,
      url: NEW_URL,
    }));
  }

  function cleanInput() {
    setCurrentMeme((prevTextMeme) => ({
      ...prevTextMeme,
      textTop: "",
      textBottom: "",
    }));
  }
  
  let memeList = [];
  const DATA_FROM_LOCAL_STOROGE = JSON.parse(localStorage.getItem("memeList")) || memeList;

  function saveMemeImageAsFavorite() {
    let currentId = DATA_FROM_LOCAL_STOROGE.findIndex(meme => meme.id === currentMeme.id);

    if(currentId !== -1) {
      DATA_FROM_LOCAL_STOROGE[currentId] = currentMeme;
    } else{
      DATA_FROM_LOCAL_STOROGE.push(currentMeme);
    }
    
    localStorage.setItem("memeList", JSON.stringify(DATA_FROM_LOCAL_STOROGE));
  }

  // localStorage.setItem("memeList", JSON.stringify(memeList));
  // localStorage.clear();

  return (
    <>
      <main className={`container--main ${props.darkMode ? "modeDark" : false}`}>
        <div>
          <div className="toggle">
            <p className="toggle-light">light</p>
            <div className="toggle-slider" onClick={props.toggleDarkMode}>
              <div className="toggle-slider-circle"></div>
            </div>
            <p className="toggle-dark">dark</p>
          </div>
        </div>

        <form action="#" className="container--form">
          <div className="container--input">
            <input
              type="text"
              name="textTop"
              autoComplete="off"
              className="input-text-style"
              placeholder="type here"
              onChange={handleChangeValueOfInput}
              value={currentMeme.textTop}
            />

            <input
              type="text"
              name="textBottom"
              autoComplete="off"
              className="input-text-style"
              placeholder="type here"
              onChange={handleChangeValueOfInput}
              value={currentMeme.textBottom}
            />
          </div>

          <div className="container--button">
            <button
              type="button"
              className="button-style"
              onClick={getNewMemeImageRandomly}
              >
              New meme
            </button>

            <button type="button" className="button-style" onClick={cleanInput}>
              clean
            </button>

            <button type="button" className="button-style" onClick={saveMemeImageAsFavorite}>
              add to favorites  
            </button>
          </div>
        </form>

        <div className="container--image" ref={divRef}>
          <p className="text-top">{currentMeme.textTop}</p>
          <img className="meme-image" src={currentMeme.url} alt="meme image" />
          <p className="text-bottom">{currentMeme.textBottom}</p>
        </div>
      </main>
    </>
  );
}