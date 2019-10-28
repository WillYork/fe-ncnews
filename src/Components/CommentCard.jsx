import React from "react";
import Voting from "./Voting";
import RemoveComment from "./RemoveComment";

function CommentCard( props ) {
    const { comment, loggedIn, deleteComment } = props;
    const { comment_id, author, votes, created_at, body } = comment
    return (
      <li className="comment_card">
          <span className='extra_info_span'> 
          <p>Posted by {author} at {new Date(created_at).toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
        </span>
        {body}
        <br />
        <Voting votes={votes} comment_id={comment_id} />
        <br />
        {(loggedIn === author) && <RemoveComment comment_id={comment_id} deleteComment={deleteComment} />
        }

      </li>
    );
}

export default CommentCard;
