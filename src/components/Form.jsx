import React from "react";
import { useState, useEffect } from "react";
import "../style/Form.css";
import "../style/darkMode.css";

export default function Form(props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [allMemes, setAllMemes] = useState([]);
  const [memeText, setMemeText] = useState({
    textTop: "",
    textBottom: "",
    url: "http://i.imgflip.com/1bij.jpg",
  });

  //update the value of all input
  function handleChange(Event) {
    const { value, name } = Event.target;

    if (value.length <= containerWidth / 20 - 4) {
      setMemeText((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      alert("max");
    }
  }

  //adapt the meme container width
  useEffect(() => {
    function handleResize() {
      const WIDTH = document.querySelector(".container--image").offsetWidth;
      setContainerWidth(WIDTH);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }, [containerWidth]);

  //access the api to get memes
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getNewImageMeme() {
    const RANDOM_NUMBER = Math.floor(Math.random() * allMemes.length);
    const NEW_URL = allMemes[RANDOM_NUMBER].url;

    setMemeText((prevMeme) => ({
      ...prevMeme,
      url: NEW_URL,
    }));
  }

  function cleanInput() {
    setMemeText((prevTextMeme) => ({
      ...prevTextMeme,
      textTop: "",
      textBottom: "",
    }));
  }

  return (
    <>
      <main
        className={`container--main ${props.darkMode ? "modeDark" : false}`}
      >
        <div className="toggle">
          <p className="toggle-light">light</p>
          <div className="toggle-slider" onClick={props.toggleDarkMode}>
            <div className="toggle-slider-circle"></div>
          </div>
          <p className="toggle-dark">dark</p>
        </div>

        <form action="#" className="container--form">
          <input
            type="text"
            name="textTop"
            autoComplete="off"
            className="input-text"
            placeholder="type here"
            onChange={handleChange}
            value={memeText.textTop}
          />

          <input
            type="text"
            name="textBottom"
            autoComplete="off"
            className="input-text"
            placeholder="type here"
            onChange={handleChange}
            value={memeText.textBottom}
          />

          <button
            type="button"
            className="button-submit"
            onClick={getNewImageMeme}
          >
            Get a new meme image
          </button>

          <button type="button" className="button-clean" onClick={cleanInput}>
            clean
          </button>
        </form>

        <div className="container--image">
          <p className="text-top">{memeText.textTop}</p>
          <img className="meme-image" src={memeText.url} alt="" />
          <p className="text-bottom">{memeText.textBottom}</p>
        </div>
      </main>
    </>
  );
}