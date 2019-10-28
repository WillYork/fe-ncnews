import React, { Component } from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import Loading from "./Loading";
import "../App.css";

class TopicList extends Component {
  state = { topics: [], isLoading: true, error: { msg: null, status: null } };

  render() {
    const { searchInput } = this.props;
    const { topics } = this.state;
    return (
      <ul>
        {this.state.isLoading && <Loading />}
        {this.state.error && (
          <p>
            {this.state.error.status} {this.state.error.msg}
          </p>
        )}
        {topics &&
          topics.map(topic => {
            return (
              <TopicCard
                key={topic.slug}
                topic={topic}
                searchInput={searchInput}
              />
            );
          })}
      </ul>
    );
  }

  componentDidMount() {
    api
      .getTopics()
      .then(({ data: { topics } }) => {
        this.setState({ topics, isLoading: false, error: { msg: null, status: null } });
      })
      .catch(error =>
        this.setState({ isLoading: false,
          error: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      );
  }
}

export default TopicList;
