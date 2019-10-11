import React from "react";
import "../App.css";


function UserCard({ user }) {
  return (
    <div className="user_card">
      <li>{user.username}</li>
      <img src={user.avatar_url} alt="" />
    </div>
  );
}

export default UserCard;
