import React, { Component } from "react";
import * as api from "../api";
import "../App.css";

class LogIn extends Component {
  state = { users: [], selected: null, loggedIn: null };
  render() {
    return (
      <div>
        {!this.state.loggedIn && (
          <form onSubmit={this.handleSubmit}>
            <select className="select-style" name="login" onChange={this.handleSelect}>
              <option key="Guest" value="Guest">
                Guest
              </option>
              {this.state.users.map(user => {
                return (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                );
              })}
            </select>
            <br/>
            <br/>
            <input className="buttons" type="submit" value="Sign In" />
          </form>
        )}
        {this.state.loggedIn && (
          <>
          <p className="log-in">{this.state.loggedIn}</p>
          <button className="buttons" onClick={this.handleLogout}>
            Log out
          </button>
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    api.getUsers().then(({ data: { users } }) => {
      this.setState({ users });
    });
  }

  handleSelect = e => {
    e.preventDefault();
    const { target } = e;
    this.setState({ selected: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state.selected)
    this.setState({loggedIn: this.state.selected});
  };

  handleLogout = e => {
    e.preventDefault();
    this.setState({loggedIn: null})
    this.props.signIn("Guest")
  }
}

export default LogIn;
