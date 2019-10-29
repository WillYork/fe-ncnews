import React, { Component } from "react";
import * as api from "../api";

class Voting extends Component {
  state = { voteChange: 0 };

  handleVoteChange = () => {
    const {comment_id, article_id} = this.props
    this.setState(({ voteChange }) => ({ voteChange: voteChange + 1 }));
    if (comment_id) {
      api.patchCommentVote(comment_id).catch(err => {
        this.setState(({ voteChange }) => ({ voteChange: voteChange - 1 }));
      });
    } else if (article_id) {
      api.patchArticleVote(article_id).catch(err => {
        this.setState(({ voteChange }) => ({ voteChange: voteChange - 1 }));
      });
    }
  };

  render() {
    return (
      <div>
        <p>Votes: {this.props.votes + this.state.voteChange}</p>
        <button
          disabled={this.state.voteChange}
          onClick={this.handleVoteChange}
        >
          UpVote
        </button>
      </div>
    );
  }
}

export default Voting;
