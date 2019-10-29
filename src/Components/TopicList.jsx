import React, { Component } from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import Loading from "./Loading";
import "../App.css";
import Erroring from "./Erroring";

class TopicList extends Component {
  state = { topics: [], isLoading: true, error: null };

  render() {
    const { searchInput } = this.props;
    const { topics, isLoading, error } = this.state;
    return (
      <ul>
        {isLoading && <Loading />}
        {error && <Erroring status={error.status} msg={error.msg} />}
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
        this.setState({ topics, isLoading: false, error: null });
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
