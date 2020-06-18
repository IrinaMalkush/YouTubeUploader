import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <MainPage />
    </div>
  );
}

export default App;
