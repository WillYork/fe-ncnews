import React, { Component } from "react";
import * as api from "../api";
import "../App.css";

class PostComment extends Component {
  state = { body: "" };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          className="comment_box"
          type="textarea"
          onChange={this.handleChange}
          placeholder={
            this.props.loggedIn === "Guest"
              ? "You must be signed in to post a comment"
              : undefined
          }
        />
        {this.props.loggedIn !== "Guest" && <button disabled={!this.state.body}>Post</button>}
      </form>
    );
  }

  handleChange = e => {
    e.preventDefault();
    const { target } = e;
    this.setState({ body: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.loggedIn && this.props.loggedIn !== "Guest") {
      api
        .postComment(
          this.props.article_id,
          this.props.loggedIn,
          this.state.body
        )
        .then(({ data: comment }) => {
          this.props.updateComments(comment);
        });
    }
  };
}

export default PostComment;
