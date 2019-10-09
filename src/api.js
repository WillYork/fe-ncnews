import axios from "axios";

const request = axios.create({
  baseURL: "https://northc-project.herokuapp.com/api"
});

export const getArticles = ({
  sort_by,
  order_by,
  topic,
  username,
  limit,
  p
}) => {
  return request.get("/articles", {
    params: {
      sort_by,
      order_by,
      topic,
      username,
      limit,
      p
    }
  });
};

export const getArticleByID = (article_id, comments) => {
  if (comments) return request.get(`articles/${article_id}/comments`);
  return request.get(`articles/${article_id}`);
};

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
