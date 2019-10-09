import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    searchQuery: "",
    searchType: "title"
  };

  handleChange = e => {
    e.preventDefault();
    const { target } = e;
    this.setState({ searchQuery: target.value });
  };

  handleType = e => {
    e.preventDefault();
    const { target } = e;
    this.setState({ searchType: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.searchInput(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          name="search"
          onChange={this.handleChange}
          value={this.state.searchQuery}
        />
        <label htmlFor="types">Filter by: </label>
        <select name="types" onChange={this.handleType}>
          <option value="title">
            title
          </option>
          <option value="topic">topic</option>
          <option value="username">author</option>
          <option value="article_id">article_id</option>
        </select>
        <input type="submit" value="Go!" />
      </form>
    );
  }
}

export default SearchBar