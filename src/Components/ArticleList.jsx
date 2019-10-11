import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../api";
import Loading from "./Loading";
import { Link } from "@reach/router";
import "../App.css";
import Sorting from "./Sorting";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order_by: "desc",
    p: 1,
    total_count: 1
  };

  render() {
    return (
      <div>
        <nav className="top_bar">
          <button
            className="prev"
            onClick={() => this.changePage(-1)}
            disabled={this.state.p === 1}
          >
            {" "}
            Previous
          </button>
          <Sorting searchInput={this.searchInput} />
          <label>Topic: </label>
          <Link to="/articles/topic/coding">
            <button>Coding</button>
          </Link>
          <Link to="/articles/topic/football">
            <button>Football</button>
          </Link>
          <Link to="/articles/topic/cooking">
            <button>Cooking</button>
          </Link>
          <button
            className="prev"
            onClick={() => this.changePage(1)}
            disabled={this.state.p === this.maxPage(this.state.total_count)}
          >
            Next
          </button>
        </nav>
        <main className="App-list">
                  {this.state.isLoading && <Loading />}
        <ul>
          {this.state.articles &&
            this.state.articles.map(article => {
              return <ArticleCard key={article.article_id} article={article} />;
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
        this.setState({ articles, isLoading: false, total_count });
      })
      .catch(err => this.setState({ err }));
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
