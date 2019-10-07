import React from "react";
import ArticleCard from "./ArticleCard";

function ArticleList({articles}) {
  return (
    <ul>
    {
        articles && articles.map(article => {
          return <ArticleCard key={article.article_id} article={article}/>;
        })
      }
    </ul>
  );
}

export default ArticleList;
