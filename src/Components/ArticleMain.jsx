import React, { Component } from "react";
import * as api from "../api";
import Loading from "./Loading";
import { Link } from "@reach/router";
import CommentCard from "./CommentCard";
import Voting from "./Voting";

class ArticleMain extends Component {
  state = { article: [], isLoading: true, comments: [] };
  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        <h3>{this.state.article.title}</h3>
        <p>{this.state.article.body}</p>
        <Voting article_id={this.state.article.article_id} votes={this.state.article.votes}/>
        <Link
          to={`/articles/article_id/${this.state.article.article_id}/comments`}
        >
          <button>View Comments</button>
        </Link>
        <ul>
          {this.state.comments &&
            this.state.comments.map(comment => {
              return <CommentCard key={comment.comment_id} comment={comment} />;
            })}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    return api.getArticleByID(article_id).then(({ data: { article } }) => {
      this.setState({ article, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.path !== prevProps.path) {
      const { article_id } = this.props;
      return api
        .getArticleByID(article_id, true)
        .then(({ data: { comments } }) => {

          this.setState({ comments, isLoading: false });
        });
    }
  }
}
export default ArticleMain;
