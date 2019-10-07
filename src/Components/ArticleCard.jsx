import React from "react";

function ArticleCard({ article }) {
  return <li>{article.title} {article.topic}</li>;
}

export default ArticleCard;
