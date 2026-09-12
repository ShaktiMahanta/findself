import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Findself from "./components/Findself";
// import Header from "./components/Header";
import ChatLanding from "./components/ChatLanding";
import EssentialsMegaMenu from "./components/EssentialsMegaMenu";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        {/* <Header darkMode={darkMode} setDarkMode={setDarkMode} /> */}
        <Routes>
          <Route path="/" element={<EssentialsMegaMenu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findself" element={<Findself />} />
          <Route path="/chat" element={<ChatLanding />} />
          <Route path="/essentialsMegaMenu" element={<EssentialsMegaMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
