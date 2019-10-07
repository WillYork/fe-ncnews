import axios from "axios";

export const getArticles = (query, type) => {
  if (query) {
    return axios.get(
      `https://northc-project.herokuapp.com/api/articles?${type}=${query}`
    );
  } else {
    return axios.get("https://northc-project.herokuapp.com/api/articles");
  }
};
