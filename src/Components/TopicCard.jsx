import React from "react";
import { Link } from "@reach/router";
import "../App.css";

function TopicCard({ topic }) {
  return (
    <div className="App-card">
      <li>
        {topic.slug}<br/>
        {topic.description}<br/>
        <Link to={`/articles/topic/${topic.slug}`}>
            <button>View Articles</button>
        </Link>
      </li>
    </div>
  );
}

export default TopicCard;
