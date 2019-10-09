import React, { Component } from "react";
import ArticleList from "./ArticleList";
import { Router } from "@reach/router";
import UserList from "./UserList";
import TopicList from "./TopicList";
import ArticleMain from "./ArticleMain";


class MainSection extends Component {
  state = {};

  render() {
    return (
      <section>
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/articles" />
          <ArticleList path="/articles/topic/:topic" />
          <ArticleMain path="/articles/article_id/:article_id" />
          <ArticleMain path="/articles/article_id/:article_id/comments" />
          <UserList path="/users" />
          <TopicList path="/topics" />
        </Router>
      </section>
    );
  }
}

export default MainSection;
