import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../api";
import Loading from "./Loading";
import { Link } from "@reach/router";

class ArticleList extends Component {
  state = { articles: [], isLoading: true };

  render() {
    return (
      <>
        <label>Choose a topic: </label>
        <Link to="/articles/topic/coding">
          <button>Coding</button>
        </Link>
        <Link to="/articles/topic/football">
          <button>Football</button>
        </Link>
        <Link to="/articles/topic/cooking">
          <button>Cooking</button>
        </Link>
        {this.state.isLoading && <Loading />}
        <ul>
          {this.state.articles &&
            this.state.articles.map(article => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
        </ul>
      </>
    );
  }

  componentDidMount() {
    return this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    const sortbyChange = this.props.sort_by !== prevProps.sort_by;
    const orderbyChange = this.props.order_by !== prevProps.order_by;
    const topicChange = this.props.topic !== prevProps.topic;
    const usernameChange = this.props.username !== prevProps.username;
    const limitChange = this.props.limit !== prevProps.limit;
    const pChange = this.props.p !== prevProps.p;
    if (
      sortbyChange ||
      orderbyChange ||
      topicChange ||
      usernameChange ||
      limitChange ||
      pChange
    ) {
      return this.fetchArticles();
    }
  }
  fetchArticles = () => {
    const options = {
      sort_by: this.props.sort_by,
      order_by: this.props.order_by,
      topic: this.props.topic,
      username: this.props.username,
      limit: this.props.limit,
      p: this.props.p
    };

    api.getArticles(options).then(({ data: { articles } }) => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
