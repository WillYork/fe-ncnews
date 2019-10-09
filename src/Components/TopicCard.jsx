import React from "react";
import { Link } from "@reach/router";

function TopicCard({ topic }) {
  return (
    <>
      <li>
        {topic.slug}
        {topic.description}
        <Link to={`/articles/topic/${topic.slug}`}>
            <button>View Articles</button>
        </Link>
      </li>
    </>
  );
}

export default TopicCard;
