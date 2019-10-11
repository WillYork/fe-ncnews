import React from "react";
import { Link } from "@reach/router";
import "../App.css";

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/article_id/${article.article_id}`}>
      <li className="App-card">
        <span className='extra_info_span'> 
          <p>Posted by {article.author} at {new Date(article.created_at).toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
          <p>{article.topic}</p>
        </span>
        <h2>{article.title}</h2>
        <p>{(article.body).split(' ').slice(0, 24).join(' ').toString()}...</p>
        <span className='extra_info_span'> 
        <p>Comments ({article.comment_count})</p>
        <p>Votes ({article.votes})</p>
        </span>
      </li>
    </Link>
  );
}

export default ArticleCard;
