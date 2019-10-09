import React from "react";
import { Link } from "@reach/router";

function ArticleCard({ article }) {
  return (
    <li>
      <Link to={`/articles/article_id/${article.article_id}`}>{article.title} </Link>{" "}
      {article.topic}
    </li>
  );
}

export default ArticleCard;
