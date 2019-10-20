import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import MainSection from "./Components/MainSection";

class App extends Component {
  state = {
    loggedIn: "Guest"
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header loggedIn={this.state.loggedIn} signIn={this.signIn} />
        </header>
        <main className="App-main">
          <MainSection loggedIn={this.state.loggedIn} />
        </main>
      </div>
    );
  }

  signIn = username => {
    this.setState({ loggedIn: username });
  };
}

export default App;
