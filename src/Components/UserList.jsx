import React, { Component } from "react";
import * as api from "../api";
import UserCard from "./UserCard";
import Loading from "./Loading";
import "../App.css";

class UserList extends Component {
  state = { users: [], isLoading: true, error: { msg: null, status: null } };

  render() {
    const { users } = this.state;
    return (
      <ul className="user_list">
        {this.state.isLoading && <Loading />}
        {this.state.error && (
          <p>
            {this.state.error.status} {this.state.error.msg}
          </p>
        )}
        {users &&
          users.map(user => {
            return <UserCard key={user.username} user={user} />;
          })}
      </ul>
    );
  }

  componentDidMount() {
    api
      .getUsers()
      .then(({ data: { users } }) => {
        this.setState({ users, isLoading: false, error: { msg: null, status: null }  });
      })
      .catch(error =>
        this.setState({ isLoading: false,
          error: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      );
  }
}

export default UserList;
