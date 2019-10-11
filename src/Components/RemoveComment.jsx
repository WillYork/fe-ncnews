import React, { Component } from "react";
import * as api from "../api";

class RemoveComment extends Component {
  state = {};
  render() {
    return (
      <div>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }

  handleDelete = () => {
    api.deleteComment(this.props.comment_id);
  };
}

export default RemoveComment;
