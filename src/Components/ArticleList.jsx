import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../api";
import Loading from "./Loading";
import { Link } from "@reach/router";
import "../App.css";
import Sorting from "./Sorting";
import Erroring from "./Erroring";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order_by: "desc",
    p: 1,
    total_count: 1,
    error: null
  };

  render() {
    const {articles, isLoading, p, total_count, error} = this.state
    return (
      <div>
        <nav className="top_bar">
          <nav className="article_nav_bar">
            <Sorting searchInput={this.searchInput} />
            <Link to="/articles/topic/coding">
              <p>Coding</p>
            </Link>
            <p> | </p>
            <Link to="/articles/topic/football">
              <p>Football</p>
            </Link>
            <p> | </p>
            <Link to="/articles/topic/cooking">
              <p>Cooking</p>
            </Link>
          </nav>
          <div className="page_buttons">
            {p > 1 && (
              <button
                className="buttons"
                id="prev"
                onClick={() => this.changePage(-1)}
              >
                {" "}
                Previous
              </button>
            )}

            <button
              className="buttons"
              id="next"
              onClick={() => this.changePage(1)}
              disabled={p === this.maxPage(total_count)}
            >
              Next
            </button>
          </div>
        </nav>
        <main className="App-list">
          {isLoading && <Loading />}
          <ul>
            {error && <Erroring status={error.status} msg={error.msg} />}
            {articles &&
              articles.map(article => {
                return (
                  <ArticleCard key={article.article_id} article={article} />
                );
              })}
          </ul>
        </main>
      </div>
    );
  }

  componentDidMount() {
    return this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const topicChange = this.props.topic !== prevProps.topic;
    const usernameChange = this.props.username !== prevProps.username;
    const sortbyChange = this.state.sort_by !== prevState.sort_by;
    const orderbyChange = this.state.order_by !== prevState.order_by;
    const pChange = this.state.p !== prevState.p;
    if (topicChange || usernameChange) {
      this.setState({ p: 1 });
      return this.fetchArticles();
    } else if (sortbyChange || orderbyChange || pChange) {
      return this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const options = {
      topic: this.props.topic,
      username: this.props.username,
      sort_by: this.state.sort_by,
      order_by: this.state.order_by,
      p: this.state.p
    };

    api
      .getArticles(options)
      .then(({ data: { articles: { articles, total_count } } }) => {
        this.setState({
          articles,
          isLoading: false,
          total_count,
          error: null
        });
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          error: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      );
  };

  maxPage = total_count => {
    return Math.ceil(total_count / 10);
  };

  changePage = direction => {
    this.setState(({ p }) => {
      return { p: p + direction };
    });
  };

  searchInput = ({ sort_by, order_by }) => {
    this.setState({ sort_by, order_by });
  };
}

export default ArticleList;
