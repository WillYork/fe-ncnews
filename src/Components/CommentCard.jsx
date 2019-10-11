import React, { Component } from "react";
import Voting from "./Voting";
import RemoveComment from "./RemoveComment";

class CommentCard extends Component {
  state = {};
  render() {
    const { comment_id, author, votes, created_at, body } = this.props.comment;
    return (
      <li  className="comment_card">
          <span className='extra_info_span'> 
          <p>Posted by {author} at {new Date(created_at).toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
        </span>
        {body}
        <br />
        <Voting votes={votes} comment_id={comment_id} />
        <br />
        {(this.props.loggedIn === author) && <RemoveComment comment_id={comment_id} />
        }

      </li>
    );
  }
}

export default CommentCard;
