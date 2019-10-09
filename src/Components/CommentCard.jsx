import React, { Component } from "react";
import Voting from "./Voting";

class CommentCard extends Component {
  state = {};
  render() {
    const { comment_id, author, votes, created_at, body } = this.props.comment;
    return (
      <li>
          {body}
        <Voting votes={votes} comment_id={comment_id} />
      </li>
    );
  }
}

export default CommentCard;
