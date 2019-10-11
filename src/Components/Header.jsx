import React from "react";
import { Link } from "@reach/router";
import logo from "./NCNVignette.png";

function Header() {
  return (
    <>
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <nav className="nav_bar">
        <Link to="/articles">
          <p>Articles</p>
        </Link>
        <p> | </p>
        <Link to="/users">
          <p>Users</p>
        </Link>
        <p> | </p>
        <Link to="/topics">
          <p>Topics</p>
        </Link>
      </nav>
    </>
  );
}
export default Header;
