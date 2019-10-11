import React, { Component } from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import Loading from "./Loading";
import "../App.css";

class TopicList extends Component {
  state = { topics: [], isLoading: true };

  render() {
    const { searchInput } = this.props;
    const { topics } = this.state;
    return (
      <ul>
        {this.state.isLoading && <Loading />}
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
    api.getTopics().then(({ data: { topics } }) => {
      this.setState({ topics, isLoading: false });
    });
  }
}

export default TopicList;
