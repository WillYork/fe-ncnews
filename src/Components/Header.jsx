import React from "react";
import { Link } from "@reach/router";
import logo from "./NCNVignette.png";
import LogIn from "./LogIn";

function Header(props) {
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
      <LogIn signIn={props.signIn} />
    </>
  );
}
export default Header;
