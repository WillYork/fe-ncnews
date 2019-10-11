import React, { Component } from "react";
import * as api from "../api";

class LogIn extends Component {
  state = { users: [], loggedIn: "Guest" };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select name="login" onChange={this.handleSelect}>
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
        <input type="submit" value="Sign In" />
      </form>
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
    this.setState({ loggedIn: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state.loggedIn);
  };
}

export default LogIn;
