import React, { Component } from "react";
import * as api from "../api";
import UserCard from "./UserCard";
import Loading from "./Loading";

class UserList extends Component {
  state = { users: [], isLoading: true };

  render() {
    const { users } = this.state;
    return (
      <ul>
        {this.state.isLoading && <Loading />}
        {users &&
          users.map(user => {
            return <UserCard key={user.username} user={user} />;
          })}
      </ul>
    );
  }

  componentDidMount() {
    api.getUsers().then(({ data: { users } }) => {
      this.setState({ users, isLoading: false });
    });
  }
}

export default UserList;
