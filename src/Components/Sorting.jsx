import React from "react";
import "../App.css";

function Sorting({ searchInput }) {
  const refObj = {
    created_atDesc: { sort_by: "created_at", order_by: "desc" },
    created_atAsc: { sort_by: "created_at", order_by: "asc" },
    votesDesc: { sort_by: "votes", order_by: "desc" },
    votesAsc: { sort_by: "votes", order_by: "asc" },
    comment_countDesc: { sort_by: "comment_count", order_by: "desc" },
    comment_countAsc: { sort_by: "comment_count", order_by: "asc" }
  };

  function handleSort(e) {
    const {
      target: { value }
    } = e;
    searchInput(refObj[value]);
  }

  return (
    <form>
      <label htmlFor="sort" className="article_nav_bar">
        Sort by:{" "}
      </label>
      <select className="select-style" name="sort" onChange={handleSort}>
        <option value="created_atDesc">Newest</option>
        <option value="created_atAsc">Oldest</option>
        <option value="votesDesc">Most Popular</option>
        <option value="votesAsc">Least Popular</option>
        <option value="comment_countDesc">Most Comments</option>
        <option value="comment_countAsc">Least Comments</option>
      </select>
    </form>
  );
}

export default Sorting;
