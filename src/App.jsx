import Header from "./components/Header";
import Form from "./components/Form";
import { useState, useEffect } from "react";

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
      <Header darkMode={themeDark} />
      <Form toggleDarkMode={toggleDarkMode} darkMode={themeDark} />
    </>
  );
}

export default App;