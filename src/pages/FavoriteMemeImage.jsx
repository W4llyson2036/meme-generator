import React, { useState, useEffect } from "react";
import "../style/FavoriteMemeImage.css";

export default function FavoriteMemeImage() {
  const [favoriteMeme, setFavoriteMeme] = useState([]);

  useEffect(() => {
    const getMemeFromLocalStorage = JSON.parse(localStorage.getItem("memeList")) || [];
    setFavoriteMeme(getMemeFromLocalStorage);
  }, []);

  function removeMeme(indexToRemoveMeme) {
    const newArray = favoriteMeme.filter(item => item.id !== indexToRemoveMeme);
    setFavoriteMeme(newArray);
    localStorage.setItem('memeList', JSON.stringify(newArray));
  }

  let memeElements = null;
  
  if (favoriteMeme.length > 0) {
    memeElements = favoriteMeme.map((meme) => (
      <div className="container--favorite-meme" key={meme.id}>
        <p className="text-top">{meme.textTop}</p>
        <img className="meme-image-favorite" src={meme.url} alt={meme.id} />
        <p className="text-bottom">{meme.textBottom}</p>
        <div className="buttons">
          <button 
            className="button-favorite remove"
            onClick={() => removeMeme(meme.id)}
          >
            Remove
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {favoriteMeme.length > 0 ? (
        <div className="grid-favorite-meme">
          {memeElements}
        </div>
      ) : (
        <div className="container--without-favorite-meme">
          <h1 className="without-favorite-meme">You don't have favorite meme</h1>
          <img
            src="/emoticonSadIcon.svg"
            alt="emoticon_sad_icon.svg"
          />
        </div>
      )}
    </div>
  );
}