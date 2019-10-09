import React from "react";
import { Link } from "@reach/router";

function Header() {
  return (
    <>
      <h1>NC NEWS</h1>
      <nav>
        <Link to="/articles">
          <button>Articles</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <Link to="/topics">
          <button>Topics</button>
        </Link>
      </nav>
    </>
  );
}
export default Header;
