import React, { Component } from "react";
import * as api from "../api";
import Loading from "./Loading";
import { Link } from "@reach/router";
import CommentCard from "./CommentCard";
import Voting from "./Voting";
import PostComment from "./PostComment";
import Erroring from "./Erroring";

class ArticleMain extends Component {
  state = {
    article: [],
    isLoading: true,
    comments: null,
    error: null
  };
  render() {
    const { article, isLoading, comments, error } = this.state;
    return (
      <>
        {isLoading && <Loading />}
        {error && <Erroring status={error.status} msg={error.msg} />}
        {!error && (
          <main className="article_main">
            <span className="extra_info_span">
              <p>
                Posted by {article.author} at{" "}
                {new Date(article.created_at).toLocaleString("en-GB", {
                  timeZone: "UTC"
                })}
              </p>
              <p>{article.topic}</p>
            </span>
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <Voting article_id={article.article_id} votes={article.votes} />
          </main>
        )}
        {!comments && !error &&  (
          <Link to={`/articles/article_id/${article.article_id}/comments`}>
            <button>View Comments</button>
          </Link>
        )}
        <br />
        {comments && (
          <PostComment
            article_id={article.article_id}
            loggedIn={this.props.loggedIn}
            updateComments={this.updateComments}
          />
        )}

        <ul>
          {comments &&
            comments.map(comment => {
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
    const { article_id, path } = this.props;
    if (path === `/articles/article_id/:article_id/comments`) {
      return Promise.all([
        api.getArticleByID(article_id),
        api.getCommentsByArticleID(article_id)
      ])
        .then(([{ data: { article } }, { data: { comments } }]) => {
          this.setState({
            article,
            isLoading: false,
            comments,
            error: null
          });
        })
        .catch(error =>
          this.setState({
            isLoading: false,
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
          this.setState({
            article,
            isLoading: false,
            error: null
          });
        })
        .catch(error =>
          this.setState({
            isLoading: false,
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
          this.setState({
            comments,
            isLoading: false,
            error: null
          });
        })
        .catch(error =>
          this.setState({
            isLoading: false,
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

  deleteComment = comment_id => {
    this.setState(({ comments }) => {
      return {
        comments: comments.filter(comment => comment.comment_id !== comment_id)
      };
    });
  };
}
export default ArticleMain;
