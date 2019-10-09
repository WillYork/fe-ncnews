import React from "react";

function UserCard({ user }) {
  return (
    <>
      <li>{user.username}</li>
      <img src={user.avatar_url} alt="" />
    </>
  );
}

export default UserCard;
