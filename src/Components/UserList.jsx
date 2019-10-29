import React, { Component } from "react";
import * as api from "../api";
import UserCard from "./UserCard";
import Loading from "./Loading";
import "../App.css";

class UserList extends Component {
  state = { users: [], isLoading: true, error: null };

  render() {
    const { users, isLoading, error } = this.state;
    return (
      <ul className="user_list">
        {isLoading && <Loading />}
        {error && (
          <p>
            {error.status} {error.msg}
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
