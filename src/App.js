import React from "react";
import "./App.css";
import Header from "./Components/Header";
import ArticleSection from "./Components/ArticleSection";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <ArticleSection />
      </header>
    </div>
  );
}

export default App;
