import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Form from "./components/Form";
import FavoriteMemeImage from "./pages/FavoriteMemeImage";

function App() {
  const [themeDark, isThemeDark] = useState(true);

  function toggleDarkMode() {
    isThemeDark((prevTheme) => !prevTheme);
  }

  useEffect(() => { 
    if (themeDark) {
      document.body.style.backgroundColor = "#2C3333";
    } else {
      document.body.style.backgroundColor = "initial";
    }
  }, [themeDark]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout darkMode={themeDark}/>}>
            <Route index element={<Form toggleDarkMode={toggleDarkMode} darkMode={themeDark} />} />
            <Route path="/favoritememeimage" element={<FavoriteMemeImage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;