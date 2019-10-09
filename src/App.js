import React from "react";
import "./App.css";
import Header from "./Components/Header";
import MainSection from "./Components/MainSection";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <MainSection />
      </header>
    </div>
  );
}

export default App;
