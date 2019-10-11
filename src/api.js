import axios from "axios";

const request = axios.create({
  baseURL: "https://northc-project.herokuapp.com/api"
});

export const getArticles = ({
  topic,
  username,
  sort_by,
  order_by,
  p
}) => {
  return request.get("/articles", {
    params: {
      topic,
      username,
      sort_by,
      order_by,
      p
    }
  });
};

export const getArticleByID = (article_id) => {
  return request.get(`articles/${article_id}`);
};

export const getCommentsByArticleID = (article_id) => {
  return request.get(`articles/${article_id}/comments`)
}

export const getUsers = username => {
  return request.get("/users", { params: { username } });
};

export const getTopics = () => {
  return request.get("/topics");
};

export const patchCommentVote = (comment_id) => {
  return request.patch(`/comments/${comment_id}`, {inc_votes: 1});
}

export const patchArticleVote = (article_id) => {
  return request.patch(`/articles/${article_id}`, {inc_votes: 1});
}

export const postComment = (article_id, username, body) => {
  return request.post(`articles/${article_id}/comments`, {username, body})
}

export const deleteComment = (comment_id) => {
  return request.delete(`comments/${comment_id}`)
}