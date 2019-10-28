import React, { Component } from "react";
import * as api from "../api";
import Loading from "./Loading";
import { Link } from "@reach/router";
import CommentCard from "./CommentCard";
import Voting from "./Voting";
import PostComment from "./PostComment";

class ArticleMain extends Component {
  state = {
    article: [],
    isLoading: true,
    comments: null,
    error: { msg: null, status: null }
  };
  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        {this.state.error && (
          <p>
            {this.state.error.status} {this.state.error.msg}
          </p>
        )}
        <main className="article_main">
          <span className="extra_info_span">
            <p>
              Posted by {this.state.article.author} at{" "}
              {new Date(this.state.article.created_at).toLocaleString("en-GB", {
                timeZone: "UTC"
              })}
            </p>
            <p>{this.state.article.topic}</p>
          </span>
          <h3>{this.state.article.title}</h3>
          <p>{this.state.article.body}</p>
          <Voting
            article_id={this.state.article.article_id}
            votes={this.state.article.votes}
          />
        </main>
        {!this.state.comments && (
          <Link
            to={`/articles/article_id/${this.state.article.article_id}/comments`}
          >
            <button>View Comments</button>
          </Link>
        )}
        <br />
        {this.state.comments && (
          <PostComment
            article_id={this.state.article.article_id}
            loggedIn={this.props.loggedIn}
            updateComments={this.updateComments}
          />
        )}
        <ul>
          {this.state.comments &&
            this.state.comments.map(comment => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  loggedIn={this.props.loggedIn}
                  deleteComment={this.deleteComment}
                />
              );
            })}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    if (this.props.path === `/articles/article_id/:article_id/comments`) {
      return Promise.all([
        api.getArticleByID(article_id),
        api.getCommentsByArticleID(article_id)
      ])
        .then(([{ data: { article } }, { data: { comments } }]) => {
          this.setState({ article, isLoading: false, comments, error: { msg: null, status: null } });
        })
        .catch(error =>
          this.setState({ isLoading: false,
            error: {
              msg: error.response.statusText,
              status: error.response.status
            }
          })
        );
    } else {
      return api
        .getArticleByID(article_id)
        .then(({ data: { article } }) => {
          this.setState({ article, isLoading: false, error: { msg: null, status: null } });
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

  componentDidUpdate(prevProps) {
    const pathChange = this.props.path !== prevProps.path;
    if (pathChange) {
      const { article_id } = this.props;
      return api
        .getCommentsByArticleID(article_id)
        .then(({ data: { comments } }) => {
          this.setState({ comments, isLoading: false, error: { msg: null, status: null } });
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

  updateComments = ({ comment }) => {
    this.setState(({ comments }) => {
      return { comments: [comment, ...comments] };
    });
  };

  deleteComment = (comment_id) => {
    this.setState(({comments}) => {
      return {comments: (comments.filter(comment => comment.comment_id !== comment_id))}
    })
  }

}
export default ArticleMain;
