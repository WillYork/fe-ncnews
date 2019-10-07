import React, { Component } from "react";
import * as api from "../api";
import ArticleList from "./ArticleList";
import SearchBar from "./SearchBar";

class ArticleSection extends Component {
  state = { articles: [], searchQuery: "", searchType: "title" };

  render() {
    return (
      <section>
        <SearchBar searchInput={this.searchInput} />
        <ul>
          <ArticleList articles={this.state.articles} />
        </ul>
      </section>
    );
  }

  componentDidMount() {
    api.getArticles().then(({ data: { articles } }) => {
      this.setState({ articles });
    });
  }

  searchInput = ({ searchQuery, searchType }) => {
    this.setState({ searchQuery, searchType });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      api
        .getArticles(this.state.searchQuery, this.state.searchType)
        .then(({ data: { articles } }) => {
          this.setState({ articles });
        });
    }
  }
}

export default ArticleSection;
