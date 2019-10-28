import React from "react";
import ArticleList from "./ArticleList";
import { Router } from "@reach/router";
import UserList from "./UserList";
import TopicList from "./TopicList";
import ArticleMain from "./ArticleMain";

function MainSection({ loggedIn }) {
  return (
    <section>
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/articles" />
        <ArticleList path="/articles/topic/:topic" />
        <ArticleList path="/articles/username/:username" />
        <ArticleMain
          loggedIn={loggedIn}
          path="/articles/article_id/:article_id"
        />
        <ArticleMain
          loggedIn={loggedIn}
          path="/articles/article_id/:article_id/comments"
        />
        <UserList path="/users" />
        <TopicList path="/topics" />
      </Router>
    </section>
  );
}

export default MainSection;
